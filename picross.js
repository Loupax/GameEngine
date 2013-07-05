(function(window){
	var grid_width  = 20;
	var grid 		= new Grid(grid_width, grid_width);
	// We want the grid to cover the one third of the canvas
	var block_size  = Math.floor(window.parseInt(G.getStage().width, 10) / grid_width) / 2;
	
	var grid_state  = grid.getGridState();
	var out_grid    = [];

	for(var i = 0; i < grid_state.length; i++)
		for(var j = 0; j< grid_state[i].length; j++)
		{
			grid_state[i][j].width = block_size;
			grid_state[i][j].height = block_size;
			grid_state[i][j].x = i * block_size;
			grid_state[i][j].y = j * block_size;
			grid_state[i][j]['background-color'] = '#ddd';
		}

	var grid_blocks = G.Graphic.create(grid_state);	
	G.add(grid_blocks);
	
	var draggable = {};
	var clickHandler = function(event){
		this.cycleStatus();
		switch(this.getStatus())
		{
			case 'carved':
			this['background-color'] = '#000';
			break;
			case 'flagged':
			this['background-color'] = '#f00';
			break;
			case 'empty':
			this['background-color'] = '#ddd';
			break;
			default:
				console.error('Non proper tile status');
				break;
		}
	};

		
	//G.Events.addEventListener('mousemove click', grid_blocks);
	for(var i = 0; i < grid_blocks.length; i++)
	{
		for(var j = 0; j < grid_blocks[i].length; j++)
		{
			G.Events.addEventListener('click', grid_blocks[i][j], clickHandler);
		}
	}
	

	G.start();
})(window, undefined);