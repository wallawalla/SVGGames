var Game = Game || {};

Game = {
    rander : Snap('#cycle'),
    endLine : 6000,
    backTyre: 15,
    frontTyre: 45,
    bikeFactor: 1,
    timeoutHandler : null,
    direction:'forward',

    initCycle: function () {
        Game.rander = Snap('#cycle');
        var bike = 30,
            cpt = 1,
            cpt3 = 100,
            cpt4 = 1;

        function moveBikeForward () {
            if(Game.direction != 'forward') { cpt = 0; }
            Game.rander.select('#frontTyre').animate({transform:'r'+(cpt*45)+','+Game.frontTyre+',200'}, 100, mina.elastic);
            Game.rander.select('#backTyre').animate({transform:'r'+(cpt*45)+','+Game.backTyre+',200'}, 100, mina.elastic);
            Game.rander.select('#bike').animate({transform:'t'+(Game.bikeFactor*10)+',0,'+bike+',200'}, 100, mina.elastic);
            cpt++;
            Game.bikeFactor++;

            if(Game.bikeFactor === (cpt3 * cpt4)) {
                // $(window).scrollLeft(800 * cpt4);
                Game.rander.select("#group").animate({transform:'t'+(-900*cpt4)+',0,3000,212'}, 200, mina.easeinout);
                cpt4 = cpt4 + 1;
            }
            if(cpt % 9 == 0) { cpt = 1; }
        }

        function moveBikeBackward () {
            if(Game.direction != 'backward') { cpt = 0; }
            Game.rander.select('#frontTyre').animate({transform:'r'+(-cpt*45)+','+Game.backTyre+',200'}, 100, mina.elastic);
            Game.rander.select('#backTyre').animate({transform:'r'+(cpt*45)+','+Game.frontTyre+',200'}, 100, mina.elastic);
            // Game.rander.select('#bike').animate({transform:'t'+(-Game.bikeFactor*10)+',0,'+bike+',200'}, 100, mina.elastic);
            cpt--;
            Game.bikeFactor--;

            if(Game.bikeFactor === (cpt3 * cpt4)) {
                Game.rander.select("#group").animate({transform:'t'+(700*cpt4)+',0,3000,212'}, 200, mina.easeinout);
                cpt4 = cpt4 + 0.5;
            }
            if(cpt % 9 == 0) { cpt = 1; }
        }

        /*setInterval(function () {
            moveBikeForward();
        }, 100);*/
        $('body').on('keypress', function (e) {
            // right:54 (6) / left:52 (4)
            // console.log(e.keyCode);
            if(e.keyCode == 54) {
                if(Game.bikeFactor > 395) {
                    Game.endGame(1);
                } else {
                    Game.direction = 'forward';
                    moveBikeForward();
                }
            } else if(e.keyCode == 52) {
                Game.direction = 'backward';
                moveBikeBackward();
            }
        });
    },

    endGame: function (won) {
        clearInterval(Game.refreshRander);
        clearTimeout(Game.timeoutHandler);

        $('.game').fadeOut(function () {
            $('.finish').fadeIn();

            if(won) {
                $('.wonGame').fadeIn();
            } else {
                $('.lostGame').fadeIn();
            }
        });
    },

    init: function () {
        Game.initCycle();
    }
};