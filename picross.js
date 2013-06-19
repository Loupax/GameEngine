(function(window){

	var grid_width  = 20;
	var grid 		= new Grid(grid_width, grid_width);
	var block_size  = Math.floor(window.parseInt(G.getStage().width, 10) / grid_width);
	
	var grid_state  = grid.getGridState();
	var out_grid    = [];

	for(var i = 0; i < grid_state.length; i++)
		for(var j = 0; j< grid_state[i].length; j++)
		{
			grid_state[i][j].width = block_size;
			grid_state[i][j].height = block_size;
			grid_state[i][j].x = i * block_size;
			grid_state[i][j].y = j * block_size;
			grid_state[i][j]['background-color'] = '#'+((1<<24)*(Math.random()+1)|0).toString(16).substr(1);
		}

	var grid_blocks = G.Graphic.create(grid_state);	
	G.add(grid_blocks);

	var mouse_is_down = false;
	var offset = {x: -1, y:-1};
	var draggable = {};
	var clickHandler = function(event){
		mouse_is_down = false;
	};

	var mousedownHandler = function(event){
		mouse_is_down = true;
		draggable = this;
		// Put the currently dragged element at the end of the drawing buffer
		G.Utils.Array.move.call(G.getObjects(), G.getObjects().indexOf(draggable), G.getObjects().length);
		G.Utils.Array.reIndex.call(G.getObjects());
	};

	var mousemoveHandler = function(event){
		if(mouse_is_down)
		{
			draggable.x = event.clientX - (draggable.width / 2);
			draggable.y = event.clientY - (draggable.height / 2);
		}
	};
	
	//G.Events.addEventListener('mousemove click', grid_blocks);
	for(var i = 0; i < grid_blocks.length; i++)
	{
		for(var j = 0; j < grid_blocks[i].length; j++)
		{
			G.Events.addEventListener('mousedown', grid_blocks[i][j], mousedownHandler);			
			G.Events.addEventListener('mousemove', grid_blocks[i][j], mousemoveHandler);
			G.Events.addEventListener('click', grid_blocks[i][j], clickHandler);
		}
	}
	/*G.Events.addEventListener('mousemove click', grid_blocks[0][0], alertOfClick);
	G.Events.addEventListener('mousemove click', grid_blocks[0][1], alertOfClick);
	G.Events.addEventListener('mousemove click', grid_blocks[0][2], alertOfClick);
	G.Events.addEventListener('mousemove click', grid_blocks[1][0], alertOfClick);
	G.Events.addEventListener('mousemove click', grid_blocks[1][1], alertOfClick);
	G.Events.addEventListener('mousemove click', grid_blocks[1][2], alertOfClick);*/

	G.start();
})(window, undefined);