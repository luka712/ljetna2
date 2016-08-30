function BaseGameObject(game, sprite) {


    this.game = game;
    this.active = true;
    this.sprite = sprite;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    this.sprite.object = this;
}

BaseGameObject.prototype = {
    update: function () {

    }
}