var Main = {
    initGame: function () {
        $('button').on('click', function () {
            $(this).fadeOut(function () {
                $('.game .wrap').fadeIn();
                Game.init();
            });
        });
    },

    init: function () {
        Main.initGame();
    }
};

$(document).on('ready', function () { Main.init(); });