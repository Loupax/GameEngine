//@requires game.engine/graphic.js
(function(Graphic){
"use strict";
	
	var Text = function(opts){		
		this.text = '';
		this.color = '#000';
		this['font-size'] = '10px';
		this['font-family'] = 'Calibri';
		this.margin = {top: 0, left: 0};		

		Graphic.call(this, opts);
	};

	Text.prototype = Object.create(Graphic.prototype);
	
	Text.prototype.draw = function(ctx){
		Graphic.prototype.draw.call(this, ctx);
		// Do the text specific stuff here...
		ctx.font = [this['font-size'], this['font-family']].join(' ');
      	ctx.fillStyle = this.color;
		ctx.fillText(
			this.text, 
			this.x + this.margin.left, 
			this.y + this.margin.top);
	};

	Graphic.Text = Text;
	
})(G.Graphic)