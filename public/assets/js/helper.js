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

// расширим виды
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
