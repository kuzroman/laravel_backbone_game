import {hp, vent, params} from '../../helper';
import {dataWorks} from './work';
import {BackPageV} from '../backPage';

export var DescPageV = Backbone.View.extend({
    className: 'page desc',
    initialize: function (options) {
        options = _.extend({pageV: this}, options);
        new DescV(options);
        new BackPageV(options);

        this.render();

        vent.on('removePage', this.remove, this);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    remove: function () {
        vent.off();

        $('body').addClass('rotate');
        this.$el.addClass('rotate');
        setTimeout(()=> {
            Backbone.View.prototype.remove.call(this);
            vent.trigger('removeDesc');
        }, params.speedChangePage);
    }
});

var DescV = Backbone.View.extend({
    className: 'content',
    template: hp.tmpl('tmplDesc'),
    initialize: function (options) {
        this.pageV = options.pageV;
        this.pageName = options.pageName;


        this.render();

        vent.on('removeDesc', this.remove, this);
    },
    render: function () {
        var data = _.find(dataWorks, (model) => {
            return model['href'] == this.pageName;
        });
        var content = this.$el.html(this.template(data));
        this.pageV.$el.append(content);
    }
});
