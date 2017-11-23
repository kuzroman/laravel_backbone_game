import {hp, vent, params} from '../../helper';
import {dataWorks} from './work';
import {BackPageV} from '../backPage';

export let DescPageV = Backbone.View.extend({
    className: 'page desc',
    initialize: function (options) {
        options = _.extend({pageV: this}, options);
        new DescV(options);
        new BackPageV(options);

        this.render();
        this.listenTo(vent, 'pageLoaded', this.scrollUp);
        this.listenTo(vent, 'removePage', this.remove);
    },
    render: function () {
        $('body').append(this.el);
        this.show();
    },
    remove: function () {
        vent.off('removePage');
        this.$el.addClass('rotate');
        setTimeout(()=> {
            Backbone.View.prototype.remove.call(this);
            vent.trigger('removeDesc');
        }, params.speedChangePage);
    },
    scrollUp: function () {
        $('body,html').animate({scrollTop: 0}, 300);
    }
});

let DescV = Backbone.View.extend({
    className: 'content',
    template: hp.tmpl('tmplDesc'),
    initialize: function (options) {
        this.pageV = options.pageV;
        this.pageName = options.pageName;

        this.render();
        //vent.on('removeDesc', this.remove, this);
        this.listenTo(vent, 'removeDesc', this.remove);
    },
    render: function () {
        let data = _.find(dataWorks, (model) => {
            return model['href'] == this.pageName;
        });
        let content = this.$el.html(this.template(data));
        this.pageV.$el.append(content);
    }
});
