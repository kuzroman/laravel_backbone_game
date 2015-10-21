//var $ = require("jquery");
//var _ = require("underscore");
//var Backbone = require("backbone");

//export var audio = new Audio();

//export var vent = _.extend({}, Backbone.Events);

export var vent = {
    page: _.extend({}, Backbone.Events),
    game: _.extend({}, Backbone.Events),
    audio: _.extend({}, Backbone.Events)
};
vent = _.extend(vent, Backbone.Events);

export var hp = {};

hp.tmpl = function (id) {
    return _.template($('#' + id).html());
};

// Вызов styleHyphenFormat('page-one') вернёт строку 'pageOne'.
hp.styleHyphenFormat = function (propertyName) {
    function upperToHyphenLower(match) {
        var result = match.replace('-', '');
        return result.toUpperCase();
    }

    return propertyName.replace(/-[a-z]/g, upperToHyphenLower);
};


//hp.getToken = function () { // может удалить? Нужно здесь?
//    return settings._token; // from header.blade
//};

export var params = {};

params.body = $('body');

params.bodyW = params.body.width();
params.bodyH = params.body.height();

var resizeTimeoutId;
window.onresize = function () {
    clearTimeout(resizeTimeoutId);
    resizeTimeoutId = setTimeout(function () {
        params.bodyW = params.body.width();
        params.bodyH = params.body.height();
    }, 200);
};

params.speedChangePage = 600;

// расширим все виды (нужно только виды страниц!)
Backbone.View.prototype.show = function () {
    $('body').addClass('rotate');
    setTimeout(()=> {
        this.$el.animate({left: 0}, params.speedChangePage)
            .queue(function (next) {
                $('body').removeClass('rotate');
                vent.trigger('pageLoaded');
                next();
            });
    }, 10);
};


//params.drawLogo = function () {
//    var logo = document.getElementById("canvasLogo")
//        ,ctx = logo.getContext('2d')
//        ,color = '#ddd'
//        ,scale = 0.2
//        ;
//    //console.log(logo);
//    logo.width  = 252;
//    logo.height = 140;
//    ctx.scale(scale, scale);
//
//    ctx.beginPath();
//    ctx.moveTo(0, 0); ctx.lineTo(56, 0); ctx.lineTo(56, 42); ctx.lineTo(0, 30);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(62, 0); ctx.lineTo(88, 0); ctx.lineTo(88, 58); ctx.lineTo(62, 58);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(96, 0); ctx.lineTo(122, 0); ctx.lineTo(122, 60); ctx.lineTo(96, 60);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(130, 0); ctx.lineTo(156, 0); ctx.lineTo(156, 58); ctx.lineTo(130, 58);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(166, 0); ctx.lineTo(192, 0); ctx.lineTo(192, 60); ctx.lineTo(166, 60);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(200, 0); ctx.lineTo(252, 0); ctx.lineTo(252, 5); ctx.lineTo(200, 34);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(70, 66); ctx.lineTo(112, 66); ctx.lineTo(110, 94); ctx.lineTo(154, 96); ctx.lineTo(148, 110);
//    ctx.lineTo(162, 140); ctx.lineTo(88, 140); ctx.lineTo(100, 110);
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//    ctx.beginPath();
//    ctx.moveTo(120, 70); ctx.lineTo(176, 70); ctx.lineTo(168, 90); ctx.lineTo(116, 88);
//    ctx.closePath();
//    ctx.closePath();
//    ctx.fillStyle = color; ctx.fill();
//    ctx.strokeStyle = color; ctx.stroke();
//
//};
