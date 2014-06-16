var Game = Game || {};

Game = {
    rander: Snap('#area'),

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

    moveSnake: function (dir) {
        var matrix = new Snap.Matrix(),
            cpt = 1;

        switch(dir) {
            case 'left':
                moveLeft();
                break;
            case 'right':
                moveRight();
                break;
            case 'down':
                moveDown();
                break;
            case 'up':
                moveUp();
                break;
        }

        function moveRight () {
            matrix.translate(cpt, 0);
            Game.rander.select('#snake').animate({transform:matrix}, 500, mina.elastic, function () {
                cpt++;
                moveRight();
            });
        }
    },

    bindKeys: function () {
        // 50 => 2 (down) / 52 => 4 (left) / 54 => 6 (right) / 56 => 8 (up)
        $('body').on('keypress', function (e) {

        });
    },

    init: function () {
        Game.placeFood();
        Game.bindKeys();
        Game.moveSnake('right');
    }
};