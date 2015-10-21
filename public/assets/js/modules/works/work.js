//var $ = require("jquery");
//var _ = require("underscore");
//var Backbone = require("backbone");

import {hp, vent, params} from '../../helper';

///////////////////////////////////////////////////////////////////////

// todo чтобы небыло задержки можно показыват их полсе рендеринга!

export var WorksPageView = Backbone.View.extend({
    className: 'page works',
    initialize: function () {
        this.render();
        new WorksView({pageV: this});
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    remove: function () {
        vent.off();

        $('body').addClass('rotate');
        this.$el.addClass('rotate');
        setTimeout(()=> {
            Backbone.View.prototype.remove.call(this);
            vent.trigger('removeWork');
        }, params.speedChangePage);
    }
});

var WorksView = Backbone.View.extend({
    className: 'works-view',
    initialize: function (options) {
        this.parentV = options.pageV;
        this.worksV = _.map(dataWorks, function (work) {
            return new WorkView({model: new Backbone.Model(work)});
        });

        this.render();
        this.cubsInLine();
        this.resize();
        vent.on('removeWork', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        _.each(this.worksV, function (view) {
            this.$el.append(view.el);
        }, this);
    },
    cubsInLine: function (isAnimation) {
        //console.log('cubsInLine');
        var countEl = this.worksV.length
            , elSize = 325 // 25 it's offset
            , fieldW = this.$el.width()
            , countInColumn = Math.floor(fieldW / elSize) || 1;

        if (countInColumn == 1) elSize = 300;

        var countInRow = Math.ceil(countEl / countInColumn)
            , fieldH = countInRow * elSize
            , centerX = ( fieldW - (countInColumn * elSize) ) / 2
            , centerY = ( fieldH - (countInRow * elSize) ) / 2
            , x = centerX, y = centerY
            ;

        //if (fieldW < 480) return; // we will work only with css!
        //console.log(countEl, countInColumn, countInRow, elSize );

        for (var i = 0; i < countEl; i++) {
            //coordinateList[i] = {x:x, y:y};
            if (!i) {
                if (y < 0) y = 0;
            } // don't change x,y
            else if (i && (i % (countInColumn) == 0)) {
                y = y + elSize;
                x = centerX;
            }
            else x = x + elSize;
            //console.log(x,y);

            if (isAnimation) this.worksV[i].$el.animate({left: x, top: y}, 1000); //.css('transform','rotate(0)');
            else this.worksV[i].$el.css({left: x, top: y});
        }
        this.$el.css('height', fieldH);
    },
    resize: function () {
        var self = this, resizeTimeoutId;
        //console.log(this);
        $(window).on('resize', function () {
            clearTimeout(resizeTimeoutId);
            resizeTimeoutId = setTimeout(function () {
                //alert($(window).width());
                self.cubsInLine(true);
            }, 200);
        });
    },
    remove: function () {
        $(window).off("resize", this.resize);
        Backbone.View.prototype.remove.call(this);
    }
});

var WorkView = Backbone.View.extend({
    tagName: 'a',
    className: 'works-work',
    template: hp.tmpl('tmplWork'),
    initialize: function () {
        this.render();
        vent.on('removeWork', this.remove, this);
    },
    render: function () {
        this.$el.attr('href', '#/work/' + this.model.get('href'));
        this.$el.html(this.template(this.model.toJSON()));
    }
});

// названия страниц в формате дефисов! cash-back-calc
export var dataWorks = [
    {
        href: 'anywayanyday',
        nameTitle: 'Best fares',
        nameCompany: 'Anywayanyday',
        descCompany: 'International online travel Agency. Service offices are open in Ukraine, Germany, USA and Switzerland',
        numberImg: 4,
        descDeal: '<i>Worked 3 months in a large team of great professionals.</i><hr><p>Developed a module searching for the best rates.<ul><li>Search filter</li><li>Dynamics of prices</li><li>Subscribe to the best prices</li></ul></p>',
        skills: ['HTML','CSS3','JavaScript','jQuery', 'AJAX', 'JSON, JSONP', 'Require.js', 'Git', 'Photoshop', 'Responsive Website Design'],
        descDopInfo: '',
        link: 'http://www.anywayanyday.com/'
    },
    {
        href: 'kuzroman',
        nameTitle: 'Portfolio',
        nameCompany: 'Kuznetsov Roman',
        descCompany: '',
        numberImg: 3,
        descDeal: 'The idea behind this project was to create a showcase of everything I have worked on in the past few years. I tried to keep the UI as simple as possible.',
        skills: ['HTML5','CSS3','JavaScript','ES6','jQuery','AJAX','JSON','Backbone','Underscore','Grunt','Webpack','Babel','SASS','BrowserSync','Bower','NPM', 'PHP', 'Laravel','MySQL','Git','GitHub','Photoshop'],
        descDopInfo: '',
        link: ''
    },
    {
        href: 'private-banking-platinum',
        nameTitle: 'Private banking landing page',
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 3,
        descDeal: '<i>Landing Page for holders of platinum cards</i> <hr> <ul> <li>layout from psd to html</li> <li>integration with cms of Bank</li> <li>video background</li> <li>cash back calculator</li> <li>web form</li> <li>popup content</li> </ul>',
        skills: ['HTML5 - video','CSS3, SASS','JavaScript','jQuery','Bower','Git','Photoshop'],
        descDopInfo: '',
        link: 'http://www.bm.ru/ru/private/paket-platinum/cashback/'
    },
    {
        href: 'private-banking',
        nameTitle: 'Private banking',
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 9,
        descDeal: '<i>Personal website for private clients Bank of Moscow</i> <hr> <ul> <li>layout from psd to html</li> <li>integration with cms of Bank</li> <li>parallax effect</li> <li>web form</li> <li>popup content</li> </ul>',
        skills: ['HTML','CSS3, with SASS','JavaScript','jQuery','Parallax','AJAX','Git','Photoshop','Bower'],
        descDopInfo: '',
        link: 'http://www.bm.ru/ru/private/'
    },
    {
        href: 'bm-mobile',
        nameTitle: 'Mobile version',
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 2,
        descDeal: '<ul> <li>layout from psd to html</li> <li>integration with cms of Bank</li> <li>integration with API</li> <li>web form</li> <li>popup content</li> </ul>',
        skills: ['HTML5','CSS3, SASS','JavaScript','jQuery','AJAX','Bower','Git','Photoshop'],
        descDopInfo: '',
        link: 'http://m.bm.ru/'
    },
    {
        href: 'tretyakov-gallery',
        nameTitle: 'Landing page',
        nameCompany: 'Bank of Moscow & Tretyakov State Gallery<br>a joint project',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals<br>The State Tretyakov Gallery possesses a unique collection of Russian art which includes masterpieces which span a period of a thousand years.',
        numberImg: 3,
        descDeal: '<i>A joint project of the Bank of Moscow and the Tretyakov gallery</i> <hr> <p> <ul><li>gallery</li><li>audio guide</li></ul> </p>',
        skills: ['HTML5 - audio','CSS3, with SASS','JavaScript','jQuery','Bower','Git','Photoshop'],
        descDopInfo: '',
        link: 'http://www.bm.ru/ru/private/tretjakovskaja-galereja/'
    },
    {
        href: 'cash-back-calc',
        nameTitle: 'Calculators, transfers, services',
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 4,
        descDeal: '<p> In my duties included creating tools for a work with product of bank.<br>Mortgage calculators, loan calculators, money transfers from card to card, sale of the collateral. </p>',
        skills: ['HTML', 'CSS3, SASS', 'JavaScript', 'jQuery', 'AJAX', 'Bower', 'Git', 'Photoshop', 'Twig'],
        descDopInfo: '',
        link: 'https://www.bm.ru/ru/personal/platezhi-i-perevody/perevody-s-kart/perevody-s-karty-na-karty/'
    },
    {
        href: 'advertising-boulevard',
        nameTitle: 'Creative agency',
        nameCompany: 'Advertising boulevard',
        descCompany: 'Strategic marketing, creative development and production',
        numberImg: 7,
        descDeal: '<i>Mostly layout from psd to html and js</i><br><a href="http://trueski.ru/">trueski.ru</a><br><a href="http://www.belbereg.ru/">belbereg.ru</a><br><a href="http://www.imperialtea.ru/">imperialtea.ru</a><br><a href="http://www.tom-t.ru/">tom-t.ru</a><br><a href="www.trans-i.ru">trans-i.ru</a><br>',
        skills: ['HTML', 'CSS3', 'JavaScript', 'jQuery', 'animations', 'Photoshop'],
        descDopInfo: '',
        link: 'http://www.designbox.ru/eng/'
    }
];

