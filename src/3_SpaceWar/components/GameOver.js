import Phaser from "phaser";

class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
    }

    init(data){
        this.cont = data.cont;
    }
    

    preload(){
        this.load.image('fondoOver','/img/SpaceWarImages/fondoGO.png');
        this.load.image('cartel','/img/SpaceWarImages/GameO.png');
        this.load.image('again','/img/SpaceWarImages/again.png');
        this.load.image('menu','/img/SpaceWarImages/menu.png');
    }

    create(){
        this.add.image(400,300,'fondoOver');

        this.add.image(400, 100, 'cartel').setScale(0.3);

        this.starbutton   = this.add.image(150, 500, 'again').setScale(0.23).setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("GameOver");
            this.scene.start('Escena1');
        } );
        this.scoreText = this.add.text(200, 300, 'Naves Destruidas: '+ this.cont, {fontSize: '32px', fill: '#fff'}); 
        this.starbutton   = this.add.image(700, 500, 'menu').setScale(0.31).setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("GameOver");
            this.scene.start('menu');
        } );
    } 
}

export default GameOver;