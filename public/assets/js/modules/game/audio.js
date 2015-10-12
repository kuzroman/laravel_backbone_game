var $ = require("jquery");
var _ = require("underscore");
//var Backbone = require("backbone");
import {vent} from '../../helper';
import {letters} from './typing.js';

export var Audio = Backbone.View.extend({
    initialize: function (options) {
        this.parentV = options.pageV;
        this.parentM = options.model;
        this.render();
        vent.on('game:audio:shoot', this.shoot, this);
        vent.on('removePage', this.remove, this);
    },
    render: function () {
        this.parentV.$el.append(this.$el);
        //this.cleanAttr();
    },
    shoot: function () {
        //this.model.clear().set(this.model.defaults);
    }
});