//@requires game.engine/geometry.js
(function(G, undefined){
	"use strict";
	
	// Convert the provided object to a game object and return it
	var Graphic = function(opts){
		this.x 	     =  0;
		this.y 		 =  0;
		this.width   =  0;
		this.height  =  0;
		this.texture =  null;
		this['background-color'] =  'transparent';
		
		//Mix the graphic with the provided object
		for(var prop in opts)
		{
			this[prop] = opts[prop];
		}
	}

	
	Graphic.prototype.draw    =  function(ctx){
		// If no texture is loaded, draw the objects rectangle
		if(this.texture === null){
			ctx.beginPath();
		    ctx.fillStyle = this['background-color'];
		    ctx.rect(this.x, this.y, this.width, this.height);
		    ctx.fill();
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = 'black';
		    ctx.stroke();

		}
	};

	Graphic.prototype.getRectangle = function(){
		// This will cause a huge issue with the garbage collector... Consider to keep the rectangle as
		// an object property so no new objects get created in the game loop
		return new G.Geometry.Rectangle(this.y, this.x + this.width, this.y + this.height, this.x);
	};

	G.Graphic = Graphic;
})(G);
