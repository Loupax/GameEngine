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
				var Graphic = function(){
					this.x 	     =  0;
					this.y 		 =  0;
					this.width   =  0;
					this.height  =  0;
					this.texture =  null;
					this['background-color'] =  'transparent';

					this.draw    =  function(ctx){
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

				var new_graphic = new Graphic();

				//Mix the graphic with the provided object
				for(var prop in opts)
				{
					new_graphic[prop] = opts[prop];
				}

				return  new_graphic;
			}
		}
	};

	win.G.Graphic = Graphic;
})(window, document);