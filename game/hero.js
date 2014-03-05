define(['game.engine/game.js', 'game.engine/graphic.js', 'game.engine/keys.js'],function(G, Graphic, Keyboard){
	var Hero = new Graphic({
		x: 0,
		y: 300,
		width: 100,
		height: 100,
		'background-color': '#ff0000',
		update: function(){
			if(Keyboard.keys.A){
				Hero.x -=10;
			}
			
			if(Keyboard.keys.D){
				Hero.x += 10;
			}

			if(Keyboard.keys.W){
				Hero.y -= 10;
			}

			if(Keyboard.keys.S){
				Hero.y += 10;
			}
			Hero['background-color'] = '#ff0000';
		}
	}); 

	return Hero;
});