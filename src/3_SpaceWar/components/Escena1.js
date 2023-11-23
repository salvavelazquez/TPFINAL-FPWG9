import Phaser from "phaser";

class Escena1 extends Phaser.Scene {
  constructor() {
    super("Escena1");
    this.cont = 0;
  }

  preload() {

    this.load.image('fondo1', '/img/SpaceWarImages/fond1.jpg'); // esta es la imagen de fondo
    this.load.spritesheet('portal', '/img/SpaceWarImages/portalDefinido.png', { frameWidth: 162.25, frameHeight: 384 });
    this.load.image('shoot', '/img/SpaceWarImages/shoot.png');
    this.load.spritesheet('nave', '/img/SpaceWarImages/nave.png', { frameWidth: 70, frameHeight: 62 }); // la nave principal
    this.load.image('red', '/img/SpaceWarImages/red.png');
    this.load.image('yellow', '/img/SpaceWarImages/yellow.png');
    this.load.image('enemy', '/img/SpaceWarImages/enemy.png');
    this.load.image('dialog', '/img/SpaceWarImages/Dialog.png');
    this.load.image('wolf', '/img/SpaceWarImages/wolf.png');
    //archivos de sonido
    this.load.audio('backgroundMusic', '/sounds/SpaceWarSounds/musicafondo.mp3');
    this.load.audio('shootSound', '/sounds/SpaceWarSounds/shoot.mp3');
    this.load.audio('explosionSound', '/sounds/SpaceWarSounds/explosion.mp3');

  }
  create() {
    this.cont = 0;
    this.add.image(400, 400, 'fondo1');
    this.enemyText = this.add.text(580, 20, 'Aniquilación: 0', { fontSize: '22px', fill: '#FFFF' });
    this.bullets = this.physics.add.group(); // Crea un grupo para las balas
    this.barraespacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Configura la tecla espaciadoraaa

    // Detener el sonido antes de volver al menú
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }

    //Sound
    this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
    this.shootSound = this.sound.add('shootSound', { volume: 0.5 });
    this.explosionSound = this.sound.add('explosionSound', { volume: 0.5 });

    // Inicia la música de fondo
    this.backgroundMusic.play();

    this.player = this.physics.add.sprite(100, 300, 'nave');
    this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego

    // son las particulas 
    const particles = this.add.particles(-40, 0, 'red', {
      speed: 100,
      angle: { min: 150, max: 210 },
      scale: { start: 1.0, end: 0 },  // EL TAMAÑO DE LAS PARTICULAS """""""""""""
      blendMode: 'ADD' // este agraga las particulas 

    });

    particles.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    ///////////////////////////////////
    //ENEMY  
    this.enemys = this.physics.add.group({
      key: 'enemy',
      live: 3,
      repeat: 100, //cantidad
      setXY: { x: 900, y: 50, stepY: 200 }
    });

    let n = -100;

    this.enemys.children.iterate(function (child) {
      child.live = 3;
      n = n * -1;
      child.setVelocityY(n);
      child.setVelocityX(Phaser.Math.Between(-50, -100));
    });


    this.anims.create({
      key: 'animacionPortal',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });




    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
      //frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
    });

    this.time.addEvent({
      delay: 10000, // Espera 9 segundos
      callback: this.portalOpen,
      callbackScope: this,
    });

    //Choque balas del player
    this.physics.add.overlap(this.bullets, this.enemys, this.playerAttack, null, this); //enemys
    //choque entre el player y el enemigo
    this.physics.add.overlap(this.player, this.enemys, this.enemyAttack, null, this);
  }


  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.setVelocityX(0);

      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.setVelocityX(0);

      this.player.anims.play('down', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('left', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.barraespacio)) { // Verifica si la tecla espaciadora se presionó en este fotograma
      this.shootSound.play();
      const bullet = this.bullets.create(this.player.x, this.player.y, 'shoot'); // Crea una bala en la posición del jugador
      bullet.setVelocity(300, 0); // Establece la velocidad de la bala (en este caso, hacia arriba)
    }

    this.enemys.children.iterate(function (child) {
      if (child.y < 25) {
        child.setVelocityY(150);
      } else if (child.y > 560) {
        child.setVelocityY(-150);
      }
    });

    //Destroy fuera de rangos
    this.bullets.children.iterate(function (bullet) {
      if (bullet && bullet instanceof Phaser.GameObjects.Sprite && bullet.x > 750) {
        bullet.destroy();
      }
    });

    this.enemys.children.iterate(function (enemy) {
      if (enemy && enemy instanceof Phaser.GameObjects.Sprite && enemy.x < 0) {
        enemy.destroy();
      }
    })

  }

  playerAttack(bullet, enemy) {

    bullet.destroy();
    enemy.live -= 1;
    if (enemy.live == 0) {
      //Particulas 
      const emitter = this.add.particles(0, 0, 'yellow', {
        x: enemy.x,
        y: enemy.y,
        speed: { min: 50, max: 200 },
        quantity: 30,
        lifespan: 1000,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
      });

      // Activa la explosión de partículas
      emitter.explode();
      this.explosionSound.play();
      // Espera un momento antes de eliminar la nave y las partículas
      this.time.delayedCall(300, () => {
        enemy.destroy();
        emitter.stop();
      });
      this.cont += 1;
      this.enemyText.setText('Aniquilación: ' + this.cont);
    }


  }

  enemyAttack(player, enemy) {
    player.setTint(0xff0000);
    this.time.addEvent(
      {
        delay: 500,
        callbackScope: this,
        callback: function () {
          this.scene.stop('Escena1');
          this.scene.start('GameOver', { cont: this.cont });
        }
      }
    );

  }

  portalOpen() {

    this.add.image(85, 530, 'wolf').setScale(0.3);
    this.add.image(205, 490, 'dialog').setScale(0.4);
    this.gooText = this.add.text(162, 475, 'GOO!', { fontSize: '40px', fill: '#0cc6ff' });

    this.time.delayedCall(2000, () => {
      this.portal = this.physics.add.sprite(700, 300, 'portal');
      this.portal.play('animacionPortal');
      
      this.physics.add.overlap(this.player, this.portal, () => {
        this.scene.stop("Escena1");
        this.scene.start('Escena2', { cont: this.cont });
      })
    });

  }

}

export default Escena1;