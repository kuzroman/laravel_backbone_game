require("../css/main.css");

// backbone - пробрасывает себя глобально
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
        vent.trigger('removePage');
        new GamePageView();
    },
    contact: function () {
        vent.trigger('removePage');
        new ContactPageView();
    },
    skills: function () {
        vent.trigger('removePage');
        new SkillsPageView();
    },
    work: function () {
        vent.trigger('removePage');
        new WorksPageView();
    },
    workDesc: function (pageName) {
        vent.trigger('removePage');
        new DescPageV({pageName:pageName});
    }
});

var router = new Router();
Backbone.history.start();
new NavigationView();

new Audio(); // ! зависит от положинея. ставить после роутов!
