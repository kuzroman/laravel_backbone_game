/*
 исследовать -
 http://handlebarsjs.com/
 http://susy.oddbird.net/
 google: sass media query
 normalize.css
 HTML5 Boilerplate

 - work description make as separate page! work/cash-back/, work/cash-back-calc/
 - to pass jquery & underscore Globally
 - logo bank of moscow in gallery
 - menu should disappeared after the page loaded
 - handle the error if user entered invalid name in results

 Удалил из Gruntfile
 возможно когданибудь придется использовать
 "grunt-contrib-clean": "^0.6.0",
 "grunt-contrib-copy": "^0.7.0",
 "grunt-contrib-watch": "^0.6.1",
 "time-grunt": "^1.2.1",
 возможно больше не понадобится, проверить(удалив их из ноды!)
 "node-sass": "^3.3.3"
 * */

//require("../css/main.css");

// backbone - пробрасывает себя глобально, достаточно загрузить только здесь
var Backbone = require("backbone");

import {vent} from './helper';
import {NavigationView} from './modules/topNav';

// page work
import {WorksPageView} from './modules/works/work';
// page skills
import {SkillsPageView} from './modules/skills';
// page game
import {GamePageView} from './modules/game/game';
// page desc
import {DescPageV} from './modules/works/desc';
///////////////////////////////////////////////////////////////////////////

var Router = Backbone.Router.extend({
    routes: {
        '': 'game'
        , "users": "users"
        , "about": "about"
        , "skills": "skills"
        , "work": "work"
        , "work/:query": "workDesc"  // #work/some
    },
    users: function () {
        console.log('router users');
    },
    game: function () {
        console.log('page game');
        vent.trigger('removePage');
        new GamePageView();
    },
    work: function () {
        console.log('page work');
        vent.trigger('removePage');
        new WorksPageView();
    },
    about: function () {
        console.log('router about');
    },
    skills: function () {
        console.log('page skills');
        vent.trigger('removePage');
        new SkillsPageView();
    },
    workDesc: function (pageName) {
        //console.log(arguments);
        console.log('page workDesc');
        vent.trigger('removePage');
        new DescPageV({pageName:pageName});
    }

});

var router = new Router();
//$(window).on("hashchange", router.hashChange); // this will run before backbone's route handler
//$(window).on("beforeunload", router.beforeUnload);
Backbone.history.start();
new NavigationView();