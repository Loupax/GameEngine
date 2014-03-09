define(['G', 'U'],function(G, U){
	var Grid = function(o){
		this.width  = o.width || 1;
		this.height = o.height || 1;
		this.tile_width  = o.tile_width || 100;
		this.tile_height = o.tile_height || 100;
		this.z_step		 = o.z_step	|| 1;

		var objects = [];

		this.grid = {};
		var max_height = 10;
		
		/**
		 * Returns the tile that the provided point occupies
		 */
		this.getTile = function(point){
			var tile_x = Math.floor(point.x / this.tile_width);
			var tile_y = Math.floor(point.y / this.tile_height);
			
			if(this.grid[tile_x] && (this.grid[tile_x][tile_y] !== undefined))
			{
				return this.grid[tile_x][tile_y];	
			}
			else
			{
				return null;
			}
		};

		/**
		 *	Returns the word coordinates of the tile that the provided
		 *  point is inside
		 */
		this.getTileCoordinates = function(point){
			var tile_x = Math.floor(point.x / this.tile_width);
			var tile_y = Math.floor(point.y / this.tile_height);
			return {x: tile_x * this.tile_width, y: tile_y * this.tile_height};
		};

		/**
		 * Adds a game object to the grid object
		 * That way you can easily access a tile
		 * by it's tile coordinates.
		 */
		this.addTile = function(point){
			var result = [];
			if(U.isArray(point)){
				var that = this;
				point.forEach(function(val){
					that.addTile(val);
				});
			}
			else{
				var x = Math.floor(point.x / this.tile_width);
				var y = Math.floor(point.y / this.tile_height);
				point.width = this.tile_width;
				point.height= this.tile_height;
				
				if((x in this.grid) && (y in this.grid[x])){
					// The tile already exists
					return false;
				}
				else{
					this.grid[x] 	= this.grid[x] || {};
					this.grid[x][y] = point;
					objects.push(point);
					return true;
				}
			}
		}

		this.getObjects = function(){
			return objects;
		};
		
	};

	/**
	 * Returns a barebones object representation of the grid (useful for saving the grid to a text file)
	 */
	Grid.prototype.getObjectsInGrid = function(){
		var result = [], x, y;
		for(x in this.grid){
			for(y in this.grid[x]){
				result.push({x: x, y: y,'background-color': this.grid[x][y]['background-color'], objectType: this.grid[x][y].className||'Graphic'});
			}
		}		
		return result;
	};

	return Grid;
});