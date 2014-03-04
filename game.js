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

requirejs(['G', 'Graphic', 'Camera', 'Collisions', 'U','Geometry', 'game/hero', 'game/bullet', 'game/ground_grid'], 
function(G, Graphic, Camera, Collisions, U,Geometry, hero, Bullet, GroundGrid){
	
	hero.x = (1024/2) - hero.width / 2;
	hero.y = (768/2)  - hero.height / 2;
	/*Camera.init({
		follow: hero,
		offsetTop: 768,
		offsetLeft: 1024,
		width: 600,
		height: 600
	});*/
	var grid = new GroundGrid({
		width: 1024 / hero.width,
		height: 768 / hero.height,
		tile_width: hero.width,
		tile_height: hero.height
	});
	grid.randomizeGrid();
	
	G.getStage().addEventListener('click', function(ev){
		var o = U.Mouse.mousePositionOnCanvas(ev);
		var block = new Bullet({
			x: hero.x + hero.width / 2, 
			y: hero.y + hero.height/2, 
			width: 10, 
			height: 10, 
			'background-color': '#00ff00', 
			angle: Geometry.getAngleBetweenPoints({x: hero.x + hero.width / 2, y: hero.y + hero.height / 2 },
			{x: o.x - 5, y:o.y - 5}), 
			speed: 15,
			z_height: grid.getTileHeight(hero)
		});

		G.add(block);
	});
	G.add([hero]);
	G.start();
});

/*(function(window){
	
})(window, undefined);*/