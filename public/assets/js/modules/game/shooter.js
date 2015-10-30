import {vent} from '../../helper';
import {letters} from './typing.js';

// + двигать shooter за мышью
// + делать выстрел при клике

var Shooter = Backbone.Model.extend({
    defaults: {
        x: 0,
        firstShot: true
    }
});
var shooter = new Shooter();

// меняем модель {x}, а так же стреляем через этот вид
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
        vent.on('removeGame', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        //this.cleanAttr();
    },
    shooterMove: function (event) {
        //console.log(this.model.get('x'));
        this.model.set('x', event.offsetX);
    },
    bulletShot: function () {
        //console.log(this.parentM);
        if (!this.parentM.get('textLoaded') ||
            !this.parentM.get('gameStarted') ||
            this.parentM.get('gameFinished'))
            return;

        if (this.model.get('firstShot')) {
            vent.trigger('startTimer');
            this.model.set('firstShot', false);
        }

        //console.log(letters);
        //letters.setPositionInModel();
        
        vent.audio.trigger('play', 'shoot');
        vent.game.trigger('changeShoots');
        let bullet = new Bullet({x: this.model.get('x')});
        new BulletV({model: bullet});
        bullet.changeY();
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
        vent.on('removeGame', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
    },
    //startGame: function () {
    //    //this.updateView();
    //    this.show();
    //},
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

var Bullet = Backbone.Model.extend({
    defaults: {
        x: 0,
        y: $('body').height() - 138, // position of shooter
        died: false,
        numberReachedGoal: 0
    },
    changeY: function () {
        var speed = 2;
        var idInt = setInterval(() => {
            //this.set('y', this.get('y') - 1 - speed);
            this.set('y', this.get('y') - speed);

            //console.log(letters);
            // + to count of hit
            // + to make the letters disappear
            var aims = letters.models
                , bX1 = this.get('x')
                , bX2 = this.get('x') + 12 // bullet size
                ;

            for (var i = 0, len = aims.length; i < len; i++) {

                if (aims[i].get('killed') || !aims[i].get('isGoal') ) continue;
                var y = this.get('y'), y2 = aims[i].get('y2');
                //console.log(this.get('y'));
                
                // they on the one axis y
                if (y == y2 || y == y2 - 1 || y == y2 + 1 ) {
                    if ((bX1 <= aims[i].get('x1') && aims[i].get('x1') <= bX2) || // bullet at left
                        (bX1 <= aims[i].get('x2') && aims[i].get('x2') <= bX2 )) { // bullet at right
                        // they on the one axis x - Goal!
                        aims[i].set('killed', true);
                        vent.game.trigger('changeDestroyed');
                        this.countReachedGoal();
                        if (this.get('numberReachedGoal') == 1) {
                            vent.game.trigger('changeBulletsReachedGoal');
                            vent.audio.trigger('play', 'destroyed');
                        }
                    }
                }
            }

            if (this.get('y') <= -20) {
                this.set('died', true);
                clearInterval(idInt);
            }
        }, 0)
    }
    , countReachedGoal: function () {
        this.set('numberReachedGoal', this.get('numberReachedGoal') + 1);
    }
});

var BulletV = Backbone.View.extend({
    className: 'bullet',
    initialize: function () {
        //console.log(letters);
        this.listenTo(this.model, 'change:y', this.flight);
        this.listenTo(this.model, 'change:died', this.remove);
        this.render();
        vent.on('removeGame', this.remove, this);
    },
    render: function () {
        $('body').append(this.$el);
        this.$el.css({'top': this.model.get('y'), 'left': this.model.get('x')});
    },
    flight: function (model, y) {
        this.$el.css('top', y);
    }
});