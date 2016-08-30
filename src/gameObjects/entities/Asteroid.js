function Asteroid(game, sprite) {
    BaseEnemy.call(this, game, sprite);

    this.sprite.body.velocity.x = -(Math.random() * 100 + 25);
    this.rotation = (Math.random() - 0.5) * Math.PI * 2;
    
    this.damage = 20;
}

Asteroid.prototype = Object.create(BaseEnemy.prototype);

Asteroid.prototype.update = function () {
    BaseEnemy.prototype.update.call(this);
    this.sprite.angle += this.rotation;
}