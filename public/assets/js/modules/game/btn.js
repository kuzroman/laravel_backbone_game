var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {vent} from '../../helper';

export var BtnModel = Backbone.Model.extend({
    defaults: {
        text: 'DESTROY THIS TEXT',
        isFirstStart: true
    },
    //,initialize: function () {}
    changeFirstStart () {
        this.set('isFirstStart', false);
    }
});

// + изменить значение модели gameStarted при клике
// + модель файрит событие о том что она изменилась

export var Btn = Backbone.View.extend({
    id: 'startGameBtn_2',
    className: 'button',
    events: {
        'click': 'btnClick'
    },
    initialize: function (options) {
        this.parentV = options.pageV;
        this.model = new BtnModel();
        this.render();
        //this.listenTo(this.model, 'change:gameStarted', this.hideEl);
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.$el.text(this.model.get('text'));
        this.parentV.$el.append(this.$el);
    },

    btnClick: function () {
        vent.trigger('game:StartGame', this.model.get('isFirstStart') );
        this.hideEl();
        this.model.changeFirstStart();
    },
    showEl: function () {
        this.$el.text('PLAY AGAIN').removeClass('hide');
    },
    hideEl: function () {
        this.$el.addClass('hide');
    },
    changeText: function () {
        this.$el.text('PLAY AGAIN');
    }
});


