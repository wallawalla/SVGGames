var Game = Game || {};

Game = {
    rander : Snap('#rand'),
    buttons : [114, 108],
    buttonToHit : 114,
    refreshRander : null,
    priceOne : 2010,
    priceTwo : 4010,
    endLine : 6000,
    timeoutHandler : null,

    initCycle: function () {
        Main.cycleRander = Snap('#cycle');
        var tyreOne = 15,
            tyreTwo = 45,
            cpt = 1,
            cpt2 = 1,
            cpt3 = 100,
            cpt4 = 1;

        function moveBikeForward () {
            var myMatrix = new Snap.Matrix(),
                myMatrix2 = new Snap.Matrix(),
                myMatrix3 = new Snap.Matrix();

            myMatrix.translate((cpt2 * 10), 0, tyreOne, 200).rotate((cpt * 45), tyreOne, 200);
            myMatrix2.translate((cpt2 * 10), 0, tyreTwo, 200).rotate((cpt * 45), tyreTwo, 200);

            Main.cycleRander.select('#frontTyre').animate({transform:myMatrix2}, 100, mina.elastic);
            Main.cycleRander.select('#backTyre').animate({transform:myMatrix}, 100, mina.elastic);
            cpt++;
            cpt2++;

            if(cpt2 === (cpt3 * cpt4)) {
                // $(window).scrollLeft((600 * cpt4));
                myMatrix3.translate(-(700 * cpt4), 0, 3000, 212);
                Main.cycleRander.select("#group").animate({transform:myMatrix3}, 200, mina.easeinout);
                cpt4 = cpt4 + 0.5;
            }
            console.log(cpt2, cpt3, cpt4);
            if(cpt % 9 == 0) { cpt = 1; }
        }

        function moveBikeBackward () {
            var myMatrix = new Snap.Matrix(),
                myMatrix2 = new Snap.Matrix(),
                myMatrix3 = new Snap.Matrix();

            myMatrix.translate(-(cpt2 * 10), 0, tyreOne, 200).rotate(-(cpt * 45), tyreOne, 200);
            myMatrix2.translate(-(cpt2 * 10), 0, tyreTwo, 200).rotate(-(cpt * 45), tyreTwo, 200);

            Main.cycleRander.select('#frontTyre').animate({transform:myMatrix2}, 100, mina.elastic);
            Main.cycleRander.select('#backTyre').animate({transform:myMatrix}, 100, mina.elastic);
            cpt--;
            cpt2--;

            if(cpt2 === (cpt3 * cpt4)) {
                myMatrix3.translate((700 * cpt4), 0, 3000, 212);
                Main.cycleRander.select("#group").animate({transform:myMatrix3}, 200, mina.easeinout);
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
                moveBikeForward();
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