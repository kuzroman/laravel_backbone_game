var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

import {hp, vent} from '../helper';


///////////////////////////////////////////////////////////////////////

export var WorksPageView = Backbone.View.extend({
    initialize: function () {
        new WorksView();
        vent.on('removePage', this.remove, this);
    },
    remove: function () {
        vent.off();
        Backbone.View.prototype.remove.call(this);
    }
});

var WorksView = Backbone.View.extend({
    tagName: "div",
    id: "works-view",
    className: 'works',

    initialize: function () {
        //console.log(this);
        $("body").append(this.el);
        //$(window).on("resize", $.proxy(this.resize, this) );

        this.worksV = _.map(dataWorks, function (work) {
            return new WorkView({model: new Backbone.Model({nameTitle: work.nameTitle, nameImg: work.nameImg, skills: work.skills})});
        });

        this.resize();
        this.cubsInLine();
        this.render();

        vent.on('removePage', this.remove, this);
    },
    render: function () {
        _.each(this.worksV, function (view) { this.$el.append(view.el); }, this);
    },
    cubsInLine: function (isAnimation) {
        //console.log('cubsInLine');
        var countEl = this.worksV.length
            ,elSize = 325 // 25 it's offset
            ,fieldW = this.$el.width()
            ,countInColumn = Math.floor( fieldW / elSize )
            ,countInRow = Math.ceil( countEl / countInColumn )
            ,fieldH = countInRow * elSize
            ,centerX = ( fieldW - (countInColumn * elSize) ) / 2
            ,centerY = ( fieldH - (countInRow * elSize) ) / 2
            ,x = centerX, y = centerY
            ;

        if (fieldW < 650) return; // we will work only with css!
        //console.log(countInColumn, countInRow, elSize);

        for (var i = 0; i < countEl; i++) {
            //coordinateList[i] = {x:x, y:y};
            if (!i) {
                if (y < 0) y = 0;
            } // don't change x,y
            else if (i && (i % (countInColumn) == 0) ) {
                y = y + elSize;
                x = centerX;
            }
            else x = x + elSize;
            //console.log(x,y);

            if (isAnimation) this.worksV[i].$el.animate({left:x, top:y}, 1000); //.css('transform','rotate(0)');
            else this.worksV[i].$el.css({left:x, top:y});
        }
        this.$el.css('height', fieldH );
    },
    resize: function () {
        var self = this, resizeTimeoutId;
        //console.log(this);
        $(window).on('resize', function() {
            clearTimeout(resizeTimeoutId);
            resizeTimeoutId = setTimeout(function () {
                self.cubsInLine(true);
            }, 200);
        });
    },
    remove:function () {
        $(window).off("resize",this.resize);
        Backbone.View.prototype.remove.call(this);
    }
});

var dataWorks = [
    { nameTitle: 'test 1' , nameImg: '1' , skills: ['vanilla js', 'html5', 'css3'] }
    ,{ nameTitle: 'заголовок 2', nameImg: '2', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'загол овок 3', nameImg: '3', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'заг оло вок 4', nameImg: '4', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'заг оло вок 5', nameImg: '5', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'заг оло вок 6', nameImg: '6', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'заг оло вок 7', nameImg: '7', skills: ['custom elements', 'ui/ux animations', 'game design'] }
    ,{ nameTitle: 'заг оло вок 8', nameImg: '8', skills: ['custom elements', 'ui/ux animations', 'game design'] }
];

var WorkView = Backbone.View.extend({
    tagName: 'a',
    className: 'works-work',
    template: hp.tmpl('tmplWork'),
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
