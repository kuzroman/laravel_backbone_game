var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");
import {hp, vent, params} from '../../helper';

import {Btn} from './btn.js';
import {LoaderV} from './loader.js';
import {TypingV} from './typing.js';
import {ShooterMouseArea, ShooterV} from './shooter.js';
import {Canvas} from './canvasPartialsFall.js';
import {BoardResult} from './boardResult.js';
import {BoardLeaderV} from './boardLeader.js';

var Game = Backbone.Model.extend({
    defaults: {
        PERIOD: 1, // stop the time if all goal reached
        SPEED_TYPING: 0, // 10
        SPEED_PARTIALS: 0, // 15
        NUMBER_GOALS: 0, // set in typing

        timeSpend: 0,
        destroyed: 0,
        shoots: 0,
        accuracy: 0,
        score: 0,
        bulletsReachedGoal: 0,
        bestScore: 0,
        record: false,
        textLoaded: false,
        gameStarted: false,
        gameFinished: false
    },
    initialize: function () {
        vent.on('game:textLoaded', function () {
            this.set('textLoaded', true);
        }, this);
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
        vent.on('game:startGame', function () {
            this.set('gameStarted', true);
        }, this);
    },
    isGameFinished: function () {
        var result = !(this.get('NUMBER_GOALS') - this.get('destroyed')) // !(0) -> all goals destroyed
                || this.get('timeSpend') == this.get('PERIOD') // time left) {
            ;
        if (!result) return;

        this.set('gameFinished', result);
        vent.trigger('game:stopGame'); // нельзя слушать через модель, т.к. необходимо делать сброс модели вконце игры
        return result;
    },
    counter: function (param) {
        this.set(param, this.get(param) + 1);
    },
    setDefaults: function () {
        this.set('timeSpend', 0);
        this.set('destroyed', 0);
        this.set('shoots', 0);
        this.set('bulletsReachedGoal', 0);
        this.set('textLoaded', false);
        this.set('gameStarted', false);
        this.set('gameFinished', false);
    }
});

export var GamePageView = Backbone.View.extend({
    className: 'game',
    initialize: function () {
        this.render();

        this.listenTo(this.model, 'change:gameStarted', this.startGame);
        vent.on('game:stopGame', this.stopGame, this);
        vent.on('removePage', this.remove, this);
        vent.on('game:showBtn', function () {
            this.modules.btn.showEl();
        }, this);

        this.gameNumber = 0;
    },

    render: function () {
        var gameModel = new Game(), options;
        this.options = {model: gameModel, pageV: this};
        this.model = gameModel;

        $('body').append(this.$el);

        this.modules = {};
        this.modules.typingV = new TypingV(this.options);
        this.modules.canvas = new Canvas(this.options);
        this.modules.btn = new Btn(this.options);
        this.modules.shooterV = new ShooterV(this.options);
        this.modules.loaderV = new LoaderV(this.options);
        this.modules.boardResult = new BoardResult(this.options);
        this.modules.boardLeader = new BoardLeaderV(this.options);
        this.shooterMouseArea = new ShooterMouseArea(this.options);
    },
    startGame: function (model, gameStarted) {
        if (!gameStarted) return;

        if (this.gameNumber++) {
            this.modules.typingV.updateView();
        }

        this.modules.shooterV.show();
        this.modules.loaderV.show();
    },
    stopGame: function () {
        this.shooterMouseArea.cleanAttr();
        this.modules.shooterV.hide();
        this.modules.loaderV.hide();
        this.modules.boardResult.show();

        this.model.setDefaults();
    },
    remove: function () {
        vent.off();
        Backbone.View.prototype.remove.call(this);
    },
    updateView: function () {
        this.remove();
        this.render();
    }
});

