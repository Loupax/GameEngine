function Block(status){
	var CARVED = 'carved', EMPTY = 'empty', FLAGGED = 'flagged';
	this.Statuses = [EMPTY, CARVED, FLAGGED];

	this.getStatus = function(){
		return status;
	};

	this.cycleStatus = function(){
		var current_status_index = this.Statuses.indexOf(status);
		if((current_status_index < 0) || (++current_status_index >= this.Statuses.length)){
			status = EMPTY;
		}
		else{
			status = this.Statuses[current_status_index];
		}
	};

	this.setStatus = function(_status){
		status = _status;
	};
}

function Grid(width, height){
	// This array will contain the state of the actual grid of the specific puzzle
	var grid 	  = [],
	// This array will contain the state of the grid that is currently getting displayed (after any user input)
		user_grid = [];

	// The possible states each flag can have
	var CARVED = 'carved', EMPTY = 'empty', FLAGGED = 'flagged';

	this.blockStates = function(){
		return [CARVED, EMPTY, FLAGGED];
	};

	// If only one argument is passed to the constructor, and if that argument is an array, handle it as 
	// a grid template
	if((arguments.length === 1) && (arguments[0].length > 0)){
		height = arguments[0].length;
		width  = arguments[0][0].length;
		grid   = arguments[0];
	}

	// Returns the target state the grid should have
	this.getBlocks = function(){
		return grid;
	};

	// Returns the state of the visible grid (after user input has modified it)
	this.getGridState = function(){
		return user_grid;
	};
	
	for(var i = 0; i < height; i++){
		user_grid[i] = user_grid[i] || [];
		for(var j = 0; j < width; j++){
			user_grid[i].push(new Block(EMPTY));
		}
	}

	if(grid.length === 0)
	{
		for(var i = 0; i < height; i++){
			grid[i] = grid[i] || [];
			for(var j = 0; j < width; j++){
				grid[i].push(new Block(EMPTY));
			}
		}
	}

}

(function(G){

	G.initializeInfoGrid = function(grid_state, block_size, grid_padding){
		// Create all the rows of the info grid
		
		var row = {}, 
			stage_width = G.getStage().width
			stage_height = block_size;
		
		for(var i = 0; i < grid_state.length; i++)
		{
			row.margin = {top: 12, left: 0};
			row.x = 0;
			row.text = 'Row #'+(i+1)
			row.y = i * block_size + grid_padding.top;
			row.width = stage_width - grid_padding.left;
			row.height = block_size;
			
			G.add(new G.Graphic.Text(row));
		}

		for(var i = 0; i < grid_state.length; i++)
		{
			row.margin = {top: 12, left: 0};
			row.text = 'Column #'+(i+1);
			row.x = i * block_size + grid_padding.left;
			row.y = 0;
			row.width = block_size;
			row.height = stage_width - grid_padding.left;
			G.add(new G.Graphic.Text(row));
		}
	}

	G.initializeGrid = function(grid_state, block_size, grid_padding){
		var grid_blocks = [];
		for(var i = 0; i < grid_state.length; i++)
		for(var j = 0; j< grid_state[i].length; j++)
		{
			grid_state[i][j].width = block_size;
			grid_state[i][j].height = block_size;
			grid_state[i][j].x = (i * block_size) + grid_padding.left;
			grid_state[i][j].y = (j * block_size) + grid_padding.top;
			grid_state[i][j]['background-color'] = '#ddd';

			grid_blocks[i] = grid_blocks[i] || [];
			grid_blocks[i][j] = new G.Graphic(grid_state[i][j]);
		}
		
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
	};
})(G);