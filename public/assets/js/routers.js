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
Backbone.history.start();
new NavigationView();

new Audio(); // Внимание! зависит от положинея. ставить после роутов!
