import {hp, vent} from '../../helper';

export let BtnModel = Backbone.Model.extend({
    defaults: {
        text: 'DESTROY THIS TEXT',
        isFirstStart: true,
    },
    changeFirstStart () {
        this.set('isFirstStart', false);
    }
});

// + изменить значение модели gameStarted при клике
// + модель файрит событие о том что она изменилась

export let Btn = Backbone.View.extend({
    id: 'startGameBtn',
    template: hp.tmpl('tmplStartGameBtn'),
    className: 'button',
    events: {
        'click': 'btnClick',
        'mousemove': 'tiltButton'
    },
    initialize: function (options) {
        this.parentV = options.pageV;
        this.model = new BtnModel();
        this.render();
        this.listenTo(vent, 'removeGame', this.remove);
        this.model.set('width', this.getWidth());
        this.model.set('halfWidth', this.getWidth() / 2);
    },
    render: function () {
        this.$el.html(this.template);
        this.$el.find('.button__text').text(this.model.get('text'));
        // this.parentV.$el.append(this.$el);
        this.parentV.$el.append(this.$el);
    },

    btnClick: function () {
        vent.game.trigger('startGame');
        this.hideEl();
        this.model.changeFirstStart();
    },
    showEl: function () {
        this.$el.find('.button__text').text('PLAY AGAIN');
        this.$el.removeClass('hide');
    },
    hideEl: function () {
        this.$el.addClass('hide');
    },
    changeText: function () {
        this.$el.find('.button__text').text('PLAY AGAIN');
    },
    tiltButton: function (e) {
        let x = e.offsetX, angle;
        let halfWidth = this.model.get('halfWidth');
        angle = (x - halfWidth) / 100;
        // console.log(angle);
        this.$el.find('.button__text').css('transform', 'rotate(' + angle + 'deg)');
    },
    getWidth () {
        return this.el.offsetWidth;
    }
});


