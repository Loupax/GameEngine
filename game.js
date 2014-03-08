require.config({
    paths: {
        G: 	     'game.engine/game',
        Graphic: 'game.engine/graphic',
        Camera:  'game.engine/camera',
        Collisions: 'game.engine/collisions',
        Geometry: 'game.engine/geometry',
        U: 'game.engine/utils',
        Point: 'game.engine/point',
    }
});

requirejs(['G', 'Graphic', 'Camera', 'Point' ,'Collisions', 'U','Geometry', 'game/hero', 'game/bullet', 'game/ground_grid'], 
function(G, Graphic, camera, Point, Collisions, U,Geometry, hero, Bullet, GroundGrid){
	
	hero.x = (1024/2) - hero.width / 2;
	hero.y = (768/2)  - hero.height / 2;
	
	
	camera.init({
		follow: hero,
		//offsetTop: 150,
		//offsetLeft: 50,
		width: 1024/2,
		height: 768/2
	});
	G.getStage().width  = camera.width;
	G.getStage().height = camera.height;

	var grid = new GroundGrid({
		width:  (1024 / hero.width),
		height: (768 / hero.height),
		tile_width: hero.width,
		tile_height: hero.height
	});
	grid.updateGrid();
	
	G.getStage().addEventListener('click', function(ev){
		var o  = camera.convertStageToWorldCoords(ev);
		
		var tile_x = ~~(o.x / grid.tile_width  );
		var tile_y = ~~(o.y / grid.tile_height );
		grid.addTile(new Point(tile_x, tile_y));
		
		var block = new Bullet({
			x: hero.x + hero.width / 2, 
			y: hero.y + hero.height /2, 
			width: 10, 
			height: 10, 
			'background-color': '#00ff00', 
			angle: Geometry.getAngleBetweenPoints({x: hero.x + hero.width / 2, y: hero.y + hero.height / 2 },
			{x: o.x - 5, y:o.y - 5}), 
			speed: 15,
			z_height: grid.getTileHeight({x: hero.x + hero.width / 2, y: hero.y + hero.height / 2 }),
			grid: grid,
		});
		G.add(block);
	});
	G.add([hero]);
	G.start();
});