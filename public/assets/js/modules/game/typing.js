var $ = require("jquery");
var _ = require("underscore");
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
        vent.on('removePage', this.remove, this);
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
                vent.trigger('game:textLoaded');
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
});

var LetterV = Backbone.View.extend({
    tagName: 'i',
    initialize: function () {
        this.render();
        vent.on('removePage', this.remove, this);
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
        //if (!this.$el.height()) return; // i.display:block
        this.model.set({
            killed: false,
            x1: ~~this.$el.offset().left,
            x2: ~~( this.$el.offset().left + this.$el.width() ),
            y1: ~~this.$el.offset().top,
            y2: ~~( this.$el.offset().top + this.$el.height() )
        });
    }
});

/////////////////////////////////////////////////////////////////////////////

var myText = `Hello, my name is Roman Kuznetsov.
|I am a web Front-End Engineer and UX enthusiast.
|Check out my latest web components and brackets.io extensions at my lab page.
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

