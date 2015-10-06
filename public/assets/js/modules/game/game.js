var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {hp, vent, params} from '../../helper';


import {Btn} from './btn.js';
import {ShooterMouseArea, ShooterV} from './shooter.js';
import {LoaderV} from './loader.js';
import {TypingV} from './typing.js';
import {Canvas} from './canvasPartialsFall.js';
import {BoardResult} from './boardResult.js';
import {BoardLeaderV} from './boardLeader.js';

// + при клике на красную кнопку отрисовать shooter
// + при клике на красную кнопку отрисовать timer и loaderSlip


var Game = Backbone.Model.extend({
    defaults: {
        PERIOD: 1, // stop the time if all goal reached
        SPEED_TYPING: 0, // 10
        SPEED_PARTIALS: 0, // 15
        NUMBER_GOALS: 0, // set in typing

        timeSpend: 0, // сбросить
        destroyed: 0, // сбросить
        shoots: 0,    // сбросить
        accuracy: 0,  // сбросить
        score: 0,     // сбросить
        bulletsReachedGoal: 0, // сбросить
        bestScore: 0,  // сбросить
        record: false, // сбросить

        gameFinished: false
        //yourBestResult: 0
    },
    isGameFinished: function () {
        var result = !(this.get('NUMBER_GOALS') - this.get('destroyed')) // !(0) -> all goals destroyed
                || this.get('timeSpend') == this.get('PERIOD') // time left) {
            ;
        if (!result) return;

        this.set('gameFinished', result);
        vent.trigger('game:StopGame'); // нельзя слушать через модель, т.к. необходимо делать сброс модели вконце игры
        return result;
    }

});

export var GamePageView = Backbone.View.extend({
    className: 'game',
    initialize: function () {
        this.render();

        vent.on('game:StartGame', this.startGame, this);
        vent.on('game:StopGame', this.stopGame, this);

        vent.on('removePage', this.remove, this);

        vent.on('game:changeDestroyed', function () {
            this.counter('destroyed')
        }, this);
        vent.on('game:changeShoots', function () {
            this.counter('shoots')
        }, this);
        vent.on('game:changeTimeSpend', function () {
            this.counter('timeSpend')
        }, this);
        vent.on('game:changeBulletsReachedGoal', function () {
            this.counter('bulletsReachedGoal')
        }, this);
        vent.on('game:showBtn', function () {
            this.modules.btn.showEl();
        }, this);

    },

    render: function () {
        var gameModel = new Game(), options;
        this.options = {model: gameModel, pageV: this};
        this.model = gameModel;

        $('body').append(this.$el);

        this.modules = {};
        this.modules.obtypingV = new TypingV(this.options);
        this.modules.canvas = new Canvas(this.options);
        this.modules.btn = new Btn(this.options);
        this.modules.shooterV = new ShooterV(this.options);
        this.modules.loaderV = new LoaderV(this.options);
        this.modules.boardResult = new BoardResult(this.options);
        this.modules.boardLeader = new BoardLeaderV(this.options);

    },
    startGame: function (isFirstStart) {
        if (!isFirstStart) {
            this.model.clear().set(this.model.defaults);
            this.modules.obtypingV.updateView();
        }

        this.modules.shooterMouseArea = new ShooterMouseArea(this.options);
        this.modules.shooterMouseArea.render();

        this.modules.shooterV.show();
        this.modules.loaderV.show();
        //this.modules.boardResult.hide();
        //this.modules.boardLeader.hide();
    },
    stopGame: function () {
        this.modules.shooterMouseArea.remove();
        this.modules.shooterV.hide();
        this.modules.loaderV.hide();
        this.modules.boardResult.show();
    },
    counter: function (param) {
        this.model.set(param, this.model.get(param) + 1);
    },
    remove: function () {
        vent.off();
        Backbone.View.prototype.remove.call(this);
    },
    updateView: function() {
        this.remove();
        this.render();
    }
});

//$(function () {
//    new GamePageView();
//});

