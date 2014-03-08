define(function(){
	var Geometry = {
		Point: function(x, y){
			this.x = x;
			this.y = y;

			return this;
		},
		Rectangle: function(left, top, width, height){
			this.left = left || 0;
			this.top = top || 0;
            this.width = width || 0;
			this.height = height || 0;
			this.right = this.left + this.width;
			this.bottom = this.top + this.height;

			return this;
		},
		getAngleBetweenPoints: function(pointa, pointb){
			return Math.atan2(pointb.y - pointa.y, pointb.x - pointa.x);
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

	
	Geometry.Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
		this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
	}
			
	Geometry.Rectangle.prototype.within = function(r) {
		return (r.left <= this.left && 
				r.right >= this.right &&
				r.top <= this.top && 
				r.bottom >= this.bottom);
	}		
			
	Geometry.Rectangle.prototype.overlaps = function(r) {
		return (this.left < r.right && 
				r.left < this.right && 
				this.top < r.bottom &&
				r.top < this.bottom);
	}

	Geometry.Rectangle.prototype.setFromGraphic = function(graphic){
		this.top = graphic.y;
		this.right = graphic.x + graphic.width;
		this.bottom = graphic.y + graphic.height;
		this.left = graphic.x;
		this.width = graphic.width;
		this.height = graphic.height;
		
		return this;
	};
	
	return Geometry;
});