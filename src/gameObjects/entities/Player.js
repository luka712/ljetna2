
function Player(game, sprite, emitter) {

    BaseGameObject.call(this, game,sprite);
    this.sprite.body.collideWorldBounds = true;


    this.speed = 200;
    this.sprite.scale.setTo(0.5, 0.5);
    this.keys = this.game.input.keyboard.addKeys({
        up: Phaser.KeyCode.W,
        down: Phaser.KeyCode.S,
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D,
    });

    this.health = 100;
    this.emitter = emitter;
    // STEP 4 Start emitter. See http://phaser.io/docs/2.4.1/Phaser.Particles.Arcade.Emitter.html#start for reference.
    // pass false, 1000 and 1 for arguments.
    this.emitter.start(false, 1000, 1);
    

    this.emitter.setScale(0.3,0,0.3,0, 3000);
    this.emitter.gravity = 0;
}

Player.prototype = Object.create(BaseGameObject.prototype);


Player.prototype.update = function () {
    if(!this.active) return;
    
    if (this.keys.up.isDown) {
        this.sprite.body.velocity.y = -this.speed;
    } else if (this.keys.down.isDown) {
        this.sprite.body.velocity.y = this.speed;
    } else {
        this.sprite.body.velocity.y = 0;
    }

    if (this.keys.right.isDown) {
        this.sprite.body.velocity.x = this.speed;
    } else if (this.keys.left.isDown) {
        this.sprite.body.velocity.x = -this.speed;
    } else {
        this.sprite.body.velocity.x = 0;
    }
    
    // STEP 5. Add min and max particles speed. First param is x direction, second param is y direction.
    this.emitter.minParticleSpeed.set(-20, 0);
    this.emitter.maxParticleSpeed.set(-50,0);
    
    // STEP 6. Set emitting position and add appropriate offset.
    this.emitter.emitX = this.sprite.position.x - 15;
    this.emitter.emitY = this.sprite.position.y ;

}

Player.prototype.bindKey = function(key, keyCode){
    this.keys[key] = this.game.input.keyboard.addKey(keyCode);
}

Player.prototype.keyDown = function(key){
    return this.keys[key].isDown;
}

Player.prototype.getPosition = function(){
    return this.sprite.position;
}