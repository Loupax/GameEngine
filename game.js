require.config({
    paths: {
        G: 	     'game.engine/game',
        Graphic: 'game.engine/graphic',
        Camera:  'game.engine/camera', 
        Collisions: 'game.engine/collisions',
        Geometry: 'game.engine/geometry',
    }
});

requirejs(['G', 'Graphic', 'Camera', 'Collisions', 'game/hero.js'], 
function(G, Graphic, Camera, Collisions, hero){
	var floor = new Graphic({
		x:0,
		y:400,
		width: 1000,
		height: 1000,
		'background-color': '#ffff00'
	});
	
	hero.x = 0;
	hero.y = 300;
	Camera.init({
		follow: hero,
		offsetTop: 768,
		offsetLeft: 1024,
		width: 600,
		height: 600
	});
	Collisions.onCollide(hero, floor, function(){
		hero['background-color'] = '#000000';
	});
	G.add([floor, hero]);
	G.start();
});

/*(function(window){
	
})(window, undefined);*/