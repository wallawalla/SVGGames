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
        Game.food = Game.rander.rect(Game.posFood.x, Game.posFood.y, 5, 5);
        Game.food.attr({
            fill:'#FFF',
            stroke:'none'
        });
    },

    bindKeys: function () {
        $('body').on('keypress', function () {

        });
    },

    init: function () {
        Game.placeFood();
        Game.bindKeys();
    }
};