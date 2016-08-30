function BaseEnemy(game, sprite) {
    BaseGameObject.call(this, game , sprite);

    this.sprite.scale.setTo(0.5, 0.5);
}

BaseEnemy.prototype = Object.create(BaseGameObject.prototype);

BaseEnemy.prototype.update = function () {
    if(this.sprite.position.x < 0 - this.sprite.width){
        this.active = false;
    }
}