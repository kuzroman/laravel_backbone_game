var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {hp, vent, params} from '../../helper';

export var BoardResult = Backbone.View.extend({
    id: 'results',
    className: 'results',
    template: hp.tmpl('tmplBoardResult'),
    events: {
        'click .resultsClose': 'close',
        'click #openBoardLeader': 'openBoardLeader'
    },
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
    },
    render: function () {
        this.parentV.$el.append(this.$el.append(this.template));
    },
    close: function () {
        this.hide();
        vent.trigger('game:showBtn');
    },
    openBoardLeader: function () {
        this.hide();
        vent.trigger('openBoardLeader');
    },
    show: function () {
        this.setAccuracy();
        this.setScore();
        this.getBestScoreAndRecord(this.model.get('score'));
        this.scoring();
        this.$el.animate({left: params.bodyW / 2 - 232, opacity:1}, 300);
    },
    hide: function () {
        this.$el.animate({left:-500, opacity:0}, 300);
    },
    scoring: function () {
        this.$el.find('#resTimeSpend').text(this.model.get('timeSpend'));
        this.$el.find('#resShoots').text(this.model.get('shoots'));
        this.$el.find('#resDestroyed').text(this.model.get('destroyed'));
        this.$el.find('#resAccuracy').text(this.model.get('accuracy'));
        this.$el.find('#resScore').text(this.model.get('score'));

        let resBestScore = this.$el.find('#resBestScore');
        resBestScore.text(this.model.get('bestScore'));
        if (this.model.get('record')) resBestScore.addClass('record');
        else resBestScore.removeClass('record');
    },
    setAccuracy: function () {
        this.model.set('accuracy',
            Math.floor(this.model.get('bulletsReachedGoal') / this.model.get('shoots') * 100) || 0);
    },
    setScore: function () {
        this.model.set('score',
            Math.floor(
                this.model.get('accuracy') * this.model.get('destroyed') / this.model.get('timeSpend')
            ) || 0
        );
    },
    getBestScoreAndRecord: function (newScore) {
        var bestScore = window.localStorage.getItem('bestScore'),
            record = false
            ;
        if (!bestScore || bestScore < newScore) {
            bestScore = newScore;
            window.localStorage.setItem('bestScore', bestScore);
            record = true;
        }
        //console.log({bestScore:bestScore, record:record});
        this.model.set('bestScore', bestScore);
        this.model.set('record', record);
    }
});