"use strict";

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
import {hp} from './helper';


/* Observer */
(function($){
    var o = $({});
    $.subscribe = function() {
        o.bind.apply(o, arguments);
    };
    $.unsubscribe = function() {
        o.unbind.apply(o, arguments);
    };
    $.publish = function() {
        o.trigger.apply(o, arguments);
    };
})($);

//////////////////////////////////////////////////

// project kuzroman
var kr = {
    p: {
        bodyW: window.innerWidth,
        bodyH: window.innerHeight
    }
};

kr.game = {
    p: {
        letters: [],
        longGame: 1
    }
};

kr.game.init = function () {
    this.html.init();
    this.events();

    this.engravingText.init();
};

kr.game.html = {
    init: function () {
        this.startGameBtn = $('#startGameBtn');
        this.shooterMouseArea = $('#shooterMouseArea');
        this.shooterArea = $('#shooterArea');
        this.shooter = $('#shooter');
        this.scoreBord = $('#scoreBord');
    }
};

kr.game.events = function () {
    var self = this, html = this.html;

    // our objects
    var shooter, timer, resultBoard, topList, loader;

    var aim = new self.engravingText.LoaderLetters({speed:10});
    aim.addText();
    aim.showText();

    html.startGameBtn.on('click', function () {

        shooter = new self.Shooter();
        timer = new self.Timer(self.p.longGame);
        loader = new self.Loader();

        html.shooterMouseArea.show();
        html.shooterArea.show();

        if (resultBoard) {
            resultBoard.hide();
            if (topList) topList.hide();

            aim.addText();
            aim.showText();
        }

        // hide btn
        $(this).animate({bottom:50},{duration:500, queue:false}).fadeOut(500).queue(function (next) {
            html.shooter.animate({top:'85%'},200); // show shooter
            html.scoreBord.animate({top:'1%'},200); // show loader
            $(this).text('PLAY AGAIN');
            next();
        });

    });

    $.subscribe('hitTheGoal', function (event, reachedGoal) {
        loader.change();
        // if bullet is not reached goal yet
        if (!reachedGoal) {
            shooter.addScore();
        }
    });

    html.shooterMouseArea.on('mousemove', function () {
        self.Shooter.prototype.x = event.offsetX;
        shooter.move();
    });
    html.shooterMouseArea.on('click', function () {
        shooter.shot();
        if (!timer.working) timer.start();
    });

    // for test
    //$('#stopGame').on('click', function() {
    //    timer.pausePlay();
    //    $.publish('stopGame');
    //});

    $.subscribe('stopGame', function () {
        stopGame();
    });

    $.subscribe('aimsDestroyed', function () {
        stopGame();
    });
    $.subscribe('showResultTable', function (ev, score) {
        topList = new self.LeadersBoard();
        topList.get(score);
        topList.show();
    });

    function stopGame () {
        timer.pausePlay();
        shooter.setCanShoot();

        resultBoard = new self.ResultBoard();
        resultBoard.draw( {timer:timer, shooter: shooter, loader:loader} );
        // show btn
        html.startGameBtn.text('PLAY AGAIN').animate({bottom:100},{duration:500, queue:false}).fadeIn(500);
    }

    var timeOut = null;
    window.onresize = function(){
        if (timeOut != null) clearTimeout(timeOut);
        timeOut = setTimeout(function() {
            //console.log('text');
            kr.p.bodyW = window.innerWidth;
            kr.p.bodyH = window.innerHeight;
            kr.game.p.letters = aim.createAims();
        }, 500);
    };
};



kr.game.ResultBoard = function () {
    this.$el = $('#results');
    this.$timeLeft = this.$el.find('#resultsTimeLeft');
    this.$close = this.$el.find('#resultsClose');
    this.$shots = this.$el.find('#resultsShots');
    this.$accuracy = this.$el.find('#resultsAccuracy');
    this.$score = this.$el.find('#resultsScore');
    this.$destroy = this.$el.find('#resultsDestroy');
    this.$best = this.$el.find('#resultsBest');
    this.$viewLeaderboard = this.$el.find('#viewLeaderboard');
    var self = this;
    this.score = 0;

    this.$close.off();
    this.$close.on('click', function() {
        self.hide();
    });

    this.$viewLeaderboard.off();
    this.$viewLeaderboard.on('click', function () {
        self.hide();
        $.publish('showResultTable', self.score);
    });

    this.draw = function (obj) {
        var tail = (obj['timer']['limit'] <= 0) ? '' : '.' + (''+Math.random()).split('.')[1].substr(0,3)
            ,timeLimit = obj['timer']['limit']
            ,shots = obj['shooter']['shots']
            ,destroy = obj['loader']['destroyed']
            ,bulletsReachedGoal = obj['shooter']['bulletsReachedGoal']
            ,accuracy = obj['shooter'].getAccuracy()
            ;
        this.score = Math.floor( (bulletsReachedGoal / shots) * accuracy * (timeLimit + 1) * destroy );

        //console.log(bulletsReachedGoal, shots, accuracy, timeLimit);
        this.$timeLeft.text( timeLimit + tail + 's');
        this.$shots.text( shots );
        this.$destroy.text( destroy );
        this.$accuracy.text( accuracy + '%' );
        this.$score.text( this.score + ' points' );

        var bestScore = this.getBestScore(this.score);

        this.$best.text( bestScore['bestScore'] );
        if (bestScore['record']) this.$best.addClass('record');
        else this.$best.removeClass('record');

        this.show();
    };


    this.getBestScore = function (newScore) {
        var bestScore = window.localStorage.getItem('bestScore'),
            record = false
            ;
        if (!bestScore || bestScore < newScore) {
            bestScore = newScore;
            window.localStorage.setItem('bestScore', bestScore);
            record = true;
        }
        //console.log({bestScore:bestScore, record:record});
        return {bestScore:bestScore, record:record};
    };

    var w = kr.p.bodyW;
    this.show = function (time) {
        this.$el.show().animate({left:w/2 - 232}, time||300);
    };
    this.hide = function (time) {
        this.$el.show().animate({left:-500}, time||300);
    }
};


kr.game.LeadersBoard = function () {
    this.$el = $('#leaders');
    this.$close = this.$el.find('#resultsClose');
    this.$topLeaders = this.$el.find('#topLeaders');
    this.resultName = '#resultName';
    this.resultNameInput = '#resultNameInput';
    this.saveScore = '#saveScore';
    var self = this;
    this.score = 0;

    this.$close.on('click', function() {
        self.hide();
    });

    this.$el.off();
    this.$el.on('click', this.saveScore, function() {
        var name = $(self.resultNameInput).val()
            ,newScoreObj = {name:name, score: self.score}
            ;

        if (!name || name.length < 3) return;
        self.set(newScoreObj);
    });

    this.get = function (score) {
        this.score = score;
        $.post('/bestScore/get', function (bestScores) {
            console.log('get bestScores', bestScores);
            self.draw(bestScores)
        }, 'json');
    };

    this.set = function (newScoreObj) {
        $.post('/bestScore/set', newScoreObj, function (data) {
            console.log('set ',data);

            $(self.resultName).html(data['name']);
            $(self.saveScore).remove();

        }, 'json');
    };


    this.draw = function (bestScores) {
        //console.log(bestScores);

        // ������ ����� ����� � ������ �������� ��������
        var place = Infinity, inTop = false, len = bestScores.length;
        for (var i = 0; i < len; i++) {
            place = i;
            if (bestScores[i]['score'] < this.score) {
                // ���� � �������� 8�� ����� �������� � ������
                if (i < 8) {
                    inTop = true;
                    bestScores.splice(i,0, {score:this.score});
                    bestScores.pop();
                }
                break;
            }
        }

        bestScores.splice(8); // ��������� 8 �����

        var list = doT.template(document.getElementById('topListTmpl').text);
        this.$topLeaders.html( list({array:bestScores}) );

        if (!inTop) {
            var lastScore = doT.template(document.getElementById('yourScore').text);
            this.$topLeaders.append( lastScore({score:this.score, place:place+1}) );
        }
    };

    var w = kr.p.bodyW;
    this.show = function (time) {
        this.$el.show().animate({left:w/2 - 232}, time||300);
    };
    this.hide = function (time) {
        this.$el.show().animate({left:w}, time||300);
    }
};


kr.game.Timer = function (limit) {
    this.$el = $('#timer');
    this.working = false; // ������������ ��� ������
    this.limit = limit || 30; // ������������ ��� ������

    var self = this;
    var pause = false;

    self.$el.text(this.limit);

    this.pausePlay = function () {
        pause = !pause;
    };

    this.start = function () {
        this.working = true;
        var idInt = setInterval(function () {
            if (pause) return;
            self.$el.text(--self.limit);
            if (self.limit <= 0) {
                clearInterval(idInt);
                $.publish('stopGame');
            }
        }, 1000)
    }
};


kr.game.Shooter = function () {
    //var el = document.getElementById('shooter');
    var $el = $('#shooter');
    var polygon = kr.game.html.shooterArea;
    this.shots = 0;
    this.bulletsReachedGoal = 0;
    var canShoot = true;

    this.move = function () {
        $el.css('left',this.x);
    };

    this.shot = function () {
        if (!canShoot) return;
        this.shots++;
        var x = parseInt( $el.css('left') ) + 20 ,
            y = parseInt( $el.css('top') )
            ,bullet = new kr.game.Bullet(x,y)
            ;
        polygon.append(bullet.$el);
        bullet.move();
    };

    this.setCanShoot = function () {
        canShoot = false;
    };

    this.addScore = function () {
        this.bulletsReachedGoal++;
    };
    this.getAccuracy = function () {
        return Math.floor(this.bulletsReachedGoal / this.shots * 100)
    }
};
kr.game.Shooter.prototype.x = 0;


kr.game.Bullet = function (x,y) {
    this.x = x;
    this.y = y;
    this.$el = $('<div>', {'class':'bullet'}).css({left:x, top:y});
    var reachedGoal = false;

    this.move = function () {
        var self = this
        // static param, if we resize window it will not work
            ,bX1 = self.x  // b = bullet
            ,bX2 = bX1 + this.$el.width()
            ,aims = kr.game.p.letters
            ;
        //console.log(self.y, bX1, bX2);
        var idInt = setInterval(function () {
            self.y -= 1; // if we set value more, bulletY newer cross elementY
            self.$el.css({top: self.y });

            // change array elements
            for (var i = 0, len = aims.length; i < len; i++) {
                if (aims[i]['killed']) continue;
                // they on the one axis y
                if (self.y == aims[i]['y2']) {
                    if ( (bX1 <= aims[i]['x1'] && aims[i]['x1'] <= bX2) || // bullet at left
                        (bX1 <= aims[i]['x2'] && aims[i]['x2'] <= bX2 ) ) { // bullet at right
                        // they on the one axis x - Goal!
                        aims[i]['killed'] = true;
                        aims[i]['el'].css({'opacity':0});
                        $.publish('hitTheGoal', reachedGoal);
                        reachedGoal = true;
                    }
                }
            }

            // stop, remove el
            if (self.y <= -20) {
                self.$el.remove();
                clearInterval(idInt);
            }
        }, 0);
    }
};



kr.game.Loader = function () {
    this.$el = $('#loaderSlip');
    var percent = 0
        ,width = this.$el.width()
        ,left = 0
        ,len = kr.game.p.letters.length
        ;
    this.destroyed = 1;

    this.$el.css({left:left});

    this.change = function () {
        percent = this.destroyed++ / (len / 100);
        left = (width / 100) * percent;
        //console.log(goals, len, percent, width, left);
        this.$el.css({left: -left });

        if (percent == 100) {
            $.publish('aimsDestroyed');
        }
    };
};


/////////////////////////////////////////////////////////

kr.game.engravingText = {};

kr.game.engravingText.p = { // params
    bits: [],
    bitsStatus: 'start', // start, act, stop
    bitsSpeed: 15
};
kr.game.engravingText.p.canvas = document.getElementById('canvasLoader');
kr.game.engravingText.p.ctx = kr.game.engravingText.p.canvas.getContext("2d");


kr.game.engravingText.init = function () {
    this.events();

    this.p.canvas.width = kr.p.bodyW;
    this.p.canvas.height = kr.p.bodyH;
};

kr.game.engravingText.events = function () {
    $.subscribe('letterShowed', (ev, positions) => {
        this.addBits(positions);
        if (kr.game.engravingText.p.bitsStatus != 'act') {
            //console.log('act');
            kr.game.engravingText.p.bitsStatus = 'act';
            this.animationBits();
        }
    });
};

kr.game.engravingText.LoaderLetters = class {
    constructor(obj) {
        this.speed = obj.speed || 10;
        this.x = 0;
        this.y = 0;

        this.typingCenter = $('#typingCenter');
        this.box = this.typingCenter.find('div');

        let text = `Hello, my name is Roman Kuznetsov.
                    |I am a web Front-End Engineer and UX enthusiast.
                    |Check out my latest web components and brackets.io extensions at my lab page .
                    |Feel free to take a look at my most recent projects on my work page.
                    |Also you can stop and say hello at kuzroman@list.ru`;
        this.description = $.trim( text.replace(/\s{2,}/g,'') );
        //this.description = $.trim( $('#represent').text().replace(/\s{2,}/g,'') );
    }

    addText() {
        kr.game.engravingText.p.bitsStatus = 'start';
        let el, len = this.description.length;
        this.box.html('');
        for (let i = 0; i < len; i++) {
            if (this.description[i] == '|') el = $('<br>');
            else el = $('<i>').text(this.description[i]);
            this.box.append(el);
            if (len - 1 <= i) {
                kr.game.p.letters = this.createAims();
            }
        }
    }

    showText() {
        let i = 0, isInt
            , letters = kr.game.p.letters
            , len = letters.length
            ;

        isInt = setInterval(() => {
            // draw letters
            if (i <= len - 1) {
                letters[i]['el'].css({opacity: 1});
                this.x = letters[i].x1;
                this.y = letters[i].y2;

                $.publish('letterShowed', {x: this.x, y: this.y});
            }

            if (kr.game.engravingText.p.bitsStatus == 'stop') clearInterval(isInt);

            i++;
        }, this.speed);
    }

    createAims() {
        let objList = [];
        this.typingCenter.find('i').each(function (n) {
            let s = $(this); // s = symbol

            objList[n] = {
                el: s,
                killed: false,
                x1: ~~s.offset().left,
                x2: ~~( s.offset().left + s.width() ),
                y1: ~~s.offset().top,
                y2: ~~( s.offset().top + s.height() )
            };
        });
        return objList;
    }
};

/////////////////////////////////////////////////////////////

kr.game.engravingText.addBits = function (positions) {
    for (let i = 0, bit; i < 3; i++) {
        bit = new this.Bit(positions.x, positions.y);
        this.p.bits.push(bit);
    }
};
kr.game.engravingText.animationBits = function () {
    var engravingText = kr.game.engravingText;
    var isInt = setInterval(() => {
        engravingText.clearCanvas();
        engravingText.updateBit();
        if (engravingText.p.bitsStatus == 'stop') clearInterval(isInt);
    }, this.p.bitsSpeed)
};


kr.game.engravingText.Bit = class {
    constructor(currentX, currentY) {
        this.x = currentX || 0;
        this.y = currentY || 0;
        this.g = -Math.round(Math.random() * 50) / 10; // gravity
    }

    draw() {
        let p = kr.game.engravingText.p;
        p.ctx.fillStyle = '#fff';
        let size = Math.random() * 3 + 1;
        p.ctx.fillRect(this.x, this.y, size, size);
    }
};

kr.game.engravingText.clearCanvas = function () {
    this.p.ctx.fillStyle = "#2f2f2f";
    this.p.ctx.fillRect(0, 0, kr.p.bodyW, kr.p.bodyH);
};

kr.game.engravingText.updateBit = function () {
    let bits = this.p.bits;

    for (let j = 0, b; j < bits.length; j++) {
        b = bits[j];
        b.y -= b.g;
        b.g -= 0.1;

        if (kr.p.bodyH < b.y) bits.splice(j, 1);
        b.draw();
    }

    //console.log('bits', bits.length);
    if (!bits.length) {
        this.p.bitsStatus = 'stop';
    }
};

$(function () {
    kr.game.init();
});