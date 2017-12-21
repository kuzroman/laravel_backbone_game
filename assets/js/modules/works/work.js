import {hp, vent, params} from '../../helper';

export let WorksPageView = Backbone.View.extend({
    className: 'page works',
    initialize: function () {
        this.render();
        new WorksView({pageV: this});

        this.listenTo(vent, 'removePage', this.remove);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    remove: function () {
        vent.off('removePage');
        this.$el.addClass('rotate');
        setTimeout(()=> {
            Backbone.View.prototype.remove.call(this);
            vent.trigger('removeWork');
        }, params.speedChangePage);
    }
});

let WorksView = Backbone.View.extend({
    className: 'works-view',
    initialize: function (options) {
        this.parentV = options.pageV;
        this.worksV = _.map(dataWorks, function (work) {
            return new WorkView({model: new Backbone.Model(work)});
        });

        this.render();
        this.cubsInLine();
        this.resize();
        //vent.on('removeWork', this.remove, this);
        this.listenTo(vent, 'removeWork', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        _.each(this.worksV, function (view) {
            this.$el.append(view.el);
        }, this);
    },
    cubsInLine: function (isAnimation) {
        let countEl = this.worksV.length
            , elSize = 325 // 25 it's offset
            , fieldW = this.$el.width()
            , countInColumn = Math.floor(fieldW / elSize) || 1;

        if (countInColumn == 1) elSize = 300;

        let countInRow = Math.ceil(countEl / countInColumn)
            , fieldH = countInRow * elSize
            , centerX = ( fieldW - (countInColumn * elSize) ) / 2
            , centerY = ( fieldH - (countInRow * elSize) ) / 2
            , x = centerX, y = centerY
            ;

        //if (fieldW < 480) return; // we will work only with css!
        //console.log(countEl, countInColumn, countInRow, elSize );

        for (let i = 0; i < countEl; i++) {
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
        let self = this, resizeTimeoutId;
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

let WorkView = Backbone.View.extend({
    tagName: 'a',
    className: 'works-work',
    template: hp.tmpl('tmplWork'),
    initialize: function () {
        this.render();
        this.listenTo(vent, 'removeWork', this.remove);
    },
    render: function () {
        this.$el.attr('href', '#/work/' + this.model.get('href'));
        this.$el.html(this.template(this.model.toJSON()));
    }
});

// названия страниц в формате дефисов! cash-back-calc
export let dataWorks = [
    {
        href: 'videojs',
        nameTitle: 'RBC video player',
        nameCompany: 'Ros Business Consulting',
        descCompany: 'The RBC Group operates on the mass media (an information agency, business television channel RBC TV, online newspapers, and marketing communications) and IT (RBC SOFT) markets.',
        numberImg: 4,
        descDeal: '<h3>Task</h3><p>The company want to refuse from comercial plugin jwplayer with annual payment.</p><p>I need to find a solution for build new video player with support:</p><ul> <li>pre roll advertising</li> <li>VAST ad</li> <li>streaming HLS (online stream)</li> <li>read file with .m3u8</li> <li>quality changing menu</li> <li>all modern browsers (ie10+)</li> <li>all mobile & tablet browsers (android 4.4+, iOs7+)</li> <li>fullScreen</li> <li>include player in different place on site, in topline in small area & popup, also 2 view in content area in infinite scrolling</li> <li>to apply this solution for all projects of company rbc.ru, tv.rbc.ru, rbc.ru/newspaper, www.rbc.ru/magazine, quote.rbc.ru, autonews.ru, sport.rbc.ru, realty.rbc.ru ... </li></ul><p>Time for solution - one month</p><h3>Solution</h3><p>market analysis video plugins, check ease of use for API, to apply this solution for all projects of company Was used next plugins for a work</p><ul> <li>videojs</li> <li>videojs-contrib-hls</li> <li>videojs-vast-vpaid</li> <li>wrote myself modul for change quality</li></ul> <h3>Задача</h3><p>Компания хочет отказаться от платного плагина jwplayer.</p><p>Необходимо найти решение для создания собственного проигрывателя с поддержкой:</p><ul> <li>предпоказов рекламы (с возможностью пропустить ее)</li> <li>поддержкой VAST рекламы</li> <li>поддержкой потокового видео HLS (онлайн трансляция)</li> <li>поддержкой формата .m3u8</li> <li>возможность сменить качество видео</li> <li>поддержка большинства десктопных браузеров (ie10+)</li> <li>поддержка большинства мобильных браузеров (android 4.4+, iOs7+)</li> <li>поддержка fullScreen</li> <li>внедрение проигрывателя в topline - 2 вида использования в маленьком окне и popup, так же еще 2 вида в контентную область и в бесконечную прокрутку в виде рекрамных вставок </li> <li>распространить данное решение на все основные продукты компании rbc.ru, tv.rbc.ru, rbc.ru/newspaper, www.rbc.ru/magazine, quote.rbc.ru, autonews.ru, sport.rbc.ru, realty.rbc.ru ... </li></ul><p>Срок выполнения - месяц.</p><h3>Решение</h3><p>Анализ рынка video плагинов, удобства использования их API, внедрение решения в продукты компании. В ходе работы были выбраны следующие плагины</p><ul> <li>videojs</li> <li>videojs-contrib-hls</li> <li>videojs-vast-vpaid</li> <li>написан свой модуль для смены качества видео</li></ul>',
        skills: ['js, html5, jQuery, git, npm, gulp'],
        descDopInfo: '',
        link: 'https://rbc.ru/'
    },
    {
        href: 'cash-rbc',
        nameTitle: 'RBC Cash',
        nameCompany: 'Ros Business Consulting',
        descCompany: 'The RBC Group operates on the mass media (an information agency, business television channel RBC TV, online newspapers, and marketing communications) and IT (RBC SOFT) markets.',
        numberImg: 4,
        descDeal: '<h3>Exchange Rate Lookup</h3><p>Spent 4 month for implementation (from start to tests and deploy to prodaction)</p><p>Single page application, was made a next modules</p><i>Main page:</i><ul><li>- list of banks associated with map</li><li>- toggle binding to map</li><li>- filters by rate, currencies & buy/sell</li><li>- search by subway(metro) stations</li><li>- toggler of view with map or only list of banks</li><li>- toggler cities</li><li>- adding banks to favorite list</li><li>- sorting list of banks by name or rate</li><li>- auto update list of banks</li><li>- support from ie8 to tablets</li></ul><i>Statistics:</i><ul><li>- line chart</li><li>- list of rates</li><li>- filters by currencies, dates</li><li>- toggler max rate</li><li>- auto update information</li><li>- toggler cities</li></ul><i>Info pages:</i><ul><li>- search by list</li><li>- toggler cities</li></ul>',
        skills: ['HTML5 - history', 'JS','SPA','LESS','HTML','CSS3','jQuery','AJAX','JSON','Gulp','Browserify','Mercurial, git','npm'],
        descDopInfo: '',
        link: 'https://cash.rbc.ru/cash/'
    },
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
        skills: ['HTML5 - canvas, audio','CSS3','JavaScript','ES6','jQuery','AJAX','JSON','Backbone','Underscore','Webpack','Babel','SASS','Bower','NPM','PHP','MySQL','Git','GitHub','Photoshop'],
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
        link: 'http://www.bm.ru/ru/private/paket-visota/cashback/'
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
        href: 'boulevard',
        nameTitle: 'Creative agency',
        nameCompany: 'Advertising boulevard',
        descCompany: 'Strategic marketing, creative development and production',
        numberImg: 7,
        descDeal: '<i>Mostly layout from psd to html & js</i><br><a href="http://trueski.ru/">trueski.ru</a><br><a href="http://www.belbereg.ru/">belbereg.ru</a><br><a href="http://www.imperialtea.ru/">imperialtea.ru</a><br><a href="http://www.tom-t.ru/">tom-t.ru</a><br><a href="www.trans-i.ru">trans-i.ru</a><br>',
        skills: ['HTML', 'CSS3', 'JavaScript', 'jQuery', 'animations', 'Photoshop'],
        descDopInfo: '',
        link: 'http://www.designbox.ru/eng/'
    }
];