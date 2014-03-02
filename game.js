require.config({
    paths: {
        G: 	     'game.engine/game',
        Graphic: 'game.engine/graphic',
        Camera:  'game.engine/camera', 
        Collisions: 'game.engine/collisions',
        Geometry: 'game.engine/geometry',
        U: 'game.engine/utils',
    }
});

requirejs(['G', 'Graphic', 'Camera', 'Collisions', 'U','Geometry', 'game/hero', 'game/bullet'], 
function(G, Graphic, Camera, Collisions, U,Geometry, hero, Bullet){
	var floor = new Graphic({
		x:0,
		y:400,
		width: 1000,
		height: 1000,
		'background-color': '#ffff00'
	});
	
	hero.x = 0;
	hero.y = 300;
	/*Camera.init({
		follow: hero,
		offsetTop: 768,
		offsetLeft: 1024,
		width: 600,
		height: 600
	});*/
	Collisions.onCollide(hero, floor, function(){
		hero['background-color'] = '#000000';
	});
	G.getStage().addEventListener('click', function(ev){
		var o = U.Mouse.mousePositionOnCanvas(ev);
		var block = new Bullet({
			x: o.x - 5, y: o.y - 5, width: 10, height: 10, 'background-color': '#ff0000'
		});

		G.add(block);
		console.log(G.getObjects(), block.x, block.y);
		console.log(Geometry.getAngleBetweenPoints(hero, block));
	});
	G.add([floor, hero]);
	G.start();
});

/*(function(window){
	
})(window, undefined);*/