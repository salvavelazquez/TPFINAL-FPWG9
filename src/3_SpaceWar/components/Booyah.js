import Phaser from "phaser";

class Booyah extends Phaser.Scene {

    constructor() {
        super("Booyah");
        this.scoreText = "" + this.cont;
    }
    init(data) {
        this.cont = data.cont;
    }

    preload() {

        this.load.image('fondoFinal', '/img/SpaceWarImages/fondoW.png');
        this.load.image('menu', '/img/SpaceWarImages/menu.png');
        this.load.image('YouWin', '/img/SpaceWarImages/YouWin.png');
        this.load.image('again', '/img/SpaceWarImages/again.png');
        this.load.image('wolf2', '/img/SpaceWarImages/wolfWinner.png');
        this.load.image('dialog', '/img/SpaceWarImages/Dialog.png');
    }

    create() {

        this.add.image(400, 300, 'fondoFinal');
        this.add.image(145, 355, 'wolf2').setScale(0.5);
        this.add.image(335, 260, 'dialog').setScale(0.6);
        this.starbutton = this.add.image(400, 100, 'YouWin').setScale(0.3);
        this.starbutton = this.add.image(150, 500, 'again').setScale(0.23).setInteractive();
        this.starbutton.on('pointerdown', () => {
            this.scene.stop("Booyah");
            this.scene.start('Escena1');
        });

        this.scoreText = this.add.text(258, 230, 'Enemies Destroyed: ', { fontSize: '16px', fill: '#000000'});
        this.resultText = this.add.text(299, 250, this.cont, { fontSize: '80px', fill: '#000000'});
        this.starbutton = this.add.image(700, 500, 'menu').setScale(0.31).setInteractive();

        this.starbutton.on('pointerdown', () => {
            this.scene.stop("Booyah");
            this.scene.start('menu');
        });
    }
}

export default Booyah;