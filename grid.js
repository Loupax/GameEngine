function Block(status){
	var CARVED = 'carved', EMPTY = 'empty', FLAGGED = 'flagged';
	this.Statuses = [CARVED, EMPTY, FLAGGED];

	this.getStatus = function(){
		return status;
	}

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