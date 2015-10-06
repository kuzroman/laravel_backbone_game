var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

export var vent = _.extend({}, Backbone.Events);

export var hp = {};

hp.tmpl = function (id) {
    return _.template($('#' + id).html());
};

hp.getToken = function () {
    return settings._token; // from header.blade
};

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



