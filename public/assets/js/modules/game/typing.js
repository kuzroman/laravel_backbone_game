//var $ = require("jquery");
//var _ = require("underscore");
//var Backbone = require("backbone");
import {hp, vent, params} from '../../helper';

// + отрисовать буквы
// + заполнение модели данными о положении буквы

export var TypingV = Backbone.View.extend({
    id: 'typingCenter',
    className: 'typingCenter',
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
        vent.on('removeGame', this.remove, this);
    },
    render: function () {
        this.arrLettersV = [];
        this.collectionLetters = letters;
        //console.log(letters);
        this.parentV.$el.append(this.$el.html('<div>'));
        this.collectionLetters.each(function (letter) {
            var letterV = new LetterV({model: letter});
            this.$el.find('div').append(letterV.$el);
            this.arrLettersV.push(letterV);
        }, this);

        this.showLetter();
        this.setNumberGoal();
    },
    showLetter: function () {
        // + показать буквы
        var i = 0, len = this.arrLettersV.length;

        this.interval = setInterval(() => {
            let letter = this.arrLettersV[i];
            letter.setPositionInModel();
            letter.$el.css('opacity', 1);

            if (letter.model.get('isGoal')) {
                vent.trigger('letterShowed', { // передаем в канвас
                    x: letter.model.get('x2'),
                    y: letter.model.get('y2')
                });
            }

            if (len <= ++i) {
                vent.game.trigger('textLoaded');
                clearInterval(this.interval)
            }
        }, this.model.get('SPEED_TYPING'));
    },
    setNumberGoal: function () {
        this.model.set('NUMBER_GOALS', this.collectionLetters.where({'isGoal': true}).length);
        //console.log( this.collectionLetters.where({'isGoal': true}).length, this.model.get('NUMBER_GOALS') );
    },
    remove: function () {
        clearInterval(this.interval);
        Backbone.View.prototype.remove.call(this);
    },
    updateView: function () {
        this.remove();
        this.render();
    }
});

var Letter = Backbone.Model.extend({
    defaults: {
        symbol: '',
        killed: false,
        isGoal: true,
        x1: -10, x2: -10, y1: 0, y2: 0 // -10 for i.display:block
    }
});

var Letters = Backbone.Collection.extend({
    model: Letter
    //setPositionInModel: function () {
    //    console.log(this);
    //}
});

var LetterV = Backbone.View.extend({
    tagName: 'i',
    initialize: function () {
        this.render();
        //this.resize();
        //vent.on('textLoaded', this.setPositionInModel, this); // cause slide effect on start, we need change position in finish
        vent.on('removeGame', this.remove, this);
        this.listenTo(this.model, 'change:killed', this.hideLetter);
    },
    render: function () {
        // + сделать перенос строки
        var symbol = this.model.get('symbol');
        if (symbol == '|') {
            symbol = '';
            this.$el.css('display', 'block');
            this.model.set('isGoal', false); // it isn't necessary kill them
        }
        else {
            if (symbol == ' ')
                this.model.set('isGoal', false);
            this.$el.text(symbol);
        }

        return this;
    },
    hideLetter: function (model, killed) {
        if (killed) this.$el.css('opacity', 0);
    },
    setPositionInModel: function () {
        //if (!this.model.get('isGoal')) return;
        this.model.set({
            killed: false,
            x1: ~~this.$el.offset().left,
            x2: ~~( this.$el.offset().left + this.$el.width() ),
            y1: ~~this.$el.offset().top,
            y2: ~~( this.$el.offset().top + this.$el.height() )
        });
    },
    //resizePositionInModel: function () {
    //    this.model.set({
    //        x1: ~~this.$el.offset().left,
    //        x2: ~~( this.$el.offset().left + this.$el.width() ),
    //        y1: ~~this.$el.offset().top,
    //        y2: ~~( this.$el.offset().top + this.$el.height() )
    //    });
    //},
    //resize: function () {
    //    var self = this, resizeTimeoutId;
    //    $(window).on('resize', function () {
    //        console.log(1);
    //        if (!self.isShowed) return;
    //        clearTimeout(resizeTimeoutId);
    //        resizeTimeoutId = setTimeout(function () {
    //            self.resizePositionInModel();
    //        }, 200);
    //    });
    //}
});

/////////////////////////////////////////////////////////////////////////////


//var myText = `Hello, my name is Roman Kuznetsov.
//|I am a web Front-End Engineer and UX enthusiast.
//|I prefer to work in does't big team developers and designers
//|I don't like long-years projects it's boring.)
//|Single page applications, no big websites, and landing page are my passion
//|i'm as fish in the water here.
//|Feel free to take a look at my most recent projects on my work page.
//|Also you can stop and say hello at kuzroman@list.ru`;

var myText = `Hello, my name is Roman Kuznetsov.
|I am a web Front-End Developer and UX enthusiast.
|Single page applications, animation, parallax are my passion
|Feel free to take a look at my most recent projects on my work page.
|Also you can stop and say hello at kuzroman@list.ru`;

//var myText = `Hello|вава вавава|вавава вавава`; // 31 - 4 = 27

myText = $.trim(myText.replace(/\s{2,}/g, ''));
let arrLetter = [], len = myText.length;
for (let i = 0; i < len; i++) {
    arrLetter.push(new Letter({symbol: myText[i]}));
}
export var letters = new Letters(arrLetter);

//export var typingInit = function () {
//    new TypingV({collection: letters});
//};

