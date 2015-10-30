import {hp, vent, params} from '../helper';

export var SkillsPageView = Backbone.View.extend({
    className: 'page skills',
    initialize: function () {
        this.render();
        new ResumeView({pageV:this});
        new SkillsView({pageV:this});
        this.listenTo(vent, 'removePage', this.remove);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    remove: function () {
        vent.off('removePage');
        console.log('remove skills');

        this.$el.addClass('rotate');
        setTimeout(()=> {
            Backbone.View.prototype.remove.call(this);
            vent.trigger('removeSkill');
        }, params.speedChangePage);
    }
});

var ResumeView = Backbone.View.extend({
    className: 'content',
    template: hp.tmpl('tmplResume'),
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
        //vent.on('removeSkill', this.remove, this);
        this.listenTo(vent, 'removeSkill', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.$el.html(this.template()));
    }
});

var SkillsView = Backbone.View.extend({
    //id: "skills-view",
    className: 'skillsBox',
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
        //vent.on('removeSkill', this.remove, this);
        this.listenTo(vent, 'removeSkill', this.remove);
    },
    render: function () {
        this.parentV.$el.append(this.el);

        _.each(skills, (skillsArr, experienceName) => {
            var div = $('<div>',{'class':'experience','data-experience':experienceName});
            
            _.each(skillsArr, (skillObj, num) => {
                var skillV = new SkillView({model: new Backbone.Model({title: skillObj.title, nameImg: skillObj.nameImg})});
                div.append(skillV.el);
            });
            this.$el.append(div);
        });
    }
});

var skills = {
    'Master': [
        { title: 'HTML 5'},
        { title: 'CSS 3'}
    ],
    'Expert': [
        { title: 'JavaScript'},
        { title: 'JQuery'},
        { title: 'JQuery UI'},
        { title: 'AJAX'},
        { title: 'DotJS'},
        { title: 'JQuery templates'},
        { title: 'JSON'},
        { title: 'Underscore'},
        { title: 'Grunt'},
        { title: 'Bower'},
        { title: 'NPM'},
        { title: 'Babel'},
        { title: 'SASS'},
        { title: 'BrowserSync'}
    ],
    'Proficient': [
        { title: 'PHP'},
        { title: 'Laravel'},
        { title: 'MySQL'},
        { title: 'Git'},
        { title: 'SmartGit'},
        { title: 'GitHub'},
        { title: 'Backbone'},
        { title: 'Webpack'},
        { title: 'Twig'},
        { title: 'Photoshop'}
    ],
    'Familiar': [
        { title: 'Node'},
        { title: 'Express js'},
        { title: 'MongoDB'},
        { title: 'Mongoose'},
        { title: 'Jade'},
        { title: 'Razor'},
        { title: 'Mercurial'}
    ]
};

var SkillView = Backbone.View.extend({
    tagName: 'a',
    className: 'works-work',
    template: hp.tmpl('tmplSkill'),
    initialize: function () {
        this.render();
        vent.on('removeSkill', this.remove, this);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    }
});


