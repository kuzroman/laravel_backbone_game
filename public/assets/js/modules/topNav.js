var $ = require("jquery");
//var Backbone = require("backbone");

import {hp} from '../helper';

export var NavigationView = Backbone.View.extend({
    initialize: function () {
        this.icon = new NavIconView();
        this.menu = new NavMenuView();
    }
    ,remove: function () {
        this.icon.remove();
        this.menu.remove();
    }
});

var ev = $.extend({}, Backbone.Events);

var Navigation = Backbone.Model.extend({
    //url: 'someUrl.json',
    defaults: function () {
        return {
            opened: false
        };
    }
    , initialize: function () {
        this.listenTo(this, 'change', function () {
            ev.trigger('changeOpened')
        }, this);
    },
    toggle: function () {
        //console.log('toggle');
        //this.save({ opened: !this.get('opened') }); // save -> post
        this.set({opened: !this.get('opened')});
    }
});

var navigation = new Navigation();

var NavIconView = Backbone.View.extend({
    id: 'topMenu'
    ,className: 'topMenu',
    events: {
        'click': 'toggleOpened'
    }
    , initialize: function () {
        $("body").append(this.el);
        //console.log('init NavIconView');
        //this.setElement($('#topMenu'));
        this.model = navigation;
        this.listenTo(ev, 'changeOpened', this.changeIcon);
    }
    , toggleOpened: function () {
        //console.log('toggleOpened');
        this.model.toggle();
    }
    , changeIcon: function () {
        //console.log(this.model.get('opened'));
        this.$el.toggleClass('close', this.model.get('opened'));
    }
});

var NavMenuView = Backbone.View.extend({
    id: 'topNav'
    ,className: 'topNav hidden',
    template: hp.tmpl('tmplMenu'),
    events: {
        'click a': 'clickLinc'
    },
    initialize: function () {
        $("body").append(this.el);
        //this.setElement($('#topNav'));
        this.model = navigation;
        this.listenTo(ev, 'changeOpened', this.showMenu);
        this.render();
    }
    ,render: function () {
        this.$el.html(this.template());
    }
    ,clickLinc: function () {
        this.model.toggle();
    }
    , showMenu: function () {
        //console.log(this.model.get('opened'));
        this.$el.toggleClass('hidden', !this.model.get('opened'));
    }
});