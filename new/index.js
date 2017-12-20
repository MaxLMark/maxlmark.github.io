var gameModule = (function ($) {

    // knappar
    var $choiceButtons = $('.js-actions button');
    var $shootButton = $('.js-actions .js-shoot');

    // text för ammo
    var $playerBullets = $('.js-playerBullets');
    var $computerBullets = $('.js-computerBullets');

    // resultat text
    var $resultText = $('.js-resultText');

    //bilder
    var $playerImage = $('.js-playerImage');
    var $computerImage = $('.js-computerImage');

    // spelare-objekten
    var player = new Player();
    var computer = new Computer();

    var playerActions = {
        images: {
            0: './images/userStill.jpg',
            1: './images/userShoot.jpg',
            2: './images/userBlock.jpg',
            3: './images/userReload.jpg',
            4: './images/userShotgun.jpg'
        },
        actions: {
            1: player.shoot,
            2: player.block,
            3: player.reload,
            4: player.shoot
        }
    };

    var computerActions = {
        images: {
            0: './images/computerStill.jpg',
            1: './images/computerShoot.jpg',
            2: './images/computerBlock.jpg',
            3: './images/computerReload.jpg',
            4: './images/computerShotgun.jpg'
        },
        actions: {
            1: computer.shoot,
            2: computer.block,
            3: computer.reload,
            4: computer.shoot
        }
    };

    var clickAction = function (e) {

        // kolla vilken knapp som klickades
        var $target = $(e.target);

        // sätt valet
        player.setChoice($target.data('choice'));
        computer.selectAction();

        // sätt bild
        $playerImage.attr('src', playerActions.images[player.getChoice()]);
        $computerImage.attr('src', computerActions.images[computer.getChoice()]);

        // gör valet
        playerActions.actions[player.getChoice()]();
        computerActions.actions[computer.getChoice()]();

        // besvara på en action
        computer.respondToAction(player.getChoice());
        player.respondToAction(computer.getChoice());

        // visa ammo texten
        $playerBullets.text(player.ammo);
        $computerBullets.text(computer.ammo);

        // visa resultat
        $resultText.text('Resultat: ' + gameActionText[player.getChoice()][computer.getChoice()]);

        // kolla om man kan skjuta
        $shootButton.prop("disabled", !player.canShoot())

        // kolla om spelet är över, om någon är död
        if(checkGameOver()){
            $.confirm(confirmSettings);
        }
    }
        //Kollar ifall någon är död dvs game over
    var checkGameOver = function() {
        return !player.isAlive || !computer.isAlive;
    }

        //Confirm-knappen
    var confirmSettings = {
        title: 'Game over!',
        content: 'Do you want to play again?',
        boxWidth: '30%',
        useBootstrap: false,
        buttons: {
            Yes: function () {
                location.reload();
            },
            No: function () { }
        }
    };

    return {
        init: function () {
            $choiceButtons.on('click', clickAction);
        }
    };

})(jQuery);

gameModule.init();