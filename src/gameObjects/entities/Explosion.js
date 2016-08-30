function Explosion(game, sprite) {
    BaseGameObject.call(this, game, sprite);
    
    // STEP 10. Pass parameters to add method. See http://phaser.io/docs/2.6.1/Phaser.AnimationManager.html#add
    this.explosionAnimation = sprite.animations.add('play', null, 20); 
    
    // STEP 11. Add onComplete event to explosion method. Event should take this.finishedPlayingAnimation and this as parameters.
    // http://phaser.io/examples/v2/animation/animation-events for reference
    this.explosionAnimation.onComplete.add(this.finishedPlayingAnimation, this);
	
	this.playExplosion();
}

Explosion.prototype = Object.create(BaseGameObject.prototype);

Explosion.prototype.update = function () {
    BaseGameObject.prototype.update.call(this);
}

Explosion.prototype.finishedPlayingAnimation = function () {
    // STEP 12. Set active property to false and destroy sprite.
    this.active = false;
    this.sprite.destroy();
}

// STEP 13. Add playExplosion method to prototy for animation and implement method.
// See http://phaser.io/docs/2.6.1/Phaser.Animation.html#play for reference
Explosion.prototype.playExplosion = function(){
	this.explosionAnimation.play('play');
}

