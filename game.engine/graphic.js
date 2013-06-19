//@requires game.engine/geometry.js
(function(window, document, undefined){
	"use strict";

	var win = window,
		doc = document;
	var Graphic = {
		create: function(opts){
			// If the opts object is an array, add all of it's children as graphics

			if(opts instanceof Array)
			{
				var output = [];
				for(var i = 0; i < opts.length; i++)
					output.push(this.create(opts[i]));
				return output;
			}
			else
			{
				// Convert the provided object to a game object and return it
				var Graphic = function(opts){
					this.x 	     = opts.x       || 0;
					this.y 		 = opts.y       || 0;
					this.width   = opts.width   || 0;
					this.height  = opts.height  || 0;
					this.texture = opts.texture || null;
					this['background-color'] = opts['background-color'] || 'transparent';

					this.draw    = opts.draw    || function(ctx){
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
						return new G.Geometry.Rectangle(this.y, this.x + this.width, this.y + this.height, this.x);
					};
				}

				for(var prop in opts)
				{
					Graphic[prop] = opts[prop];
				}
				return new Graphic(opts);
			}
		}
	};

	win.G.Graphic = Graphic;
})(window, document);