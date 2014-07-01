var Game = Game || {};

Game = {
    rander: Snap('#area'),
    cpt: 5,
    direction: 'right',
    velocity: 200,
    length: 3,
    xpos: [25,36],
    ypos: [25,36],
    step: 5,

    randPosition: function () {
        // x between 6 & 1199 / y between 6 & 589
        var x = Math.round((Math.random() * 1194) + 6),
            y = Math.round((Math.random() * 584) + 6);
        return {'x':x,'y':y};
    },

    placeFood: function () {
        Game.posFood = Game.randPosition(),
        Game.food = Game.rander.rect(Game.posFood.x, Game.posFood.y, 10, 10);
        Game.food.attr({
            fill:'#FFF',
            stroke:'none'
        });
    },

    endGame: function () {
        $('.game').fadeOut(function () {
            $('.finish').fadeIn();
            $('.lostGame').fadeIn();
            // $('.wonGame').fadeIn();
        });
    },

    moveSnake: function (dir) {

    },

    bindKeys: function () {
        // 50 => 2 (down) / 52 => 4 (left) / 54 => 6 (right) / 56 => 8 (up)
        $('body').on('keypress', function (e) {
            switch(e.keyCode) {
                case 50:
                    Game.moveSnake('down');
                    break;
                case 52:
                    Game.moveSnake('left');
                    break;
                case 54:
                    Game.moveSnake('right');
                    break;
                case 56:
                    Game.moveSnake('up');
                    break;
                default:break;
            }
        });
    },

    init: function () {
        Game.placeFood();
        Game.bindKeys();
        // Game.moveSnake('right');
    }
};