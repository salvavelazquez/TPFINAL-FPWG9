import Phaser from "phaser";


class Escena3 extends Phaser.Scene {
  constructor() {
    super("Escena3");
    this.platforms = null;
    this.scoreText = "";
    this.score = 0;
    this.timeLeft = 30;
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image('caverna', '/img/DudeImagenes/Caverna.png');
    this.load.image('ground', '/img/DudeImagenes/platf.png');
    this.load.image('star', '/img/DudeImagenes/star.png');
    this.load.image('bomb', '/img/DudeImagenes/bomb.png');
    this.load.spritesheet('dude', '/img/DudeImagenes/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('Trofeo3', '/img/DudeImagenes/Trofeo3.png');
  }

  create() {
    this.timeLeft =30;

    this.add.image(400, 300, 'caverna');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(150, 568, 'ground').setScale(1).refreshBody();// LOS 
    this.platforms.create(470, 568, 'ground').setScale(1).refreshBody();// TRES SON LAS 
    this.platforms.create(784, 568, 'ground').setScale(1).refreshBody();// PLATAFORMAS DE ABAJO
    this.platforms.create(400, 400, 'ground').setScale(0.5).refreshBody(); //  el cuarto 
    this.platforms.create(120, 150, 'ground') .setScale(0.5).refreshBody(); // el primero
    this.platforms.create(120, 480, 'ground').setScale(0.5).refreshBody(); // el tercero
    this.platforms.create(170, 330, 'ground').setScale(0.5).refreshBody(); // el segundo
    this.platforms.create(455, 298, 'ground').setScale(0.5).refreshBody(); // el quinto 
    this.platforms.create(580, 150, 'ground') .setScale(0.5).refreshBody(); // el primero
    this.platforms.create(765, 400, 'ground').setScale(0.5).refreshBody(); //  el cuarto 

    this.Trofeo3 = this.physics.add.sprite(700, 100, 'Trofeo3');
    this.physics.add.collider(this.Trofeo3, this.platforms);


    // Crea un temporizador para cambiar la posición del Trofeo3 cada 5 segundos (5000 milisegundos)
    this.trofeoTimer = this.time.addEvent({
      delay: 2000,
      callback: this.changeTrofeoPosition,
      callbackScope: this,
      loop: true
    });






    this.player = this.physics.add.sprite(100, 100, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 30,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 6,
      setXY: { x: 12, y: 0, stepX: 110 }
    });
   // EL rebote de las estrellas en las plataformas 
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.overlap(this.player, this.Trofeo3, this.collectTrofeo3, null, this);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#FFFF' });

    this.bombs = this.physics.add.group();
    this.createBombs(); // Llamamos a la función para crear bombas al inicio
    this.physics.add.collider(this.platforms, this.bombs); // Aseguramos que las bombas colisionen con las plataformas
    //this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.timeText = this.add.text(600, 16, 'Tiempo: 60', { fontSize: '32px', fill: '#FFFF' });
  }

  update() {
    if (this.score > 700) {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('winner', { score: this.score });
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn', true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (this.timeLeft > 0) {
      this.timeLeft -= 1 / 60;
      this.timeText.setText('Tiempo: ' + Math.ceil(this.timeLeft));
    } else {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('GameO', { score: this.score });
    }
  }

  collectTrofeo3(player, trofeo) {
    trofeo.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText('Score: ' + this.score);
    this.scene.start('winner', { score: this.score });

    // Aquí verificamos si el jugador ha recogido la copa y ganó la partida
    if (this.score > 700) {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('winner', { score: this.score });
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }



  // Función para crear bombas
  createBombs() {
    for (let i = 0; i <5; i++) { // Puedes ajustar el número de bombas según tu preferencia
      let x = Phaser.Math.Between(50, 750);
      let y = Phaser.Math.Between(0, 300);
      let bomb = this.bombs.create(x, y, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }



  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.scene.stop('Escena3');
    this.scene.start('GameO', { score: this.score });
  }



  changeTrofeoPosition() {
    // Cambia la posición del Trofeo3 a una ubicación aleatoria
    this.Trofeo3.setX(Phaser.Math.Between(50, 750));
    this.Trofeo3.setY(Phaser.Math.Between(50, 600));
  }
}

export default Escena3;
