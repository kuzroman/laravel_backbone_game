var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {hp, vent} from '../../helper';

export var LoaderV = Backbone.View.extend({
    id: 'scoreBord',
    className: 'scoreBord',
    template: hp.tmpl('tmplScoreBoard'),
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
        this.timer = new TimerV(options);
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el.append(this.template));
    },
    show: function () {
        this.timer.render();
        this.$el.addClass('show');
    },
    hide: function () {
        this.$el.removeClass('show');
    },
    remove: function () {
        Backbone.View.prototype.remove.call(this);
        this.timer.remove();
    }
});

var TimerV = Backbone.View.extend({
    initialize: function (options) {
        this.setElement('#timer');
        this.model = options.model;
        //this.render();
        vent.on('removePage', this.remove, this);
        vent.on('startTimer', this.start, this);
    },
    render: function () {
        this.$el.text(this.model.get('PERIOD') - this.model.get('timeSpend'));
    },
    start: function () {
        var id = setInterval(() => {
            vent.trigger('game:changeTimeSpend');
            this.render();
            if (this.model.isGameFinished()) {
                //console.log('clear timer');
                clearTimeout(id);
            }
        }, 1000);
    }
});