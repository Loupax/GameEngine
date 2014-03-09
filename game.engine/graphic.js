//@requires game.engine/geometry.js
define(['G', 'Geometry'], function(G, Geometry){
	"use strict";
	
	// Convert the provided object to a game object and return it
	var Graphic = function(opts){
		var self = this;
				
		var x 	    =  0;
		var y 		=  0;
		var width   =  0;
		var height  =  0;
		this.blur   = false;
		this.texture =  null;
		this.dead	 = false;
		this['background-color'] =  'transparent';
		this.bounding_box = new Geometry.Rectangle();		
				
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

		this.update = function(){};
		this.draw    =  function(ctx){
			if(this.dead === false){
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
			}
		};

		this.getRectangle = function(){
			return this.bounding_box;
		};
		
		// Mix the graphic with the provided object
		for(var prop in opts)
		{
			this[prop] = opts[prop];
		}
	};

	return Graphic;
});
