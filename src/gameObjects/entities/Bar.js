function Bar(game, barPositionX, barPositionY, barWidth, barHeight) {
    // http://phaser.io/docs/2.4.4/Phaser.GameObjectCreator.html#bitmapData
    this.tooltip = game.make.bitmapData(barWidth, barHeight);
    this.sprite = game.add.sprite(barPositionX,barPositionY, this.tooltip);
	
	BaseGameObject.call( this, game, this.sprite);
    
}

Bar.prototype = Object.create(BaseGameObject.prototype);

// STEP 17. Create setBarColor method and use fill method to set tooltip color.
//http://phaser.io/docs/2.3.0/Phaser.BitmapData.html#fill
Bar.prototype.setBarColor = function(r,g,b){
	this.tooltip.fill(r,g,b);
}

// STEP 18. Create setBarPosition method and modify sprite position inside method.
Bar.prototype.setBarPosition = function(x,y){
	if(x){
		this.sprite.position.x = x;
	}
	
	if(y){
		this.sprite.position.y = y;
	}
}

// STEP 19. Create setBarWidth method and modify sprite width iniside method. Create another one called setBarHeight.
Bar.prototype.setBarWidth = function(width){
	this.sprite.width = width;
}

Bar.prototype.setBarHeight = function(height){
	this.sprite.height = height;
}