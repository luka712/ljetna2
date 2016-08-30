function Bar(game, barPositionX, barPositionY, barWidth, barHeight) {
    BaseGameObject.call(this, game);

    // http://phaser.io/docs/2.4.4/Phaser.GameObjectCreator.html#bitmapData
    this.tooltip = game.make.bitmapData(barWidth, barHeight);
    this.sprite = game.add.sprite(barPositionX,barPositionY, this.tooltip);
    
}

Bar.prototype = Object.create(BaseGameObject.prototype);

// STEP 17. Create setBarColor method and use fill method to set tooltip color.
//http://phaser.io/docs/2.3.0/Phaser.BitmapData.html#fill

// STEP 18. Create setBarPosition method and modify sprite position inside method.

// STEP 19. Create setBarWidth method and modify sprite width iniside method. Create another one called setBarHeight.