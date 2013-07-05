(function(window){
	var grid_width  = 20;
	var grid 		= new Grid(grid_width, grid_width);
	// We want the grid to cover the one third of the canvas
	var block_size  = 20;
	var grid_state  = grid.getGridState();
	var out_grid    = [];


	var grid_padding = {
		top: (grid_width * block_size) / 2 - block_size, 
		left: (grid_width * block_size) / 2 - block_size
	};

	G.initializeGrid(grid_state, block_size, grid_padding);
	G.initializeInfoGrid(grid_state, block_size, grid_padding);
	
	G.start();
})(window, undefined);