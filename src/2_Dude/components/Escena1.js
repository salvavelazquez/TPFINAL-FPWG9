import Phaser from "phaser";

class Escena1 extends Phaser.Scene {

    constructor() {
        super("Escena1");
        this.platforms = null;
        this.scoreText = "";
        this.score = 0;
    }



    preload() {
        this.load.image('sky', '/img/DudeImagenes/escenario1.jpg');
        this.load.image('ground', '/img/DudeImagenes/platf.png');
        this.load.image('star', '/img/DudeImagenes/star.png');
        this.load.image('bomb', '/img/DudeImagenes/bomb.png');
        this.load.spritesheet('dude', '/img/DudeImagenes/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.score = 0;
        //cielo y barras
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(470, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(784, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        //PLAYER
        this.player = this.physics.add.sprite(100, 100, 'dude');
        //physics del player
        this.player.setBounce(0.2); //rebote entre 0 o 1
        this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 30,
            repeat: -1 // valor negativo para repeticion infinita, 0 para una sola
            //reproduccion, 1 para dos repeticiones, y asi sucesivamente
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

        //Colision de jugador y plataformas
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        //Se  agregan las estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 6, //cantidad de estrellas
            setXY: { x: 12, y: 0, stepX: 110 } //empieza en la posicion x e y, se repite cada 70 de espacios
        });

        //Se agrega el rebote entre el grupo de estrellas
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //habilita las colisiones de las estrellas con las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        //Choque entre las estrellas y el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFF' });

        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }
    update() {

        if (this.score > 120) {
            this.physics.pause();
            this.player.anims.play('turn');
            this.scene.stop('Escena1');
            this.scene.start('Escena2', { score: this.score });
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn', true);
        }
        //si presiona la tecla de arriba y el player esta pisando suelo
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

    }

    //Colision entre el jugador y las estrellas
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        //Para las bombas
        if (this.stars.countActive(true) == 0) {
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

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.stop('Escena1');
        this.scene.start('GameO', { score: this.score });
    }
}
export default Escena1;