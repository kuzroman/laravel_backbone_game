import {vent, params} from '../../helper';
import {letters} from './typing.js';
//import {Canvas} from './canvasPartialsFall.js';

// + двигать shooter за мышью
// + делать выстрел при клике

var Shooter = Backbone.Model.extend({
    defaults: {
        x: 0,
        firstShot: true
    }
});
var shooter = new Shooter();

// меняем модель {x}, а так же стреляем
export var ShooterMouseArea = Backbone.View.extend({
    id: 'shooterMouseArea',
    events: {
        'click': 'bulletShot',
        'mousemove': 'shooterMove'
    },
    initialize: function (options) {
        this.parentV = options.pageV;
        this.parentM = options.model;
        this.model = shooter;
        this.render();
        this.canvasForBulletV = new CanvasForBulletV(options);
        this.listenTo(vent, 'removeGame', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        //this.cleanAttr();
    },
    shooterMove: function (event) {
        this.model.set('x', event.offsetX);
    },
    bulletShot: function () {
        //console.log(this.parentM);
        if (!this.parentM.get('textLoaded') || !this.parentM.get('gameStarted') ||
            this.parentM.get('gameFinished'))
            return;

        if (this.model.get('firstShot')) {
            vent.trigger('startTimer');
            this.model.set('firstShot', false);
        }

        vent.audio.trigger('play', 'shoot');
        vent.game.trigger('changeShoots');

        //for (var i = 0, len = 20; i < len; i++) {
        //    var x = i * 20;
        //    this.canvasForBulletV.createBullet(x);
        //}
        this.canvasForBulletV.createBullet(this.model.get('x'));
    },
    cleanAttr: function () {
        this.model.clear().set(this.model.defaults);
    }
});

export var ShooterV = Backbone.View.extend({
    id: 'shooter',
    className: 'shooter',
    //,events: {}
    initialize: function (options) {
        this.parentV = options.pageV;
        this.model = shooter;
        this.listenTo(this.model, 'change:x', this.move);
        this.render();
        this.listenTo(vent, 'removeGame', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
    },
    move: function (model, x) {
        this.$el.css('left', x);
    },
    show: function () {
        this.$el.addClass('show');
    },
    hide: function () {
        this.$el.removeClass('show');
    },
    remove: function () {
        this.hide();
        Backbone.View.prototype.remove.call(this);
    }
});

////////////////////////////////////////////////

var CanvasForBulletV = Backbone.View.extend({
    tagName: 'canvas',
    className: 'canvasLoader',
    initialize: function (options) {
        this.bullets = [];
        this.ctx = this.el.getContext('2d');
        this.intervalStatus = 'act';
        this.parentV = options.pageV;

        this.render();
        this.animations();
        this.listenTo(vent, 'removeGame', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        this.el.width = params.bodyW;
        this.el.height = params.bodyH;
        return this;
    },
    createBullet: function (x) {
        this.bullets.push(new Bullet({x: x, ctx: this.ctx}));
    },

    animations: function () {
        var isInt = setInterval(() => {
            //console.log(this.intervalStatus);
            this.clearCanvas();
            this.update();
            if (this.intervalStatus == 'stop') {
                clearInterval(isInt);
                this.clearCanvas();
            }
        }, 0)
    },
    clearCanvas: function () {
        this.ctx.fillStyle = "#2f2f2f";
        this.ctx.clearRect(0, 0, 5000, 5000);
    },
    update: function () {
        //var isReachedGoal = false;
        //console.log('update', this.bullets.length);
        for (let j = 0, b, lenBullets = this.bullets.length; j < lenBullets; j++) {
            b = this.bullets[j];
            b.y -= 2;
            b.draw();


            let aims = letters.models,
                bX1 = b.x,
                bX2 = bX1 + 12 // bullet size
            ;

            for (let i = 0, len = aims.length; i < len; i++) {
                if (aims[i].get('killed') || !aims[i].get('isGoal') ) continue;
                var y2 = aims[i].get('y2');

                // they on the one axis y
                if (b.y == y2 || b.y == y2 - 1 || b.y == y2 + 1 ) {
                    if ((bX1 <= aims[i].get('x1') && aims[i].get('x1') <= bX2) || // bullet at left
                        (bX1 <= aims[i].get('x2') && aims[i].get('x2') <= bX2 )) { // bullet at right
                        // they on the one axis x - Goal!
                        aims[i].set('killed', true);
                        vent.game.trigger('changeDestroyed');

                        if (!b.isReachedGoal) {
                            b.isReachedGoal = true;
                            vent.game.trigger('changeBulletsReachedGoal');
                            vent.audio.trigger('play', 'destroyed');
                        }
                    }
                }
            }

            if (b.y < -20) {
                this.bullets.splice(j, 1);
                lenBullets = this.bullets.length;
            }
        }
    },
    remove: function () {
        this.intervalStatus = 'stop';
        Backbone.View.prototype.remove.call(this);
    }
});

var Bullet = class {
    constructor(data) {
        this.x = data.x || 0;
        this.y = data.y || $('body').height() - 138;
        this.ctx = data.ctx;
        this.isReachedGoal = false;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 6, 0, Math.PI * 2, true);
        this.ctx.fillStyle = "#f1ff00";
        this.ctx.fill();
    }
};
