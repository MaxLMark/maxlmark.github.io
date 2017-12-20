//öppna alla elementen som behövs
var image = document.getElementById("userPic");
var computerimage = document.getElementById("computerPic");
var shootBtn = document.getElementById("shootBtn");
var bulletStatUser = document.getElementById("bulletStatusUser");
var bulletStatComputer = document.getElementById("bulletStatusComputer");


//User-klassen
class User {
    constructor(ammo, isAlive, choice) {
        this.ammo = ammo;
        this.isAlive = isAlive;
        this.choice = choice;
    }

    //Skjut-funktionen
    Shoot() {
        if (user.ammo == 3) {
            image.src = "images/userShotgun.jpg";
            user.ammo = 0;
            bulletStatUser.innerText = "Bullets: " + user.ammo;
            bulletStatComputer.innerText = "Bullets: " + computer.ammo;
            delayChoice("images/userStill.jpg", "images/computerStill.jpg");
            user.choice = 4;
            computer.computerChoice();
            user.checkAmmo();
        } else {
            image.src = "images/userShoot.jpg";
            delayChoice("images/userStill.jpg", "images/computerStill.jpg");
            user.choice = 1;
            user.ammo--;
            computer.computerChoice();
            user.checkAmmo();
        }
    };

    //Block-funktionen
    Block() {
        image.src = "images/userBlock.jpg";
        delayChoice("images/userStill.jpg", "images/computerStill.jpg");
        user.choice = 2;
        computer.computerChoice();
        user.checkAmmo();
    };

    //Reload-funktionen
    Reload() {
        image.src = "images/userReload.jpg";
        delayChoice("images/userStill.jpg", "images/computerStill.jpg");
        user.choice = 3;
        user.ammo++;
        computer.computerChoice();
        user.checkAmmo();
    };

    checkAmmo() {
        if (user.ammo > 0) {
            bulletStatUser.innerText = "Bullets: " + user.ammo;
            shootBtn.style.cursor = "default";
            shootBtn.disabled = false;
        } else if (user.ammo == 0) {
            bulletStatUser.innerText = "Bullets: " + user.ammo;
            shootBtn.style.cursor = "not-allowed";
            shootBtn.disabled = true;
        }
    };
};
var user = new User(0, true, 0);

//Computer-klassen
class Computer {
    constructor(ammo, isAlive, choice) {
        this.ammo = ammo;
        this.isAlive = isAlive;
        this.choice = choice;
    }

    //Computer-funktionerna
    computerChoice() {

        computer.choice = Math.floor((Math.random() * 3) + 1);

        switch (computer.choice) {
            case 1:
                if (computer.ammo > 0 && computer.ammo < 3) {
                    computerimage.src = "images/computerShoot.jpg";
                    computer.ammo--;
                    bulletStatComputer.innerText = "Bullets: " + computer.ammo;
                    delayChoice("images/userStill.jpg", "images/computerStill.jpg");
                }
                else if (computer.shotgunCheck(computer.ammo)) {
                }
                else {
                    computerimage.src = "images/computerReload.jpg";
                    computer.ammo++;
                    bulletStatComputer.innerText = "Bullets: " + computer.ammo;
                    computer.choice = 3;
                    delayChoice("images/userStill.jpg", "images/computerStill.jpg");
                }
                break;
            case 2:
                if (computer.shotgunCheck(computer.ammo)) {
                } else {
                    computerimage.src = "images/computerBlock.jpg";
                    delayChoice("images/userStill.jpg", "images/computerStill.jpg");
                }
                break;
            case 3:
                if (computer.shotgunCheck(computer.ammo)) {
                } else {
                    computerimage.src = "images/computerReload.jpg";
                    computer.ammo++;
                    bulletStatComputer.innerText = "Bullets: " + computer.ammo;
                    delayChoice("images/userStill.jpg", "images/computerStill.jpg");
                }
                break;
            default:
                break;
        };
        calculateOutcome(user.choice, computer.choice);
    };

    shotgunCheck(ammo) {
        if (ammo == 3) {
            computerimage.src = "images/computerShotgun.jpg";
            computer.ammo = 0;
            user.ammo = 0;
            bulletStatUser.innerText = "Bullets: " + user.ammo;
            bulletStatComputer.innerText = "Bullets: " + computer.ammo;
            computer.choice = 4;
            delayChoice("images/userStill.jpg", "images/computerStill.jpg");
            return true;
        }
        return false;
    };
};

var computer = new Computer(0, true, 0)

document.getElementById("shootBtn").addEventListener("click", user.Shoot);
document.getElementById("blockBtn").addEventListener("click", user.Block);
document.getElementById("reloadBtn").addEventListener("click", user.Reload);

//Visa ammostatus
bulletStatComputer.innerText = "Bullets: " + computer.ammo;
bulletStatUser.innerText = "Bullets: " + user.ammo;

//Spela igen funktion
function playAgain() {
    $.confirm({
        title: 'Game over!',
        content: 'Do you want to play again?',
        boxWidth: '30%',
        useBootstrap: false,
        buttons: {

            Yes: function () {

                location.reload();
            },
            No: {
                action: function () {

                }
            }
        }
    });
};

//Delay funktion
function delayChoice(userimage, compimage) {
    setTimeout(function () {
        image.src = userimage;
        computerimage.src = compimage;
    }, 2000);
};


//If-satser som är de olika alternativen w
function calculateOutcome(userChoice, computerChoice) {
    var resultat = document.getElementById("hresult");
    if (user.choice == 2 && computerChoice == 2) {
        resultat.innerText = "Resultat: Båda blockade!";
        setTimeout(function () {
            resultat.innerText = "Resultat: ";
        }, 2000);
    }
    else if (user.choice == 3 && computerChoice == 3) {
        resultat.innerText = "Resultat: Båda laddade!";
        setTimeout(function () {
            resultat.innerText = "Resultat: ";
        }, 2000);
    }
    else if (user.choice == 1 && computerChoice == 1) {
        resultat.innerText = "Resultat: Båda sköt, ingen vinnare!";
        user.ammo = 0;
        computer.ammo = 0;
        bulletStatComputer.innerText = "Bullets: " + computer.ammo;
        setTimeout(function () {
            playAgain();
        }, 2000);
    }
    else if (user.choice == 1 && computerChoice == 3) {
        resultat.innerText = "Resultat: Du vann!";
        user.ammo = 0;
        computer.ammo = 0;
        bulletStatComputer.innerText = "Bullets: " + computer.ammo;
        setTimeout(function () {
            playAgain();
        }, 2000);
    }
    else if (user.choice == 3 && computerChoice == 1) {
        resultat.innerText = "Resultat: Du förlora!";
        user.ammo = 0;
        computer.ammo = 0;
        bulletStatComputer.innerText = "Bullets: " + computer.ammo;
        setTimeout(function () {
            playAgain();
        }, 2000);
    }
    else if (user.choice == 2 && computerChoice == 1) {
        resultat.innerText = "Resultat: Bra! Du blockade ett skott!";
        setTimeout(function () {
            resultat.innerText = "Resultat: ";
        }, 2000);
    }
    else if (user.choice == 1 && computerChoice == 2) {
        resultat.innerText = "Resultat: Ajdå! Datorn blockade ditt skott!";
        setTimeout(function () {
            resultat.innerText = "Resultat: ";
        }, 2000);
    }
    else if (user.choice < 4 && computerChoice == 4) {
        resultat.innerText = "Resultat: Du förlora! Datorn använde SHOTGUN!!!";
        user.ammo = 0;
        setTimeout(function () {
            playAgain();
        }, 2000);
    }
    else if (user.choice == 4 && computerChoice == 4) {
        resultat.innerText = "Resultat: Båda använder SHOTGUN! Oavgjort!";
        computer.ammo = 0;
        setTimeout(function () {
            resultat.innerText = "Resultat: ";
        }, 2000);
    }
    else if (user.choice == 4 && computerChoice < 4) {
        resultat.innerText = "Resultat: Du vann! Du använde SHOTGUN!!!";
        computer.ammo = 0;
        setTimeout(function () {
            playAgain();
        }, 2000);
    }
};




























