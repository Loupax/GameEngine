define(['G', 'game/hero_camera'],function(G, camera){
	var GroundGrid = function(o){
		var that = this;
		this.width  = o.width || 1;
		this.height = o.height || 1;
		this.tile_width  = o.tile_width || 100;
		this.tile_height = o.tile_height || 100;
		this.z_step		 = o.z_step	|| 1;

		this.grid = {};
		var max_height = 1;

		this.randomizeGrid = function(){
			var states = [1,2,3], x, y;

			for(x = 0; x < this.width; x++)
			{
				for(y = 0; y < this.width; y++)
				{
					this.grid[x] = this.grid[x] || {};
					this.grid[x][y] = this.grid[x][y] || 5;

					// What should we do? We either raise the ground, lower it or keep it here
					shuffle(states);

					switch(states[0]){
						case 1:
						// Raise the ground
						this.grid[x][y] += this.z_step;
						break;
						case 2:
						// Lower the ground
						this.grid[x][y] -= this.z_step;
						case 3:
						// Keep it like it is						
						default:
					}

					if(this.grid[x][y] < 0)
					{
						this.grid[x][y] = 0;
					}

					max_height = (max_height > this.grid[x][y])?max_height:this.grid[x][y];
				}
			}
			

		};


		this.updateGrid = function(){
			var x,y;
			for(x = 0; x < this.width; x++){
				for(y = 0; y < this.height; y++){
					this.grid[x]	= this.grid[x]	  || {};
					this.grid[x][y] = this.grid[x][y] || 0;

					max_height = (max_height > this.grid[x][y])?max_height:this.grid[x][y];
				}
			}
		};

		this.getTileHeight = function(point){
			//screenx = gridx * grid_width

			//gridx = grid_width / screenx

			var tile_x = Math.floor(point.x / that.tile_width  );
			var tile_y = Math.floor( point.y /that.tile_height  );
			
			if(that.grid[tile_x] && that.grid[tile_x][tile_y])
			{
				return that.grid[tile_x][tile_y];	
			}
			else
			{
				return Infinity;
			}
		};
		

		var stage = G.getStage();
		var ctx   = stage.getContext('2d');
		
		var rainbow = function(numOfSteps, step) {
		    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
		    // Adam Cole, 2011-Sept-14
		    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
		    var r, g, b;
		    var h = step / numOfSteps;
		    var i = ~~(h * 6);
		    var f = h * 6 - i;
		    var q = 1 - f;
		    switch(i % 6){
		        case 0: r = 1, g = f, b = 0; break;
		        case 1: r = q, g = 1, b = 0; break;
		        case 2: r = 0, g = 1, b = f; break;
		        case 3: r = 0, g = q, b = 1; break;
		        case 4: r = f, g = 0, b = 1; break;
		        case 5: r = 1, g = 0, b = q; break;
		    }
		    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
		    return (c);
		};

		var shuffle = function(array){
			var counter = array.length, temp, index;

		    // While there are elements in the array
		    while (counter > 0) {
		        // Pick a random index
		        index = Math.floor(Math.random() * counter);

		        // Decrease counter by 1
		        counter--;

		        // And swap the last element with it
		        temp = array[counter];
		        array[counter] = array[index];
		        array[index] = temp;
		    }

		    return array;
		}
		
		G.addPreDrawHandler(function(){			
			var x,y;
			
			for(x = 0; x < that.width; x++)
			{
				for(y = 0; y < that.height; y++){

					ctx.fillStyle = rainbow(max_height, that.grid[x][y]);
					

					ctx.fillRect(x * that.tile_width, y * that.tile_height, that.tile_width, that.tile_height);					

					ctx.font = "bold 12px sans-serif";
					ctx.fillStyle = '#000';
					ctx.fillText(that.grid[x][y], (x * that.tile_width) + 10, (y * that.tile_height) + 10);
				}
			}		
		});
	};

	return GroundGrid;
});