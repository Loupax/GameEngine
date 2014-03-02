define(['Graphic', 'Geometry', 'G'], function(Graphic, Geometry, G){
	var Bullet = function(){
		Graphic.apply(this, arguments);

		if(arguments[0]['update'] === undefined){
			var angle = arguments[0].angle;
			var speed = arguments[0].speed;
			this.update = function(){
			    var x = this.x + (Math.cos(angle) * speed);  
			    var y = this.y + (Math.sin(angle) * speed);  
			    this.x = x;
			    this.y = y;  
			};
		}
	};
	
	return Bullet;
});