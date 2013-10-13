//@requires game.engine/geometry.js
(function(G, undefined){
	"use strict";
	
	// Convert the provided object to a game object and return it
	var Graphic = function(opts){
		var self = this;
		
				
		var x 	     =  0;
		var y 		 =  0;
		var width   =  0;
		var height  =  0;
		this.texture =  null;
		this['background-color'] =  'transparent';
		this.bounding_box = new G.Geometry.Rectangle();		
				
		Object.defineProperty(this, 'x', {
			  enumerable: false
			, configurable: true
			, get: function(){return x;}
			, set: function(val){
				x = val;
				this.bounding_box.setFromGraphic(this);
			}
		});
		
		Object.defineProperty(this, 'y', {
			  enumerable: false
			, configurable: true
			, get: function(){return y;}
			, set: function(val){
				y = val;
				this.bounding_box.setFromGraphic(this);
			}
		});
		
		Object.defineProperty(this, 'width', {
			  enumerable: false
			, configurable: true
			, get: function(){return width;}
			, set: function(val){
				width = val;
				this.bounding_box.setFromGraphic(this);
			}
		});
		
		Object.defineProperty(this, 'height', {
			  enumerable: false
			, configurable: true
			, get: function(){return height;}
			, set: function(val){
				height = val;
				this.bounding_box.setFromGraphic(this);
			}
		});
		
		// Mix the graphic with the provided object
		for(var prop in opts)
		{
			this[prop] = opts[prop];
		}
	};
	
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
		return this.bounding_box;
	};

	G.Graphic = Graphic;
})(G);
