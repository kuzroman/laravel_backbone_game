import {hp, vent} from '../helper';

export var ContactPageView = Backbone.View.extend({
    className: 'page contact',
    initialize: function () {
        this.render();
        new ContactDescView({pageV:this});
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    }
});

var ContactDescView = Backbone.View.extend({
    template: hp.tmpl('tmplContact'),
    initialize: function (options) {
        this.parentV = options.pageV;
        this.render();
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.el);
        //console.log( this.template() );
        this.$el.append(this.template());
    }
});

