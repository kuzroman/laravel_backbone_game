var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");

import {hp, vent} from '../../helper';

///////////////////////////////////////////////////////////////////////

// todo чтобы небыло задержки можно показыват их полсе рендеринга!

export var WorksPageView = Backbone.View.extend({
    className: 'works',
    initialize: function () {
        this.render();
        new WorksView({pageV: this});
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    show: function () {
        setTimeout(()=> {
            this.$el.animate({left: 0}, 300);
        }, 10);
    },
    remove: function () {
        vent.off();
        Backbone.View.prototype.remove.call(this);
    }
});

var WorksView = Backbone.View.extend({
    //id: 'works-view',
    initialize: function (options) {
        this.parentV = options.pageV;
        this.worksV = _.map(dataWorks, function (work) {
            return new WorkView({model: new Backbone.Model(work)});
        });

        this.render();
        this.cubsInLine();
        this.resize();
        vent.on('removePage', this.remove, this);
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
            , countInColumn = Math.floor(fieldW / elSize)
            , countInRow = Math.ceil(countEl / countInColumn)
            , fieldH = countInRow * elSize
            , centerX = ( fieldW - (countInColumn * elSize) ) / 2
            , centerY = ( fieldH - (countInRow * elSize) ) / 2
            , x = centerX, y = centerY
            ;

        if (fieldW < 650) return; // we will work only with css!
        //console.log(countInColumn, countInRow, elSize);

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
    //events: {
    //    "click": "openDescription"
    //},
    initialize: function () {
        this.render();
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.$el.attr('href', '#/work/' + this.model.get('href'));
        this.$el.html(this.template(this.model.toJSON()));
    },
    //openDescription: function () {
    //    console.log('click');
    //}
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
        nameTitle: 'Cash back calculator',
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 3,
        descDeal: '<i>The calculation of the money by program cash back</i> <hr> <p> <ul><li>calendar programs</li><li>calculator money back</li></ul> </p>',
        skills: ['HTML', 'CSS3, SASS', 'JavaScript', 'jQuery', 'AJAX', 'Bower', 'Git', 'Photoshop'],
        descDopInfo: '',
        link: ''
    },
    {
        href: 'cash-back',
        nameTitle: 'Landing page', // пишем либо название компании, либо что делал
        nameCompany: 'Bank of Moscow',
        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
        numberImg: 2,
        descDeal: '<i>Landing page for promotion</i>',
        skills: ['HTML', 'CSS3, SASS', 'JavaScript', 'jQuery', 'Parallax', 'UI/UX animations', 'Bower', 'Git', 'Photoshop'],
        descDopInfo: '',
        link: 'http://www.bm.ru/lp/011/'
    },
//    {
//        href: 'tretyakov-gallery',
//        nameTitle: 'Landing page',
//        nameCompany: 'Bank of Moscow',
//        descCompany: 'Russian Bank providing banking services to both legal entities and individuals',
//        numberImg: 2,
//        descDeal: '',
//        skills: ['custom','custom','custom','custom','custom','custom','custom'],
//        descDopInfo: '',
//        link: 'bm.ru/lp/011/'
//    }
];

