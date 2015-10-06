$(function () {
    app.init();
    app.galleryWorks.init();
});

var app = {};



app.init = function () {
    this.html.init();
    this.event();
    this.drawLogo();
};

app.html = {
    init: function () {}
};

app.event = function () {

};


app.drawLogo = function (color) {

    var logo = document.getElementById("canvasLogo")
        ,ctx = logo.getContext('2d')
        ,color = color || '#fff'
        ,scale = 0.3
        ;
    logo.width  = 252 * scale;
    logo.height = 140 * scale;
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(56, 0); ctx.lineTo(56, 42); ctx.lineTo(0, 30);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(62, 0); ctx.lineTo(88, 0); ctx.lineTo(88, 58); ctx.lineTo(62, 58);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(96, 0); ctx.lineTo(122, 0); ctx.lineTo(122, 60); ctx.lineTo(96, 60);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(130, 0); ctx.lineTo(156, 0); ctx.lineTo(156, 58); ctx.lineTo(130, 58);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(166, 0); ctx.lineTo(192, 0); ctx.lineTo(192, 60); ctx.lineTo(166, 60);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 0); ctx.lineTo(252, 0); ctx.lineTo(252, 5); ctx.lineTo(200, 34);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(70, 66); ctx.lineTo(112, 66); ctx.lineTo(110, 94); ctx.lineTo(154, 96); ctx.lineTo(148, 110);
    ctx.lineTo(162, 140); ctx.lineTo(88, 140); ctx.lineTo(100, 110);
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 70); ctx.lineTo(176, 70); ctx.lineTo(168, 90); ctx.lineTo(116, 88);
    ctx.closePath();
    ctx.closePath();
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = color; ctx.stroke();

};



app.galleryWorks = {};
app.galleryWorks.init = function () {
    this.html.init();
    //this.setParam();
    this.event();
};

app.galleryWorks.html = {
    init: function () {
        this.gw_scroll = $('#gw_scroll div');
    }
};

app.galleryWorks.event = function () {
    var self = this, html = this.html;

    //$('#gw_scroll').horizon();
};

//app.galleryWorks.setParam = function () {
//    var html = this.html;
//    html.gw_scroll.css('width', html.gw_scroll.find('li').length * 840);
//};


$(function () {
//    var mouseWheelEvt = function (event) {
//        if (document.body.doScroll)
//            document.body.doScroll(event.wheelDelta>0 ? "left":'right');
//        else if ((event.wheelDelta || event.detail) > 0)
//            document.body.scrollLeft -= 10;
//        else
//            document.body.scrollLeft += 10;
//
//        return false;
//    };
////document.body.addEventListener("mousewheel", mouseWheelEvt);
//    document.getElementById('galleryTest').addEventListener("mousewheel", mouseWheelEvt);

    $('#galleryTest').scroll(function(e){
        console.log(e);
    });
});

////////////////////////////////////////////////////
// small cubs

// create 10 cubs
// change the angle
// throw them in the dif. part of the screen
$(function() {
    app.rollTheDice.init();
});

app.rollTheDice = {
    $listCubs: []
};
app.rollTheDice.init = function () {
    this.html.init();
    this.event();

    var listCubs = this.createCubs(15);
    this.drawCubs('#two', listCubs);
    this.cubsInLine();
    //this.cubsInRandom();

    this.rollCubs(listCubs);
    this.addDraggableEffect('.transformCub');
};
app.rollTheDice.html = {
    init: function () {
        // this.someClass = $('.someClass');
    }
    ,fieldForCubs: '#two'
};
app.rollTheDice.event = function () {
    var self = this, html = this.html, resizeTimeoutId ;

    $(window).on('resize', function() {
        clearTimeout(resizeTimeoutId);
        resizeTimeoutId = setTimeout(function () {
            self.cubsInLine();
        }, 500);
    });

};


app.rollTheDice.lineOrRandom = function () {
    if ($(window).width() < 650) this.cubsInLine(3);
    else this.cubsInRandom();
};

// выстроить в столбец
app.rollTheDice.cubsInLine= function (inLine) {
    var countEl = this.$listCubs.length
        ,field = $(this.html.fieldForCubs)
        ,elSize = this.$listCubs[0].width() + 25//75
        ,fieldH = field.height() // 600
        ,fieldW = field.width()

        ,countInLine = inLine || Math.floor( fieldW / elSize )
        ,countInRow = Math.ceil( countEl / countInLine )
        //,coordinateList = []

        ,centerX = ( fieldW - (countInLine * elSize) ) / 2
        ,centerY = ( fieldH - (countInRow * elSize) ) / 2
        ,x = centerX, y = centerY
        ;

    //console.log(this.$listCubs[0], elSize);
    
    for (var i = 0; i < countEl; i++) { // 15
        //coordinateList[i] = {x:x, y:y};
        if (!i) {} // don't change x,y
        else if (i && (i % (countInLine) == 0) ) {
            y = y + elSize;
            x = centerX;
        }
        else x = x + elSize;
        this.$listCubs[i].animate({left:x, top:y}, 1000).css('transform','rotate(0)');
    }
    //return coordinateList;
};

///**
// * @param el jQuery
// * @param axis ось
// */
//app.rollTheDice.getCenterPosition = function (el, countElements, axis) {
//    var width = countElements;
//    if (axis == 'x') (el.width() - elWidth) / 2;
//    else (el.width() - elWidth) / 2;
//};

app.rollTheDice.cubsInRandom = function () {
    var countEl = this.$listCubs.length
        ,field = $(this.html.fieldForCubs)
        ;

    for (var i = 0; i < countEl; i++) {
        var x = this.getRandomNum (100, field.width() - 100 )
            ,y = this.getRandomNum (100, field.height() - 100)
            ,rotate = this.getRandomNum (-30, 30)
        ;
        this.$listCubs[i].animate({ left:x, top:y}, 1000).css('transform','rotate('+rotate+'deg)');
    }
    //return coordinateList;
};


app.rollTheDice.createCubs = function (countCubs) {
    var listCubs = [], self = this;
    for (var i = 0; i < countCubs; i++) {
        var el = $('<img/>',{
            'class':'transformCub'
            ,src: '/assets/images/portfolio/small/'+(i+1)+'.jpg'
            //,alt: i
        }).on('click',function () {
            self.cubsInLine(3);
        });
        listCubs.push(el);
    }
    this.$listCubs = listCubs;
    return listCubs;
};

app.rollTheDice.drawCubs = function (idBox, listCubs) {
    $(idBox).append(listCubs);
};

app.rollTheDice.rollCubs = function (listCubs) {
    for (var i = 0, len = listCubs.length; i < len; i++) {
        listCubs[i]
        .animate({top:listCubs[i].data('top'), left:listCubs[i].data('left')}, 1000)
        .css('transform', 'rotate('+listCubs[i].data('transform')+'deg)')
        ;
    }
};

app.rollTheDice.addDraggableEffect = function (classOrId) {
    $(classOrId).draggable();
};

app.rollTheDice.cleanCubs = function (listCubs) {
    var pos = -100;
    for (var i = 0, len = listCubs.length; i < len; i++) {
        listCubs[i].animate({top:pos, left:pos}, 1000);
    }
};

app.rollTheDice.getRandomNum = function (min, max) {
    return Math.floor ( Math.random() * (max - min) + min );
};


//$(document).ready(function(){
//    $('#three').mousemove(function(event){
//        $("#light").css({"top": event.pageY - 800, "left": event.pageX - 250});
//    });
//});


//app.rollTheDice.compareDistanceCount = 0;
// try push elements out
// experiment function do not work correctly
// app.rollTheDice.compareDistance(app.rollTheDice.$listCubs)
//app.rollTheDice.compareDistance = function (listCubs) {
//
//    var d = 10, // distance - min отступ межды элементами
//        w = listCubs[0].width()
//        ,isMoved = false
//        ;
//
//    for (var i = 0, len = listCubs.length; i < len; i++) {
//
//        var x1 = listCubs[i].data('left');
//        var x1min = x1 - d;
//        var x1max = x1 + w + d;
//        var y1 = listCubs[i].data('top');
//        var y1min = y1 - w - d;
//        var y1max = y1 + d;
//
//        for (var e = 0; e < len; e++) {
//            if (i == e) continue;
//
//            var x2 = listCubs[e].data('left');
//            var x2min = x2 - d;
//            var x2max = x2 + w + d;
//            var y2 = listCubs[e].data('top') - w - d;
//            var y2min = y2 - w - d;
//            var y2max = y2 + d;
//            var shiftX, shiftY, newX, newY;
//
//            if ( x1min <= x2min && x2min < x1max ) { // x1 левее
//                // узнать смещение влево
//                shiftX = x1max - x2min;
//                // двигаем левее
//                newX = x1 - shiftX;
//                //isMoved = moveIn(listCubs[i], 'left', newX);
//                listCubs[i].animate({left:newX}, 1000);
//                listCubs[i].data({left:newX});
//            }
//            else if ( x1min <= x2max && x2max < x1max ) { // x1 правее
//                shiftX = x2max - x1min;
//                // двигаем правее
//                newX = x1 + shiftX;
//                //isMoved = moveIn(listCubs[i], 'left', newX);
//                listCubs[i].animate({left:newX}, 1000);
//                listCubs[i].data({left:newX});
//            }
//
//            if ( y1min <= y2min && y2min < y1max ) { // y1 выше
//                shiftY = y1max - y2min;
//                // двигаем выше
//                newY = y1 - shiftX;
//                //isMoved = moveIn(listCubs[i], 'top', newY);
//                listCubs[i].animate({top:newY}, 1000);
//                listCubs[i].data({top:newY});
//            }
//            else if ( y1min <= y2max && y2max < y1max ) { // y1 ниже
//                shiftY = y2max - y1min;
//                // двигаем ниже
//                newY = y1 + shiftX;
//                //isMoved = moveIn(listCubs[i], 'top', newY);
//                listCubs[i].animate({top:newY}, 1000);
//                listCubs[i].data({top:newY});
//            }
//        }
//    }
//
//};

////////////////////////////////////////////////////

/**
 * вернет 2 целых числа
 */
//function get2integers (x) {
//    var x1 = x - 1, x2;
//    for (;  1 < x1 ; x1-- ) {
//        x2 = x / x1;
//        if ((x2 ^ 0) === x2) return [x1, x2]; // проверка целое ли число
//    }
//}

app.descWork = {};
app.descWork.init = function () {
    this.html.init();
    this.event();
};
app.descWork.html = {
    init: function () {
        this.mainBox = $('#descWork');
    }
};
app.descWork.event = function () {
    var self = this, html = this.html;

};

app.descWork.createBox = function () {

};
