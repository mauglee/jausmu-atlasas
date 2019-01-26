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

svg_el.draggable();

// prevent link, load page content into DIV by AJAX
$('body').on('click', '#svg svg a', function (e) {

    e.preventDefault();
    var a = $(this);
    var id = a.parents().eq(0).data('postid');
    var r = $('#result');
    var part = '#main article';

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
                    }
                }
            );
        } else {
            html = loaded[id];
            r.html(html);
        }

        // Scroll to results
        $('html, body').animate({scrollTop: r.offset().top});

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
});
