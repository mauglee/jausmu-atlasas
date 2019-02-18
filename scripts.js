// help page ID
var help_post_id = 8612;

// prepare A element
var a = document.createElementNS('http://www.w3.org/2000/svg', 'a');
var namespaceURI = 'http://www.w3.org/1999/xlink';

// SVG elements in question
var svgs = $('[data-id]');

// wrap each elemnt with link
svgs.each(function (i, el) {
    var id = $(el).data('id');
    $.each(config, function (ci, co) {
        if (id == co.id) {
            a.setAttributeNS(namespaceURI, 'href', '/?p=' + co.post);
            $(el).wrapInner(a);
            $(el).attr('data-postid', co.post);
            $(el).attr('data-level', getLevel(id));
            $(el).attr('data-segment', getSegment(id));
            return false; // break $.each() loop
        }
    });

});

// keep already AJAXed HTML
var loaded = [];

// get initial dimensions
var svg_el = $('svg', '#svg').eq(0);
var svg_w = svg_el.width();
var svg_h = svg_el.height();

// link to backend (edit post)
var edit = $('.edit-post');

svg_el.draggable();

// AJAX results handling element
var r = $('#result');
var part = '#main article';

// navigation by selecting sector / segment
var navigator = {segment: null, level: null};

// prevent link, load page content into DIV by AJAX
$('body').on('click', '#svg svg a', function (e) {

    e.preventDefault();
    var a = $(this);
    var id = a.parents().eq(0).data('postid');

    if (id) {
        var html;
        if ('undefined' == typeof(loaded[id])) {
            $.ajax({
                    url: a.attr('href'),
                    dataType: 'html',
                    success: function (h) {
                        html = $(h).find(part).html();
                        r.html(html);
                        loaded[id] = html;
                        a.addClass('loaded');
                        setActive(a);
                        edit.attr('href', '/wp-admin/post.php?post=' + id + '&action=edit');
                        scrollToResult(r);

                        // if EDIT available
                        if ($(h).find('#wp-admin-bar-edit').length > 0) {
                            edit.removeClass('hidden');
                        }
                    }
                }
            );
        } else {
            html = loaded[id];
            r.html(html);
            setActive(a);
            edit.attr('href', '/wp-admin/post.php?post=' + id + '&action=edit');
            scrollToResult(r);
        }

    } else {
        r.html('');
    }

}).on('click', '#svg .zoom > *', function (e) {
    e.preventDefault();
    var a = $(this);
    var w = svg_el.width();
    var h = svg_el.height();
    if (a.is('.in')) {
        svg_el.width(w * 1.2);
        svg_el.height(w * 1.2);
    } else if (a.is('.out')) {
        svg_el.width(w / 1.2);
        svg_el.height(h / 1.2);
    } else if (a.is('.orig')) {
        svg_el.animate({
            top: "0px",
            left: "0px",
            width: svg_w,
            height: svg_h
        });
    }
}).on('click', '#svg .go-cell a', function (e) {
    e.preventDefault();
    var a = $(this);
    if (a.data('segment')) {
        navigator.segment = a.data('segment');
        $('#bavigatorSegment').html(a.data('segment'));
        navigate();
    } else if (a.data('level')) {
        navigator.level = a.data('level');
        $('#bavigatorLevel').html(a.data('level'));
        navigate();
    }
});

function navigate() {
    if (navigator.segment && navigator.level) {
        $('[data-segment="' + navigator.segment + '"][data-level="' + navigator.level + '"] a').click();
    }
}

function setActive(element) {

    if ($('a', '#svg svg').removeClass('active')) {
        element.addClass('active');
        setNeighbours(element);
        setOposite(element);
    }

}

function setNeighbours(element) {

    var p = element.parent();
    var id = p.data('id');
    var level = p.data('level');
    var segment = p.data('segment');

    if ($('[data-level]', '#svg svg').removeClass('neighbour')) {
        $('[data-level="' + (level - 1) + '"], [data-level="' + level + '"], [data-level="' + (level + 1) + '"]')
            .filter($('[data-segment="' + ((segment - 1) < 1 ? 24 : segment - 1) + '"], [data-segment="' + segment + '"], [data-segment="' + ((segment + 1 > 24 ? 1 : segment + 1)) + '"]'))
            .not('[data-id="' + id + '"]')
            .addClass('neighbour');
    }

}

function setOposite(element) {

    var p = element.parent();
    var level = p.data('level');
    var segment = p.data('segment');
    var segment_o;
    if (segment <= 12) {
        segment_o = segment + 12;
    } else {
        segment_o = segment - 12;
    }
    if ($('[data-level]', '#svg svg').removeClass('oposite')) {
        $('[data-level="' + level + '"][data-segment="' + segment_o + '"]').addClass('oposite');
    }

}

function getLevel(id) {
    return Math.ceil(parseInt(id) / 24);
}

function getSegment(id) {
    var mod = parseInt(id) % 24;
    if (mod === 0) {
        return 24;
    }
    return mod;
}

function scrollToResult(element) {
    $('html, body').animate({scrollTop: element.offset().top});
}

function loadPost(post_id) {
    if ('undefined' == typeof(loaded[post_id])) {
        $.ajax({
            url: '/?p=' + help_post_id,
            dataType: 'html',
            success: function (h) {
                html = $(h).find(part).html();
                r.html(html);
                edit.attr('href', '/wp-admin/post.php?post=' + post_id + '&action=edit');
                loaded[post_id] = html;
            }
        });
    } else {
        html = loaded[post_id];
        r.html(html);
        edit.attr('href', '/wp-admin/post.php?post=' + post_id + '&action=edit');
    }
}

// initially load help page
loadPost(help_post_id);

$('.help', '#svg').attr('href', '/?p=' + help_post_id).on('click', function (e) {
    e.preventDefault();
    loadPost(help_post_id);
});

