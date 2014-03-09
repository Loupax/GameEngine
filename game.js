require.config({
    paths: {
        G: 	     'game.engine/game',
        Graphic: 'game.engine/graphic',
        Grid: 	 'game.engine/grid',
        Camera:  'game.engine/camera',
        Collisions: 'game.engine/collisions',
        Geometry: 'game.engine/geometry',
        U: 'game.engine/utils',
        Point: 'game.engine/point',
        Vector: 'game.engine/vector'
    }
});

requirejs(['G', 'Graphic', 'Camera', 'Point' ,'Collisions', 'U','Geometry', 'game/hero', 'game/bullet', 'Grid', 'game/stages/stage'], 
function(G, Graphic, camera, Point, Collisions, U,Geometry, hero, Bullet, Grid, stage){
	
	
	camera.init({
		follow: hero,
		offset: new Point(G.getStage().width/2, G.getStage().height/2),
		width:  ~~(1024/2),
		height: ~~(768/2)
	});

	G.getStage().width  = camera.width;
	G.getStage().height = camera.height;

	var grid = new Grid({
		width:  ~~(1024 / 25),
		height: ~~(768 / 25),
		tile_width:  25,
		tile_height: 25
	});

	stage.forEach(function(obj){
		var o = eval('new '+obj.objectType+'(obj)');
		o.x = o.x * grid.tile_width;
		o.y = o.y * grid.tile_height;
		grid.addTile(o);
		G.prepend(o);
	});
	hero.x = 0;
	hero.y = 0;
	hero.grid = grid;	
	
	G.getStage().addEventListener('click', function(ev){
		var o  = camera.convertStageToWorldCoords(U.Mouse.mousePositionOnCanvas(ev));
		var object = new Graphic({
			x: o.x, 
			y: o.y,
			//width: 25,
			//height: 25,
			'background-color': '#a00'
		});
		if(grid.addTile(object)){
			var tileCoords = grid.getTileCoordinates(object);
			object.x = tileCoords.x;
			object.y = tileCoords.y;
			G.prepend(object);
			
		}
		document.querySelector('#debug').innerHTML = JSON.stringify(grid.getObjectsInGrid());
	});
	G.add([hero]);
	G.start();
});