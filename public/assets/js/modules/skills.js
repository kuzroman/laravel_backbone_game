var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");

import {hp, vent} from '../helper';

///////////////////////////////////////////////////////////////////////

export var SkillsPageView = Backbone.View.extend({
    className: 'skills',
    initialize: function () {
        this.render();
        new SkillsView({pageV:this});
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

var SkillsView = Backbone.View.extend({
    //id: "skills-view",
    initialize: function (options) {
        this.parentV = options.pageV;
        this.skillsV = _.map(dataSkills, function (skill) {
            return new SkillView({model: new Backbone.Model({nameTitle: skill.nameTitle, nameImg: skill.nameImg})});
        });

        this.render();
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        console.log(this.parentV.$el);
        this.parentV.$el.append(this.el);

        var div = $('<div>'), len = this.skillsV.length - 1;
        _.each(this.skillsV, function (view, key) {
            div.append(view.el);
            if (( key+1) % 3 == 0) {
                this.$el.append(div);
                div = $('<div>');
            }
            else if (key == len) {
                this.$el.append(div);
            }
        }, this);
    }
});

var dataSkills = [
    { nameTitle: 'html5' , nameImg: 'html'}
    ,{ nameTitle: 'css3' , nameImg: 'css'}
    ,{ nameTitle: 'javascript es6' , nameImg: 'js'}
    ,{ nameTitle: 'node' , nameImg: 'node'}
    ,{ nameTitle: 'grunt' , nameImg: 'grunt'}
    ,{ nameTitle: 'bower' , nameImg: 'bower'}
    ,{ nameTitle: 'browser sync' , nameImg: 'browsersync'}
    ,{ nameTitle: 'webpack' , nameImg: 'webpack'}
    ,{ nameTitle: 'babel' , nameImg: 'babel'}
    ,{ nameTitle: 'git' , nameImg: 'git'}
    ,{ nameTitle: 'github' , nameImg: 'github'}
    ,{ nameTitle: 'smartgit' , nameImg: 'smartgit'}
    ,{ nameTitle: 'apache' , nameImg: 'apache'}
    ,{ nameTitle: 'php' , nameImg: 'php'}
    ,{ nameTitle: 'mysql' , nameImg: 'mysql'}];

var SkillView = Backbone.View.extend({
    tagName: 'a',
    className: 'works-work',
    template: hp.tmpl('tmplSkill'),
    events: {
        "click": "alertName"
    },
    initialize: function () {
        this.render();
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    },
    alertName: function () {
        console.log('click');
    }
});
