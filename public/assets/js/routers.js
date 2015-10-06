var Backbone = require("backbone");
import {NavigationView} from './modules/topNav';
import {vent} from './helper';

///////////////////////////////////////////////////////////////////////////
// page work

import {WorksPageView} from './modules/work';

///////////////////////////////////////////////////////////////////////////
// page skills

import {SkillsPageView} from './modules/skills';

///////////////////////////////////////////////////////////////////////////
// page game

import {GamePageView} from './modules/game/game';

///////////////////////////////////////////////////////////////////////////

var Router = Backbone.Router.extend({
    routes: {
        '': 'game'
        , "users": "users"
        , "work": "work"
        , "about": "about"
        , "skills": "skills"
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
    }


    // Checking for a dirty - view http://mikeygee.com/blog/backbone.html
    // например если есть не сохраненные изменения мы можем предупредить пользователя о них перед переходом на др страницу
    //hashChange : function(evt) {
    //    if(this.cancelNavigate) { // cancel out if just reverting the URL
    //        evt.stopImmediatePropagation();
    //        this.cancelNavigate = false;
    //        return;
    //    }
    //    if(this.view && this.view.dirty) {
    //        var dialog = confirm("You have unsaved changes. To stay on the page, press cancel. To discard changes and leave the page, press OK");
    //        if(dialog == true)
    //            return;
    //        else {
    //            evt.stopImmediatePropagation();
    //            this.cancelNavigate = true;
    //            window.location.href = evt.originalEvent.oldURL;
    //        }
    //    }
    //},
    //beforeUnload : function() {
    //    if(this.view && this.view.dirty)
    //        return "You have unsaved changes. If you leave or reload this page, your changes will be lost.";
    //}

});

var router = new Router();
//$(window).on("hashchange", router.hashChange); // this will run before backbone's route handler
//$(window).on("beforeunload", router.beforeUnload);
Backbone.history.start();


new NavigationView();