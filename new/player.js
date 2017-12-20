// JavaScript "klass" är egentligen en funktion
function Player() {
    let self = this;

    this.isAlive = true;
    this.choice = 0;
    this.ammo = 0;

    this.die = function () {
        self.isAlive = false;
    }

    this.canShoot = function () {
        return self.ammo > 0;
    }

    this.isShotgunAvailable = function () {
        return self.ammo >= 3;
    }

    this.reload = function () {
        self.ammo = self.ammo + 1;
    }

    this.shoot = function () {
        if (self.isShotgunAvailable()) {
            self.ammo = 0;
        } else {
            self.ammo -= 1;
        }
    }

    this.block = function (isShotgun) {
        if (isShotgun) {
            self.die();
        }
    }

    this.respondToAction = function (enemyAction) {
        var choice = self.getChoice();
        switch (enemyAction) {
            case 1:
                if (choice === actions.shoot) {
                    self.die();
                } else if (choice === actions.reload) {
                    self.die();
                }
                break;
            case 4:
                self.die();
                break;
            default:
                break;
        }
    }

    this.getChoice = function () {
        return self.choice;
    }

    this.setChoice = function (choice) {
        if (self.isShotgunAvailable()) {
            self.choice = actions.shotgun;
            return;
        }
        self.choice = choice;
    }
}

//Computer-klassen som ärver av player-klassen
function Computer() {
    let self = this;
    Player.call(self);

    this.selectAction = function () {
        if (self.ammo == 0) {
            self.setChoice(actions.reload);
            return actions.reload;
        }
        self.setChoice(Math.floor((Math.random() * 3) + 1));
        return self.choice;
    }
}