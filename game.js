(function(window){
	var floor = new G.Graphic({
		x:0,
		y:400,
		width: 1000,
		height: 1000,
		'background-color': '#ffff00'
	});
	
	var hero = new G.Graphic({
		x: 0,
		y: 300,
		width: 100,
		height: 100,
		'background-color': '#ff0000',
		update: function(){
			if(G.Keyboard.keys.A){
				hero.x -=10;
			}
			
			if(G.Keyboard.keys.D){
				hero.x += 10;
			}
		}
	});
	
	G.add([floor, hero]);
	G.start();
})(window, undefined);