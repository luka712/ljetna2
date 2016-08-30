
var game = null;

Object.defineProperties(window, {
    "WIDTH": {
        value: 800,
        writable: false
    },
    "HEIGHT": {
        value: 600,
        writable: false
    },
    "COOLDOWN": {
        value: 0.3,
        writable: false
    },
    "SCORE_TEXT": {
        value: "Score: ",
        writable: false
    }
});

window.onload = function () {

    var mainPhaserFunctions = {};
    mainPhaserFunctions.preload = preload;
    mainPhaserFunctions.create = create;
    mainPhaserFunctions.update = update;


    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', mainPhaserFunctions);
}

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('background2', 'assets/background2.png');
    this.load.image('player', 'assets/player.png');
    for (i = 0; i <= 7; i++) {
        this.load.image('asteroid' + i, 'assets/asteroid' + i + '.png');
    }
    this.load.image('bullet', 'assets/bullet.png');
	
	    // STEP 7. Pass correct width, height and frame number for explosion
    //this.load.spritesheet('explosion', 'assets/explosion.png', , ,);

    this.load.path = 'assets/particles/';

    // STEP 1. Load images that are in assets/particle folder, just pass name of each image
    this.load.images([]);



    this.scoreText = game.add.text(10, 10, 'Score: ', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
}

function create() {

    this.backgrounds = [];
    var background1Speed = -60;
    var background2Speed = -40;
    var background1Width = game.cache.getImage("background").width;
    this.backgrounds.push(new ScrollingBackground(game, this.add.sprite(0, 0, 'background'), background1Speed));
    this.backgrounds.push(new ScrollingBackground(game, this.add.sprite(background1Width, 0, 'background'), background1Speed));

    var background2Width = game.cache.getImage("background2").width;
    var background2Height = (HEIGHT - game.cache.getImage("background2").height) / 2;
    this.backgrounds.push(new ScrollingBackground(game, this.add.sprite(0, background2Height, 'background2'), background2Speed));
    this.backgrounds.push(new ScrollingBackground(game, this.add.sprite(background2Width, background2Height, 'background2'), background2Speed));


    // STEP 2. Add emitter http://phaser.io/docs/2.4.1/Phaser.GameObjectFactory.html#emitter
    var playerEngineEmitter = null;
    // STEP 3. Pass particles for emitter. That is image that is going to be used for emitter.
    // Pass emitter as third argument to player. 
    playerEngineEmitter.makeParticles([]);
    this.player = new Player(game, this.add.sprite(0, 0, 'player'));
    // STEP 20. Add health bar property to player and initalize new bar

    this.enemies = [];


    this.spawnAsteroid = function () {
        var index = parseInt(Math.random() * 8);
        var sprite = game.add.sprite(0, 0, 'asteroid' + index);
        var offset = sprite.height / 2;
        sprite.position.x = WIDTH + offset;
        sprite.position.y = (Math.random() * (HEIGHT - offset)) + offset;
        this.enemies.push(new Asteroid(game, sprite));
    }
    this.asteroidSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnAsteroid, this);
    this.bullets = [];
    this.spawnRegularBullet = function () {
        var position = this.player.getPosition();
        this.bullets.push(new RegularBullet(game, game.add.sprite(position.x + 30, position.y, 'bullet'), { x: 1, y: 0 }));
    }

    this.player.bindKey('shoot', Phaser.Keyboard.SPACEBAR)
    this.cooldown = 0;

    this.explosions = [];
    // STEP 8. Add create explosion method which takes two parameters, x and y for position.


    // STEP 22. Add score property to game 
}

function update() {
    if (this.player) {
        this.player.update();
    }

    for (var i in this.backgrounds) {
        this.backgrounds[i].update();
    }

    for (var i = this.enemies.length - 1; i >= 0; i--) {

        this.game.physics.arcade.collide(this.player.sprite, this.enemies[i].sprite, playerEnemyCollision);

        for (var j in this.bullets) {
            this.physics.arcade.collide(this.bullets[j].sprite, this.enemies[i].sprite, bulletEnemyCollision);
        }

        this.enemies[i].update();
        if (this.enemies[i].active == false) {
            this.enemies[i].sprite.destroy();
            this.enemies.splice(i, 1);
        }
    }

    this.cooldown -= this.time.physicsElapsed;

    if (this.player.keyDown('shoot') && this.cooldown <= 0) {
        this.spawnRegularBullet();
        this.cooldown = COOLDOWN;
    }

    for (var i = this.bullets.length - 1; i >= 0; i--) {
        this.bullets[i].update();
        if (this.bullets[i].active == false) {
            this.bullets[i].sprite.destroy();
            this.bullets.splice(i, 1);
        }
    }

    // STEP 16. Add code to remove inactive explosions from array.
}

function playerEnemyCollision(playerSprite, enemySprite) {

    playerSprite.object.health -= enemySprite.object.damage;
    // STEP 21. Check if health bar is not null, if so , change width off player health bar.
    // Try and run game to see if bar is drawing.

    enemySprite.object.active = false;
    // STEP 14. Call create explosion here, and pass enemySprite position as parameters.

    // STEP 24. Decrement score by 10 and set score text.

    if (playerSprite.object.health <= 0) {
        playerSprite.destroy();
        playerSprite.object.active = false;
    }

}

function bulletEnemyCollision(bulletSprite, enemySprite) {
    bulletSprite.object.active = false;
    enemySprite.object.active = false;

    // STEP 15. Create explosion, pass enemy position params,

    // STEP 23. Increment score by 10. 
    // this.scoreText.setText(SCORE_TEXT);

}
