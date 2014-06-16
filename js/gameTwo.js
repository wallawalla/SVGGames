var Game = Game || {};

Game = {
    rander : Snap('#cycle'),
    endLine : 6000,
    backTyre: 15,
    frontTyre: 45,
    bikeFactor: 1,
    timeoutHandler : null,

    initCycle: function () {
        Game.rander = Snap('#cycle');
        var bike = 30,
            cpt = 1,
            cpt3 = 100,
            cpt4 = 1;

        function moveBikeForward () {
            var matrixTyreFront = new Snap.Matrix(),
                matrixTyreBack = new Snap.Matrix(),
                matrixBike = new Snap.Matrix(),
                myMatrix3 = new Snap.Matrix();

            matrixTyreFront.rotate((cpt * 45), Game.backTyre, 200);
            matrixTyreBack.rotate((cpt * 45), Game.frontTyre, 200);
            matrixBike.translate((Game.bikeFactor * 10), 0, bike, 200);

            Game.rander.select('#frontTyre').animate({transform:matrixTyreBack}, 100, mina.elastic);
            Game.rander.select('#backTyre').animate({transform:matrixTyreFront}, 100, mina.elastic);
            Game.rander.select('#bike').animate({transform:matrixBike}, 100, mina.elastic);
            cpt++;
            Game.bikeFactor++;

            if(Game.bikeFactor === (cpt3 * cpt4)) {
                // $(window).scrollLeft((600 * cpt4));
                myMatrix3.translate(-(700 * cpt4), 0, 3000, 212);
                Game.rander.select("#group").animate({transform:myMatrix3}, 200, mina.easeinout);
                cpt4 = cpt4 + 1;
            }
            if(cpt % 9 == 0) { cpt = 1; }
        }

        function moveBikeBackward () {
            var myMatrix = new Snap.Matrix(),
                myMatrix2 = new Snap.Matrix(),
                myMatrix3 = new Snap.Matrix();

            myMatrix.translate(-(Game.bikeFactor * 10), 0, Game.backTyre, 200).rotate(-(cpt * 45), Game.backTyre, 200);
            myMatrix2.translate(-(Game.bikeFactor * 10), 0, Game.frontTyre, 200).rotate(-(cpt * 45), Game.frontTyre, 200);

            Game.rander.select('#frontTyre').animate({transform:myMatrix2}, 100, mina.elastic);
            Game.rander.select('#backTyre').animate({transform:myMatrix}, 100, mina.elastic);
            cpt--;
            Game.bikeFactor--;

            if(Game.bikeFactor === (cpt3 * cpt4)) {
                myMatrix3.translate((700 * cpt4), 0, 3000, 212);
                Game.rander.select("#group").animate({transform:myMatrix3}, 200, mina.easeinout);
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
                    Game.endGame();
                } else {
                    moveBikeForward();
                }
            } else if(e.keyCode == 52) {
                moveBikeBackward();
            }
        });
    },

    endGame: function (won) {
        clearInterval(Game.refreshRander);
        clearTimeout(Game.timeoutHandler);

        $('.game').fadeOut(function () {
            $('.finish').fadeIn();
            if($('#priceOne').attr('class') == 'bgCircle on') {
                $('.wonGame').fadeIn();
            }
        });
        if(won) {
        } else {
            $('.game').fadeOut(function () {
                $('.finish').fadeIn();
                $('.lostGame').fadeIn();
            });
        }
    },

    init: function () {
        Game.initCycle();
    }
};