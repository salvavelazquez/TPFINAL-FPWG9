import Phaser from "phaser";

class Escena2 extends Phaser.Scene {
  constructor() {
    super('Escena2');
    this.vidasText = "";
    this.vidas = 0;
    this.bonus = false;
    this.bosstate = false;
    this.booslife = 50;
  }

  init(data){
    this.cont = data.cont;
  }

  preload() {

    this.load.image('fondo', '/img/SpaceWarImages/espacio2.jpg');
    this.load.spritesheet('nave', '/img/SpaceWarImages/nave.png', { frameWidth: 70, frameHeight: 62 });
    this.load.image('enemy', '/img/SpaceWarImages/enemy.png');
    this.load.image('boss', '/img/SpaceWarImages/boss.png');
    this.load.image('shoot', '/img/SpaceWarImages/shoot.png');
    this.load.image('shootEnemy', '/img/SpaceWarImages/shootEnemy.png');
    this.load.image('meteorito', '/img/SpaceWarImages/meteorito.png');
    this.load.image('red', '/img/SpaceWarImages/red.png');
    this.load.image('yellow', '/img/SpaceWarImages/yellow.png');
    this.load.image('bonus', '/img/SpaceWarImages/bonus.png');
    this.load.image('heart', '/img/SpaceWarImages/heart.png');
    //archivos de sonido
    this.load.audio('shootSound', '/sounds/SpaceWarSounds/shoot.mp3');
    this.load.audio('collisionSound', '/sounds/SpaceWarSounds/colision.mp3');
    this.load.audio('explosionSound', '/sounds/SpaceWarSounds/explosion.mp3');

  }

  create() {
    this.vidas = 7;
    this.bonus = false;
    this.bosstate = false;
    this.booslife = 50;

    //fondo en Movimiento 
    this.fondo = this.add.tileSprite(0, 0, 800, 600, 'fondo');
    this.fondo.setOrigin(0, 0);

    this.add.image(65, 30, 'heart').setScale(0.4);
    this.vidasText = this.add.text(16, 16, '7', { fontSize: '32px', fill: '#FFFF' });
    this.enemyText = this.add.text(600, 16, 'Aniquilación: '+ this.cont, { fontSize: '20px', fill: '#FFFF' });
    
    // Crea una instancia de Audio para cada sonido
    this.shootSound = this.sound.add('shootSound', { volume: 0.5 });
    this.collisionSound = this.sound.add('collisionSound', { volume: 0.3 });
    this.explosionSound = this.sound.add('explosionSound', { volume: 0.5 });
    
    //Se  agrega el bonus
    this.stars = this.physics.add.image(700, 150, 'bonus').setScale(0.1);
    this.stars.setVelocity(90, 300);
    this.stars.setBounce(1);
    this.stars.setCollideWorldBounds(true);

    //PLAYER
    this.player = this.physics.add.sprite(100, 300, 'nave');
    this.player.setCollideWorldBounds(true); //no atraviesa bordes del area del juego

    this.anims.create({
      key: 'up',
      frames: [{ key: 'nave', frame: 2 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'nave', frame: 0 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'down',
      frames: [{ key: 'nave', frame: 1 }],
      frameRate: 20
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    //Particulas 
    this.particles = this.add.particles(-40, 0, 'red', {
      speed: 100,
      angle: { min: 150, max: 210 },
      scale: { start: 1.0, end: 0 },  // EL TAMAÑO DE LAS PARTICULAS
      blendMode: 'ADD' // este agregada las particulas 
    });

    this.particles.startFollow(this.player);

    //BALAS
    this.bullets = this.physics.add.group();
    this.bossbullets = this.physics.add.group();
    this.lastShot = 0; // Variable para controlar el tiempo desde el último disparo
    this.minTime = 200; // Tiempo mínimo entre disparos en milisegundos

    ///////////////////////////////////
    //ENEMY  
    this.enemys = this.physics.add.group({
      key: 'enemy',
      live: 3,
      repeat: 100, //cantidad
      setXY: { x: 1000, y: 50, stepY: 200 }
    });

    let n = -100;

    this.enemys.children.iterate(function (child) {
      child.live = 3;
      n = n * -1;
      child.setVelocityY(n);
      child.setVelocityX(Phaser.Math.Between(-50, -100));
    });

    //Meteroritos
    this.meteoritos = this.physics.add.group({
      key: 'meteorito',
      repeat: 9, //cantidad
      setXY: { x: 750, y: 150, stepY: Phaser.Math.FloatBetween(100, 300) } //empieza en la posicion x e y, se repite cada 70 de espacios
    });

    this.meteoritos.children.iterate(function (meteorito) {
      meteorito.setScale(0.1);
      meteorito.setVelocityX(Phaser.Math.Between(-300, -500));
    });

    //Evento aparición de meteoritos
    this.time.addEvent({
      delay: 3500,
      callback: this.crearMeteoritos,
      callbackScope: this,
      repeat: 9
    });

    this.boss = this.physics.add.image(1000, 250,'boss').setScale(2);;
    const bossGroup = this.physics.add.group();
    bossGroup.add(this.boss);

    this.time.addEvent({
      delay: 9000, // Espera 9 segundos
      callback: this.finalBoss,
      callbackScope: this,
    });

    //Choque balas del player
    this.physics.add.overlap(this.bullets, this.enemys, this.playerAttack, null, this); //enemys
    this.physics.add.overlap(this.bullets, this.meteoritos, this.balasMeteoro, null, this); //meteoritos
    this.physics.add.overlap(this.bullets, bossGroup, this.balasBoss, null, this);//boss
    //Choque entre el player y el bonus
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    //Choque entre el player y los meteoritos 
    this.physics.add.overlap(this.player, this.meteoritos, this.colisionMeteoro, null, this);
    //choque entre el player y el enemigo
    this.physics.add.overlap(this.player, this.enemys, this.enemyAttack, null, this);
    //choque entre el player y balas boss
    this.physics.add.overlap(this.player, this.bossbullets, this.bossAttack, null, this);

  }
  update() {
    // Mueve el fondo en la dirección deseada
    this.fondo.tilePositionX += 1; // Ajusta la velocidad de desplazamiento horizontal

    //Desplazamiento de la nave
    if (this.cursors.up.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-250);
      this.player.anims.play('up', true);
      this.particles.y = 10;

    } else if (this.cursors.down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(250);
      this.player.anims.play('down', true);
      this.particles.y = -10;
    }
    else if (this.cursors.left.isDown) {
      this.player.setVelocityY(0);
      this.player.setVelocityX(-200);
      this.player.anims.play('turn', true);
      this.particles.y = 0;

    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.setVelocityY(0);
      this.player.anims.play('turn', true);
      this.particles.y = 0;
    }else{
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('turn', true);
    }

    // Manejo del disparo
    if (this.cursors.space.isDown && this.time.now > this.lastShot + this.minTime) {
      // Solo dispara si se ha pasado suficiente tiempo desde el último disparo
      this.shootSound.play();
      if (this.bonus) {
        let bullet = this.bullets.create(this.player.x + 35, this.player.y - 15, 'shoot');

        bullet.setCollideWorldBounds(true);
        bullet.setVelocityX(300);
        let bullet2 = this.bullets.create(this.player.x + 35, this.player.y + 15, 'shoot');

        bullet2.setCollideWorldBounds(true);
        bullet2.setVelocityX(300);
      } else {
        let bullet3 = this.bullets.create(this.player.x + 45, this.player.y, 'shoot');
        bullet3.setCollideWorldBounds(true);
        bullet3.setVelocityX(300);
      }

      this.player.setVelocity(0);
      this.player.anims.play('turn', true);
      this.particles.y = 0;
      this.lastShot = this.time.now; // Actualiza el tiempo del último disparo
    }

    this.enemys.children.iterate(function (child) {
      if (child.y < 25) {
        child.setVelocityY(100);
      } else if (child.y > 560) {
        child.setVelocityY(-100);
      }
    });

    this.bullets.children.iterate(function (bullet) {
      if (bullet && bullet instanceof Phaser.GameObjects.Sprite && bullet.x > 750) {
        bullet.destroy();
      }
    });

    this.bossbullets.children.iterate(function (bbullet) {
      if (bbullet && bbullet instanceof Phaser.GameObjects.Sprite && bbullet.x < 0) {
        bbullet.destroy();
      }
    });

    this.enemys.children.iterate(function (enemy) {
      if (enemy && enemy instanceof Phaser.GameObjects.Sprite && enemy.x < 0) {
        enemy.destroy();
      }
    })

    if(this.boss){
      if (this.boss.y < 25) {
        this.boss.setVelocityY(100);
      } else if (this.boss.y > 560) {
        this.boss.setVelocityY(-100);
      }

      if(this.bosstate && this.boss.y< this.player.y+3 && this.boss.y>this.player.y-3){
        let bossbullet = this.bossbullets.create(this.boss.x - 80, this.boss.y - 25, 'shootEnemy');
        bossbullet.setVelocityX(-900);
        let bossbullet2 = this.bossbullets.create(this.boss.x - 80, this.boss.y + 25, 'shootEnemy');
        bossbullet2.setVelocityX(-900);
      }
    }

  }

  playerAttack(bullet, enemy) {

      bullet.destroy();
      enemy.live -= 1;
      if (enemy.live == 0) {
        //Particulas 
        const emitter= this.add.particles(0, 0, 'yellow', {
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
        this.cont+=1;
        this.enemyText.setText('Aniquilación: '+this.cont);
      }
    
  }

  crearMeteoritos() {
    this.meteoritos.children.iterate(function (meteorito) {
      meteorito.enableBody(true, 800, Phaser.Math.FloatBetween(50, 300), true, true);
      meteorito.setVelocityX(Phaser.Math.Between(-300, -500));
    });
  }

  collectStar(player, star) {
    this.bonus = true;
    star.disableBody(true, true);
  }

  colisionMeteoro(player, meteorito) {
    meteorito.destroy();
    this.vidas -= 1;
    this.vidasText.setText(this.vidas);
    this.collisionSound.play();
  
    if (this.vidas <= 0) {
      player.setTint(0xff0000);
      this.fondo.destroy();
      this.scene.stop('Escena2');
      this.scene.start('GameOver',{cont:this.cont});
    }

  }

  balasMeteoro(bullet, meteorito) {
    bullet.destroy();
    meteorito.disableBody(true, true);
  }
  enemyAttack(player, enemy) {
    player.setTint(0xff0000);
    this.time.addEvent(
      {
        delay: 500,
        callbackScope: this,
        callback: function () {
          this.scene.stop('Escena2');
          this.scene.start('GameOver',{cont:this.cont});
        }
      }
    );

  }

  finalBoss(){
    this.boss.setPosition(700,250);
    this.boss.setVelocityY(200);
    this.bosstate = true;
    this.bossText = this.add.text(320, 16, 'Boss:50', { fontSize: '22px', fill: '#FF9900' });
    this.add.image(435, 25, 'heart').setScale(0.3).setTint(0xFF9900);

  }

  balasBoss(bullet, boss){
    bullet.destroy();
    this.booslife -= 1;
    this.bossText.setText('Boss:'+this.booslife);
    if (this.booslife < 1) {
      //Particulas 
      const emitter= this.add.particles(0, 0, 'yellow', {
        x: boss.x,
        y: boss.y,
        speed: { min: 50, max: 200 },
        quantity: 30,
        lifespan: 1000,
        scale: { start: 5, end: 0 },
        blendMode: 'ADD',
      });
      // Activa la explosión de partículas
      emitter.explode();
      this.explosionSound.play();
      // Espera un momento antes de eliminar la nave y las partículas
      this.bossText.setText('WIN!!!');
      this.time.delayedCall(300, () => {
        boss.destroy();
        emitter.stop();
      });
    }

    if(this.booslife < 1){
      this.time.delayedCall(1000, () => {
        this.scene.stop("Escena2");
        this.scene.start('Booyah',{cont:this.cont});
      });
      
    }
  }

  bossAttack(player,bossbullet){
    bossbullet.destroy();
    this.vidas -= 1;
    this.vidasText.setText(this.vidas);
    this.collisionSound.play();
    if (this.vidas <= 0) {
      this.scene.stop('Escena2');
      this.scene.start('GameOver',{cont:this.cont});
    }
  }

}
export default Escena2;