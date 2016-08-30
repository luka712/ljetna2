function  BaseBullet(game,sprite) {
    BaseGameObject.call(this,game,sprite);
}

BaseBullet.prototype = Object.create(BaseGameObject.prototype);

BaseBullet.prototype.update = function () {
    
    if(!this.active) return;
    
    BaseGameObject.prototype.update.call(this);
    if(this.sprite.world.inWorld == false){
        this.active = false;
    }
}



