function ScrollingBackground(game, sprite, speed){   
    BaseGameObject.call(this, game , sprite);
        
    this.sprite.body.velocity.x = speed;
    this.sprite.anchor = new Phaser.Point(0,0);
}

ScrollingBackground.prototype = Object.create(BaseGameObject.prototype);

ScrollingBackground.prototype.update = function () {
    if(this.sprite.position.x <= -this.sprite.width){
        this.sprite.position.x = this.sprite.width;
    }
}