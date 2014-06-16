var Game = Game || {};

Game = {
    rander : Snap('#rand'),
    buttons : [114, 108],
    buttonToHit : 114,
    refreshRander : null,
    breakpoints: [2010, 4010],
    prize:0,
    endLine : 6000,
    timeoutHandler : null,

    initRand: function () {
        var cpt = 0,
            cpt2 = -100,
            move = false,
            fault = 0;

        function addRect () {
            var height = Math.floor((Math.random() * 121) + 80),
                rect = Game.rander.select("g").rect(cpt, 100 - (height/2), 10, height),
                temp = cpt + 5,
                myMatrix = new Snap.Matrix(),
                myMatrix2 = new Snap.Matrix(),
                myMatrix3 = new Snap.Matrix();

            myMatrix.scale(0,0, temp, 100);
            myMatrix2.scale(1,1, temp, 100);
            myMatrix3.translate(cpt2, 0);

            rect.attr({
                'fill':Game.randColor(),
                'stroke': 'none'
            });

            rect.animate({transform:myMatrix}, 0, mina.easeinout, function () {
                rect.animate({transform:myMatrix2}, 300, mina.easeinout, function () {
                    if(cpt >= 1000) {
                        Game.rander.select("g").animate({transform:myMatrix3}, 200, mina.easeinout);
                        cpt2 = cpt2 - 10;
                    }
                });
            });
            cpt = cpt + 10;
        }

        $('body').on('keypress', function (e) {
            if(e.keyCode == Game.buttonToHit && cpt < Game.endLine) {
                fault = 0;
                Game.resetTimeout();
                addRect();
                if(cpt == Game.breakpoints[0]) {
                    $('#priceOne').attr('class', 'bgCircle on');
                    Game.prize++;
                } else if (cpt == Game.breakpoints[1]) {
                    $('#priceTwo').attr('class', 'bgCircle on');
                    Game.prize++;
                }
            } else if(cpt >= Game.endLine) {
                fault = 0;
                Game.prize++;
                Game.endGame();
            } else if(e.keyCode != Game.buttonToHit) {
                fault++;
                if(fault == 100) {
                    fault = 0;
                    Game.endGame();
                } else {
                    addRect();
                }
            }
        });
    },

    resetTimeout: function () {
        if(Game.timeoutHandler != null) {
            clearTimeout(Game.timeoutHandler);
        }
        Game.timeoutHandler = setTimeout(function () { Game.endGame(0); }, 1000);
    },

    switchHit: function () {
        var index = Math.round(Math.random());
        Game.buttonToHit = Game.buttons[index];
        $('#button' + Game.buttonToHit).attr('class', 'bgCircle on');
        $('#button' + ( (index == 0) ? Game.buttons[1] : Game.buttons[0] )).attr('class', 'bgCircle');
    },

    randColor: function () {
        var characters = "01234567ABCDEF", res = '';
        for(var i=0; i<6; i++) {
            res += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return "#" + res;
    },

    endGame: function () {
        clearInterval(Game.refreshRander);
        clearTimeout(Game.timeoutHandler);

        $('.game').fadeOut(function () {
            $('.finish').fadeIn();
            switch(Game.prize) {
                case 0:
                    $('.lostGame').fadeIn();
                    break;
                case 1:
                    $('.wonGame').fadeIn();
                    $('.price').text('Third Place Prize');
                    break;
                case 2:
                    $('.wonGame').fadeIn();
                    $('.price').text('Second Place Prize');
                    break;
                case 3:
                    $('.wonGame').fadeIn();
                    break;
                default:break;
            }
        });
    },

    init: function () {
        Game.initRand();
        Game.refreshRander = setInterval(Game.switchHit, 1000);
        Game.resetTimeout();
    }
};