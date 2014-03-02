define(['Graphic', 'Geometry', 'G'], function(Graphic, Geometry, G){
	var Bullet = function(){
		Graphic.apply(this, arguments);

		if(arguments[0]['update'] === undefined){
			this.update = function(){
				
			};
		}
	};
	
	return Bullet;
});