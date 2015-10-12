var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");
import {hp, vent} from '../../helper';

export var LoaderV = Backbone.View.extend({
    id: 'scoreBord',
    className: 'scoreBord',
    template: hp.tmpl('tmplScoreBoard'),
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();

        this.timer = new TimerV(options);
        this.loaderSlipV = new LoaderSlipV(options);

        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el.append(this.template));
    },
    show: function () {
        this.timer.render();
        this.loaderSlipV.render();
        this.$el.addClass('show');
    },
    hide: function () {
        this.$el.removeClass('show');
    }
});


var LoaderSlipV = Backbone.View.extend({
    initialize: function (options) {
        //this.parentV = options.pageV;
        this.setElement('#loaderSlip');

        this.width = this.$el.width();

        vent.on('game:changeDestroyed', this.shift, this);
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.$el.css({left: 0 });
    },
    shift: function () {
        let percent = this.model.get('destroyed') / (this.model.get('NUMBER_GOALS') / 100)
            ,left = (this.width / 100) * percent
            ;
        //console.log(this.model.get('destroyed'), this.model.get('NUMBER_GOALS'));
        this.$el.css({left: -left });
    }
});

var TimerV = Backbone.View.extend({
    initialize: function (options) {
        this.setElement('#timer');
        this.model = options.model;
        //this.render();
        vent.on('removePage', this.remove, this);
        vent.on('startTimer', this.start, this);
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.$el.text(this.model.get('PERIOD') - this.model.get('timeSpend'));
    },
    start: function () {
        //console.log('startTimer');
        var id = setInterval(() => {
            //console.log('isGameFinished',this.model.isGameFinished());
            vent.trigger('game:changeTimeSpend');
            this.render();
            if (this.model.isGameFinished()) {
                //console.log('clear timer');
                clearTimeout(id);
            }
        }, 1000);
    }
});