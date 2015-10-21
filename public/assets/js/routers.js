/*
 исследовать -
 http://handlebarsjs.com/
 http://susy.oddbird.net/
 normalize.css
 HTML5 Boilerplate

 Доделать
 - handle the error if user entered invalid name in results

 Добавить в работы
 - переводы с карты на карту
 - залоговое имущество
 - кредитный калькулятор - можно объеденить с другими калькуляторами
 - так же и landing page - можно все положить в одну страницу ( или придумать отдельную страницу и круто их там разместить)

 Удалил из Gruntfile
 возможно когданибудь придется использовать
 "grunt-contrib-clean": "^0.6.0",
 "grunt-contrib-copy": "^0.7.0",
 "grunt-contrib-watch": "^0.6.1",
 "time-grunt": "^1.2.1",
 возможно больше не понадобится, проверить(удалив их из ноды!)
 "node-sass": "^3.3.3"
 * */


require("../css/main.css");

// backbone - пробрасывает себя глобально, достаточно загрузить только здесь
var Backbone = require("backbone");
import {Audio} from './modules/audio';

import {vent} from './helper';
import {NavigationView} from './modules/topNav';

import {WorksPageView} from './modules/works/work';
import {SkillsPageView} from './modules/skills';
import {GamePageView} from './modules/game/game';
import {DescPageV} from './modules/works/desc';
import {ContactPageView} from './modules/contact';
///////////////////////////////////////////////////////////////////////////

var Router = Backbone.Router.extend({
    routes: {
        '': 'game'
        , "about": "about"
        , "skills": "skills"
        , "contact": "contact"
        , "work": "work"
        , "work/:query": "workDesc"  // #work/some
    },
    game: function () {
        //console.log('page game');
        vent.trigger('removePage');
        new GamePageView();
    },
    contact: function () {
        //console.log('router about');
        vent.trigger('removePage');
        new ContactPageView();
    },
    skills: function () {
        //console.log('page skills');
        vent.trigger('removePage');
        new SkillsPageView();
    },
    work: function () {
        //console.log('page work');
        vent.trigger('removePage');
        new WorksPageView();
    },
    workDesc: function (pageName) {
        //console.log(arguments);
        vent.trigger('removePage');
        new DescPageV({pageName:pageName});
    }
});

var router = new Router();
//$(window).on("hashchange", router.hashChange); // this will run before backbone's route handler
//$(window).on("beforeunload", router.beforeUnload);
Backbone.history.start();
new NavigationView();

new Audio(); // Внимание! класс зависит от положинея. ставить после роутов. доработать!
//params.drawLogo();
