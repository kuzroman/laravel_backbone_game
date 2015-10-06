var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {hp, vent, params} from '../../helper';

export var BoardLeaderV = Backbone.View.extend({
    id: 'leaders',
    className: 'results',
    template: hp.tmpl('tmplBoardLeader'),
    events: {
        'click .resultsClose': 'close'
    },
    initialize: function (options) {
        this.parentV = options.pageV;
        this.gameModel = options.model;
        this.render();
        vent.on('openBoardLeader', this.show, this);
        vent.on('hadGotScores', this.hadGotScores, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el.append(this.template));
    },
    close: function () {
        this.hide();
        vent.trigger('game:showBtn');
    },
    show: function () {
        this.getScore();
        this.$el.animate({left: params.bodyW / 2 - 232, opacity: 1}, 300);
    },
    hide: function () {
        this.$el.animate({left: params.bodyW, opacity: 0}, 300);
    },
    getScore: function () {
        let scores = new Users();
        scores.fetch({
            success: function () {
                //console.log( scores.toJSON() );
                vent.trigger('hadGotScores', scores);
            },
            error: function () {
                console.log('error');
            }
        });
    },
    hadGotScores: function (collect) {
        // add current model in collection
        var model = {score: 550};
        collect.add(new User(model));
        //collect.add(new User({score: this.gameModel.get('score')}));

        //console.log(collect);
        new LeadersV({collection: collect}).render();
    }
});

var LeadersV = Backbone.View.extend({
    initialize: function (options) {
        this.setElement('#topLeaders');
        this.$el.empty();
    },
    render: function () {
        this.collection.each((model, index) => {
            model.set('i', index + 1);

            if (index < 8) {
                this.$el.append(new LeaderV({model: model}).render().$el);
            }

            else if (!model.get('name')) {
                var preModel = this.collection.find(function (mod) {
                    return mod.get('i') == model.get('i') - 1;
                });
                this.$el.append(new LeaderV({line:true}).render().$el); // line
                if (model.get('i') != 9) this.$el.append(new LeaderV({model: preModel}).render().$el); // preModel
                this.$el.append(new LeaderV({model: model}).render().$el); // current model
            }

        });

        return this;
    }
});

var LeaderV = Backbone.View.extend({
    tagName: 'li',
    template: hp.tmpl('tmplLeader'),
    templateCurrentScore: hp.tmpl('tmplYourScore'),
    events: {
        'click #saveScore': 'save'
    },
    initialize: function (options) {
        this.line = options.line || false;
    },
    render: function () {

        if (this.line) {
            this.$el.html('.');  return this;
        }

        if (this.model.get('name') == 'looser') return;

        if (this.model.get('name'))
            this.$el.html(this.template(this.model.toJSON()));
        else
            this.$el.html(this.templateCurrentScore(this.model.toJSON()));

        return this;
    },
    save: function () {
        var name = this.$el.find('#resultNameInput').val();
        this.model.set('name', name);
        this.model.save();
        this.render();
    }
});

var User = Backbone.Model.extend({
    defaults: {
        name: '',
        score: 0,
        '_token': $('#token').attr('content')
    },
    initialize: function () {
        this.on("invalid", function (model, error) {
            console.log(error);
        });
    },
    validate: function (attrs, options) {
        if (attrs.name.length < 3) {
            return 'Your name too short!';
        }
        else if (!attrs.score) {
            return 'Your score too small!';
        }
    }
});

var Users = Backbone.Collection.extend({
    model: User,
    url: '/bestScore',
    comparator: function (model) {
        return -model.get('score'); // - for reverse
    }
});
