"use strict";

let lang = "lt";
let cellEditColor = '#f44b42';


$(document).ready(function(){
    gen();

    let panZoom = svgPanZoom('#svg', {
        // viewportSelector: '.svg-pan-zoom_viewport'
        dblClickZoomEnabled: false,
        maxZoom: 4,
        onZoom: onZoom,
        onPan: onZoom,
    });

    // lang
    $("#lang button").removeClass("active").addClass('disabled');
    switch (lang) {
        case 'lt':
        $("#lang #lt").addClass("active").removeClass('disabled');
        break;
        case 'en':
        $("#lang #en").addClass("active").removeClass('disabled');
        break;
        case 'ru':
        $("#lang #ru").addClass("active").removeClass('disabled');
        break;
    }
    $('#lang button').click(function(e){
        $("#lang button").removeClass("active").addClass('disabled');
        $(e.target).addClass("active").removeClass('disabled');
        lang = e.target.id;
        changeLang();
    });

    
    $('#saveBtn').click(save);

    $('#reset').click(function(e){
        panZoom.reset();
        $('#reset.btn').addClass('active')
        atstatytiCeliuSpalvas(zymekliai);
    });
   

    $("#myModal .btn-primary").click(onModalOkClick);
    $("#title-lt, #title-en, #title-ru").keypress(function(e){
        if(e.which == 13) {
            onModalOkClick();
        }
    });


    // $("#edit-mode-switch").bootstrapToggle();
    if (modeEdit == true) {
        $("#edit-mode-switch").prop("checked", true);
    }else{
        $("#edit-mode-switch").prop("checked", false);
    }
    $('#edit-mode-switch').change(function() {
        // changeLang();
        if ($(this).prop('checked')) {
            modeEdit = true;
            atstatytiCeliuSpalvas();    
            atstatytiCeliuSpalvas(unsavedCells, cellEditColor, 0);
        }else{
            // atstatytiCeliuSpalvas(); 
            atstatytiCeliuSpalvas(unsavedCells, '', 1);
            modeEdit = false;
        }
    });
    
});

let data = [];

var width = 1500;
var height = 1500;

var cell_properties = [
    {level: 1,  height: 21, color: '#FFFF80' },
    {level: 2,  height: 8, color: 'white' },
    {level: 3,  height: 7, color: 'white' },
    {level: 4,  height: 7, color: 'white' },
    {level: 5,  height: 7, color: '#E1E1E1' },
    {level: 6,  height: 6, color: '#E1E1E1' },
    {level: 7,  height: 6, color: '#FF9FAA' },
    {level: 8,  height: 5, color: '#FF9FAA' },
    {level: 9,  height: 5, color: '#FF9FAA' },
    {level: 10, height: 5, color: '#FF9FAA' },
];
let total_segments = 24;

let zodiakai = [
    {lt: "Ožiaragis", en: "Capricorn", ru: "Козерог"},
    {lt: "Vandenis", en: "Aquarius", ru: "Водолей"},
    {lt: "Žuvys", en: "Pisces", ru: "Рыбы"},
    {lt: "Avinas", en: "Aries", ru: "Овен"},
    {lt: "Tauras", en: "Taurus", ru: "Телец"},
    {lt: "Dvyniai", en: "Gemini", ru: "Близнецы"},
    {lt: "Vėžys", en: "Cancer", ru: "Рак"},
    {lt: "Liūtas", en: "leo", ru: "Лев"},
    {lt: "Mergelė", en: "Virgo", ru: "Дева"},
    {lt: "Svarstyklės", en: "Libra", ru: "Весы"},
    {lt: "Skorpionas", en: "Scorpio", ru: "Скорпион"},
    {lt: "Šaulys", en: "Sagittarius", ru: "Стрелец"},
];

function gen(){
     // data = elements;
     data = x;
     // d3.json('dataX.json')
     //   .then(function(d) {
     //          data = d;
     //   });


    var svg = d3.select("svg")
        .style("width", "100%")
        .style("height", "auto")
        .attr("width",  width)
        .attr("height",  height)
        .attr("viewBox", '0 0 ' + width  + ' ' + height)
        .append('g')
        .attr("transform", function (d) {
            return 'translate(' + (width/2) + ',' + (height / 2) + ')';
        });

    
    // just for development
    let minimode = false;
    if (minimode) {
        d3.select("svg")
        .attr("viewBox", '-50 0 ' + width/3  + ' ' + height/2)
        .attr("width",  width*0.8)
        .attr("height",  height*3.2)
        .attr("transform", function (d) {
            return 'translate(30, -500)';
        })
    };


    var fillColor = function (e) { 
        if (e.data.level == 2 && e.data.segment == 1 ) {
            return cell_properties[0].color
        }
        return cell_properties[e.data.level - 1].color; 
    };

    var scale = d3.scaleLinear()
        .domain([0, d3.sum(cell_properties, function (e) {
            return e.height;
        })])
        .range([0, width / 2]);

    var cellHeight = function (level) { 
        return scale(cell_properties[level - 1].height); };

    var cellRadiusInner = function (level) {
        var result = 0;
        for (var i in Object.keys(cell_properties)) {
            if (i > (level - 1)) {
                return scale(result);
            }
            var add = (i == 0) ? 0 : cell_properties[i - 1].height;
            result += add;
        }
        return scale(result);
    };
    var cellRadiusOuter = function (level) { return cellRadiusInner(level) + cellHeight(level); };


    var pieGenerator = d3.pie()
        .value(function(d) {return 1;})
    ;

    var arcGenerator = d3.arc()
        .innerRadius(function (e) { return cellRadiusInner(e.data.level); })
        .outerRadius(function (e) { return cellRadiusOuter(e.data.level); })
        .padAngle(.0009)
        .padRadius(100);


    // generation begins:
    for (let index = 0; index < cell_properties.length; index++) {
        var level = cell_properties[index].level;
        
        // pie
        svg
            .selectAll('path' + level)
            .data(getLevelData(pieGenerator, level))
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr("fill", fillColor)
            .attr("id", function(d){ return d.data.id })
            .on("dblclick", function(d) {
                onCellClick(d.data, this);        
            });
            ;

        // labels
        svg
            .selectAll('text' + level)
            .data(getLevelData(pieGenerator, level))
            .enter()
            .append('text')
            .attr("id", function(d){ return 't' +  d.data.id })
            .attr('pointer-events','none')
            .attr("dy", ".35em")
            .each(function(d) {   
                let txt = d3.select(this);
                addText(d.data, txt);
            })
            .attr("transform", function(d) {   
                let txt = d3.select(this);

                var midAngle = d.endAngle < Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ;

                if (d.data.level == 1) {
                    if (midAngle < Math.PI) {
                        txt.attr('text-anchor','end');
                    }
                    // move level 1 labels to the edge
                    arcGenerator.outerRadius(function (e) { return cellRadiusOuter(e.data.level) + scale(20); })
                    let xy = arcGenerator.centroid(d);
                    arcGenerator.outerRadius(function (e) { return cellRadiusOuter(e.data.level); })
                    
                    return "translate(" + xy[0] + "," + xy[1] + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")";  
                }else{
                    txt.attr('text-anchor','middle')

                    var fixRotation = " rotate(0) ";
                    //90-180
                    if (midAngle > Math.PI / 2 && midAngle < Math.PI) {
                        fixRotation = " rotate(180) ";
                    }
                    //270-360
                    if (midAngle > 2 * Math.PI + Math.PI/2  && midAngle < 3 * Math.PI) {
                     fixRotation = " rotate(180) ";
                    }

                    return "translate(" + arcGenerator.centroid(d)[0] + "," + arcGenerator.centroid(d)[1] + ") " + fixRotation + " rotate(" + (midAngle * 180/Math.PI) + ")";  
                }
            });
        

        // anchor-points for testing (uncomment)
        // svg
            // .selectAll('circle' + level)
            // .data(getLevelData(pieGenerator, level))
            // .enter()
            // .append('circle')
            // .attr("r", 3)
            // .attr("stroke", "black")
            // .attr("fill", "red")
            // .attr("transform", function(d) { 
            //   let xy = [];
            //   if (d.data.level == 1) {
            //     arcGenerator.outerRadius(function (e) { return cellRadiusOuter(e.data.level) + scale(19);})
            //     xy = arcGenerator.centroid(d);
            //     arcGenerator.outerRadius(function (e) { return cellRadiusOuter(e.data.level); })
            //   }else{
            //     xy = arcGenerator.centroid(d);
            //   }
            // 
            //   return "translate(" + xy[0]  + "," + xy[1]  + ")";
            // });
    }


    // ===============
    // Level labels
    // ===============
    let segmentai = [6,18]; //žymės ant segmento endAngle
    segmentai.forEach(segment => {

    let g = svg
        .selectAll('x')
        .data(cell_properties)
        .enter()
        .append('g')
        .attr('class', function(d){ return 'l' + d.level})
        .attr("transform", function(d) { 
                return   "rotate(" + (-90 + 15 * segment)  + ')';
        })
  
    // apskritimai
    g.append('circle')
    .attr("r", 12)
    .attr("stroke", "black")
    .attr("fill", "#fff")
    .attr("transform", function(d) { 
            return "translate(" + (cellRadiusOuter(d.level) - scale(d.height)/2) + "," + 0 + ")";
            
        });
    
    // raidės
    g.append('text')
    .text(function(d){ 
        let r = ['a','b','c','d','e','f','g','h','i','j'][d.level-1];
        return  r;
    })
    .attr('text-anchor','middle')
    .attr('dy','5')
    .attr("transform", function(d) { 
            return "translate(" + (cellRadiusOuter(d.level) - scale(d.height)/2) + "," + 0 + ")" + " rotate(" +  (-90 + 15 * segment) * -1  + ')';
        });
    });

        
    // ===============
    // Segment labels
    // ===============
    var segmentuNumeriaiArc = d3.arc()
        .outerRadius(function (e) { return cellRadiusOuter(10) + scale(5); })
        .innerRadius(function (e) { return cellRadiusInner(10)+ scale(5); });

    svg
    .selectAll('circle11')
    .data(pieGenerator(d3.range(1,25)))
    .enter()
    .append('text')
        .text(function(d) {return d.data; })
        .attr('pointer-events','none')
        .attr('text-anchor','middle')
        .attr('class','s')
        .attr('id', function(d) {return "s" + d.data; })
        .attr("transform", function(d) { 
            return "translate(" + segmentuNumeriaiArc.centroid(d)[0] + "," + segmentuNumeriaiArc.centroid(d)[1] + ")";
        });



    // ===============
    // Zodiacs
    // ===============   
    segmentuNumeriaiArc.outerRadius(function (e) { return cellRadiusOuter(10) + scale(8); })
    segmentuNumeriaiArc.innerRadius(function (e) { return cellRadiusInner(10) + scale(8); });

    svg
    .selectAll('circle11')
    .data(pieGenerator(d3.range(1,13)))
    .enter()
    .append('g')
        .attr("transform", function(d) { 
        return "translate(10, 0) translate(" + segmentuNumeriaiArc.centroid(d)[0] + "," + segmentuNumeriaiArc.centroid(d)[1] + ")";
        })
        .attr("class", "z")
        .each(function(d){
            let zg = d3.select(this);
            let title = zodiakai[d.data-1].lt;
            
            switch (lang) {
                case 'en':
                title = zodiakai[d.data-1].en;
                break;
                case 'ru':
                title = zodiakai[d.data-1].ru;
                break;
            }

            zg.append('text')
            .text(title)
            .attr('dx', '-15')
            .attr('dy', '6')
            .attr('id', 'zt' + d.data );
            
            zg.append("use")
            .attr('x', '-30')
            .attr('y', '0')
            .attr('width', '100')
            .attr('height', '100')
            .attr('class', 'z')
            // .attr('href', '#zz')
            .attr('href', '#z' + d.data)
            // .attr('xlink:href', '#z' + d.data);
        });
}

function getLevelData(generator,  level){
    return  generator(data.filter(e => e.level == level));
}

// ===============
// if label with  " " or "-", adds <tspan>
// ===============
function addText(data, textObj){
    if(!data.lt) data.lt = data.title;
    let title = data.lt;
    switch (lang) {
      case 'en':
        title = data.en ? data.en :  '';
        break;
        case 'ru':
        title = data.ru ? data.ru :  '';
        break;
    }
    if(data.level == 1) {
      textObj.text(title);
      return;
    }
    if (title.includes('-') || title.includes(' ') ) {
      let _ = title.includes('-');
      let wrapSymbol = _ ? "-" : " ";
      var parts = title.split(/-| /);
      textObj.text((parts[0] + wrapSymbol).trim());
      let append = 16;
      for (let index = 1; index < parts.length; index++) {
        let t = parts[index] + (index < parts.length-1 && _ ? "-": "");
        textObj.attr("dy", "-" + 4);
        textObj.append('tspan').text(t)
        .attr("x", 0)
        .attr("dy", append);  
        
      }  
    }else{
      textObj.text(title);
    }
  }

function changeLang(){
    data.forEach(d => {
        addText(d, d3.select('#t'  + d.id));
    });
    // zodiakai
    let i = 1;
    zodiakai.forEach(z => {
        let title = z.lt;
      switch (lang) {
        case 'en':
          title = z.en;
          break;
          case 'ru':
          title = z.ru;
          break;
      }
        $("#zt" + i).text(title);
        i++;
    });
}

function atstatytiCeliuSpalvas(cls = selectedCells, color = '', ramumas = 1){
    let spalva = color;
    cls.forEach(c => {
        if (color == '') {
            spalva = cell_properties.filter(e=> e.level == c.level)[0].color;
        }
        $('#' + c.id).attr('fill', spalva);
    });
    
    if (ramumas == 1) {
        let ramumasId = data.filter(d=> d.segment == 1 && d.level == 2)[0].id;
        $('#' + ramumasId).attr('fill', cell_properties[0].color);
    }
};

function onZoom(){
    $('#reset.btn').removeClass('disabled');
}

let selectedCells = [];
let oldTitleLT = '';
let oldTitleRU = '';
let oldTitleEN = '';
let currentData = null;
let currentPath = null;

function onCellClick(d, p){
    // atzymiu senus ir pazymiu naujus leveliu burbuliukus
    if (currentData) {
        d3.select("#s" + currentData.segment).classed('selected', false);
        d3.selectAll(".l" + currentData.level).classed('selected', false);
    }
    currentData = d;
    currentPath = p;
    //marking segment and level
    d3.select("#s" + currentData.segment).classed('selected', true);
    d3.selectAll(".l" + currentData.level).classed('selected', true);
    

    oldTitleLT = currentData.lt;
    oldTitleRU = currentData.ru ? currentData.ru: "";
    oldTitleEN = currentData.en ? currentData.en : "";

    $("#title-lt").val(currentData.lt);
    $("#title-en").val(currentData.en);
    $("#title-ru").val(currentData.ru);
    $(".modal-body .info").html('Data ID: ' + currentData.id + "&nbsp;&nbsp;&nbsp;   Post ID: " + currentData.post);

    if (modeEdit) {
        $('#myModal').modal('show');
        $("#title-" + lang).focus();
    }else{
        // atzymiu celes
        if (selectedCells) {atstatytiCeliuSpalvas();}
      
        selectedCells = data.filter(function(d){
                let leftSegment = currentData.segment - 1;
            let rightSegment = currentData.segment + 1;
            if (leftSegment == 0) {leftSegment = 24};
            if (rightSegment == 25) {rightSegment = 1};
            return [currentData.level-1,currentData.level,currentData.level+1].includes(d.level)
              && [leftSegment,currentData.segment,rightSegment].includes(d.segment);
        }
        );

        // žymiu
        selectedCells.forEach(c => {
            $('#' + c.id).attr('fill', '#cae6fe');
        });
        $('#' + currentData.id).attr('fill', '#007aff');
        // žymiu priešybę
        let sp = currentData.segment + total_segments/2;
        if (sp > total_segments) { sp = sp - total_segments};
        let priesybe = data.filter(e => e.segment == sp  && e.level == currentData.level)[0];
        $('#' + priesybe.id).attr('fill', '#27a844');
        selectedCells.push(priesybe);
    }
};

let zymekliai;
//segmentų žymeklis
function select(){
    atstatytiCeliuSpalvas(zymekliai);
    var args = Array.from(arguments);
    zymekliai = data.filter(d=>args.includes(d.segment));

    zymekliai.forEach(s => {
        $('#' + s.id).attr('fill', '#c1ff90');
    });
}


let unsavedCells = [];
let modeEdit = false;
function onModalOkClick(){
    currentData.lt = $("#title-lt").val();
    currentData.en = $("#title-en").val();
    currentData.ru = $("#title-ru").val();

    if (oldTitleLT + oldTitleRU + oldTitleEN == currentData.lt + currentData.en + currentData.ru) {
        $("#myModal").modal('hide');
        return;
    }

    cellEditColor = '#f44b42';
    $('#saveBtn.btn').removeClass('disabled');
    // fill red
    d3.select(currentPath).attr("fill", cellEditColor);
    unsavedCells.push(currentData);

    // let currentTitle = $("#title-" + lang).val();      
    addText(currentData, d3.select('#t'  + currentData.id));

    //cleaning...
    $("#title-lt").val('');
    $("#title-en").val('');
    $("#title-ru").val('');
    $("#myModal").modal('hide');
    // currentData = null;
    currentPath = null;
}

// saving to server
function save(){
    let url = "save.php";
    console.log("Saving...");
    atstatytiCeliuSpalvas(unsavedCells);
    $.post( url, {'data': JSON.stringify(data)})
    .done(function( r ) {
        console.log("Result:", r);
        //atžymim spalvas
        atstatytiCeliuSpalvas(unsavedCells);
        $('#saveBtn.btn').addClass('disabled');
        unsavedCells = [];
      })
      .fail(function( r ) {
        console.log("On fale: code", r.status, ', text: ', r.statusText);
      });
}

// todo:
//wp
//titles to json
// eng and ru content on one page
// textpath???
