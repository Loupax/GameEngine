define(['G'], function(G){
	var Camera = function(){
		var width =  G.getStage().width;
		var height =  G.getStage().height;

		this.scaleX = 1;
		this.scaleY = 1;

		this.offsetTop = height / 2;
		this.offsetLeft = width / 2;

		this.position = {x: 0,y: 0};

		this.follow;

		Object.defineProperty(this, 'width', {
			  enumerable: false
			, configurable: true
			, get: function(){return width;}
			, set: function(val){
				width = val;
				this.scaleX = width / G.getStage().width;
			}
		});

		Object.defineProperty(this, 'height', {
			  enumerable: false
			, configurable: true
			, get: function(){return height;}
			, set: function(val){
				height = val;
				this.scaleY = height / G.getStage().height;
			}
		});
	};

	Camera.prototype.init = function(options){
		var self = this;

		for(var i in options)
		{
			if(options.hasOwnProperty(i))
			{
				this[i] = options[i];
			}
		}

		G.addPreDrawHandler(function(ctx){
			// Before drawing
			ctx.save();
			ctx.scale(self.scaleX, self.scaleY);
			if(!!self.follow)
			{
				self.position.x = -self.follow.x + self.offsetLeft - (self.follow.width / 2);
				self.position.y = -self.follow.y + self.offsetTop  - (self.follow.height / 2);
				
				ctx.translate(
						self.position.x,
						self.position.y
				);
			}

		});

		G.addPostDrawHandler(function(ctx){
			// After drawing
			ctx.restore();
		});
	};

	Camera.prototype.toWorld = function(point){
		return {
			x: (point.x / this.scaleX) + this.position.x,
			y: (point.y / this.scaleY) + this.position.y
		};	
    //{ x: (point.x / @scale) + @x, y: (point.y / @scale) + @y }
	};

	return new Camera();
});