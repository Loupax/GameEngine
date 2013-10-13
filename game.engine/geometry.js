(function(window, G, undefined){
	var Geometry = {
		Point: function(x, y){
			this.x = x;
			this.y = y;

			return this;
		},
		Rectangle: function(top, right, bottom, left){
			this.top 	= top 		|| 0;
			this.right	= right  	|| 0;
			this.bottom = bottom 	|| 0;
			this.left 	= left 		|| 0;
			
			this.setFromGraphic = function(graphic){
				this.top = graphic.y;
				this.right = graphic.x + graphic.width;
				this.bottom = graphic.y + graphic.height;
				this.left = graphic.x;
				
				return this;
			};

			return this;
		},
		pointIsInRectangle: function(point, rectangle){
			if((point.x > rectangle.right) || (point.x < rectangle.left))
			{
				return false;
			}

			if((point.y > rectangle.bottom) || (point.y < rectangle.top))
			{
				return false;
			}
			
			return true;
		}
	};

	G.Geometry = Geometry;
})(window, G);