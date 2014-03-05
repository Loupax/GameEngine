define(['Graphic', 'Geometry', 'G'], function(Graphic, Geometry, G){
	var Bullet = function(){
		Graphic.apply(this, arguments);
		this.center_point = {x: this.x + this.width / 2, y: this.y + this.height / 2 };
		
		if(arguments[0]['update'] === undefined){
			var angle = arguments[0].angle;
			var speed = arguments[0].speed;
			
			this.update = function(){

				this.center_point.x = this.x + (this.width / 2);
				this.center_point.y = this.y + (this.height / 2);
			    var x = this.x + (Math.cos(angle) * speed);  
			    var y = this.y + (Math.sin(angle) * speed);  
			    this.x = x;
			    this.y = y;

			    if(!!this.grid && !!this.z_height)
			    {
			    	
			    	if(this.grid.getTileHeight(this.center_point) > this.z_height)
			    	{
			    		this.dead = true;
			    	}
			    	
			    }
			};
		}
	};
	
	return Bullet;
});