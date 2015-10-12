var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");

export var vent = _.extend({}, Backbone.Events);

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



