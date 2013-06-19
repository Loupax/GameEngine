(function(window, G, undefined){
	var Geometry = {
		Point: function(x, y){
			this.x = x;
			this.y = y;

			return this;
		},
		Rectangle: function(top, right, bottom, left){
			this.top = top;
			this.right = right;
			this.bottom = bottom;
			this.left = left;

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