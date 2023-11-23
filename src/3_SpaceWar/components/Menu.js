import Phaser from "phaser";

class Menu extends Phaser.Scene {

  constructor() {
    super("menu");

  }

  preload() {
    // en preload vamos a cargar nuestras imagenes que vamos a usar 
    // para tenerlo disponibles para que la paguna luego la pueda renderizar
    this.load.image('start', '/img/SpaceWarImages/start.png');
    this.load.image('menunave', '/img/SpaceWarImages/fondomenunave.jpg');
    this.load.image('titulo', '/img/SpaceWarImages/titulo.png');
  }

  create() {
    ////////////////////////////////////////////////////////
    this.add.image(400, 300, 'menunave');  // imagen del fondo 
    this.add.image(400, 200, 'titulo').setScale(0.4);

    this.starbutton = this.add.image(400, 500, 'start').setScale(0.7).setInteractive();

    this.starbutton.on('pointerdown', () => {
      this.scene.stop("menu");
      this.scene.start('Escena1');

    });

  }

}

export default Menu;  