define(['G', 'Point'], function(G, Point){
	var Camera = function(){
		
		/**
		 * The width of the stage
		 */
		var width =  G.getStage().width;


		/**
		 * The height of the stage
		 */
		var height =  G.getStage().height;


		/**
		 * Only one camera instance can be live at any time, and it's returned by this module.
		 * The initialize method of the object needs to know if the camera is already initialized
		 * so we keep track of it here
		 */
		this.is_initialized = false;

		/**
		 * The scale of the world.
		 */
		this.scale    = new Point(1,1);

		
		/**
		 * The distance the camera will keep from the left and top  borders of the stage
		 */
		this.offset   = new Point(width / 2, height / 2);

		
		/**
		 * Position of the camera in the world
		 */
		this.position = new Point(0,0);


		/**
		 * The Graphic object the camera is supposed to follow
		 * The provided object needs to have the following properties:
	     * x(Number), y(Number), width(Number), height(Number)
	     *
	     * If no follow object is provided, the camera simply zooms the scene
	     * at the provided position
		 */
		this.follow;


		/**
		 * Setting the width of the camera, automatically adjusts the scale levels
		 * of the camera
		 */
		Object.defineProperty(this, 'width', {
			  enumerable: false
			, configurable: true
			, get: function(){return width;}
			, set: function(val){
				width = val;
				this.scale.x = width / G.getStage().width;
			}
		});


		/**
		 * Setting the height of the camera automatically adjusts the scale levels
		 * of the camera
		 */
		Object.defineProperty(this, 'height', {
			  enumerable: false
			, configurable: true
			, get: function(){return height;}
			, set: function(val){
				height = val;
				this.scale.y = height / G.getStage().height;
			}
		});
	};

	/**
	 * Initializes the camera system
	 */
	Camera.prototype.init = function(options){
		// Don't initialize the camera twice
		if(this.is_initialized)
		{
			console.warn('The camera is already initialized!');
			return;
		}

		var self = this;
		
		// Add extra properties and methods to the camera object
		for(var i in options)
		{
			if(options.hasOwnProperty(i))
			{
				this[i] = options[i];
			}
		}


		
		// Scale everything that is going to be drawn to the stage according to the scale settings
		// of the camera
		G.addPreDrawHandler(function(ctx){
			ctx.scale(self.scale.x, self.scale.y);
			if(!!self.follow)
			{
				self.position.x = -self.follow.x + self.offset.x - (self.follow.width / 2);
				self.position.y = -self.follow.y + self.offset.y  - (self.follow.height / 2);
				
				ctx.translate(
						self.position.x,
						self.position.y
				);
			}
		});
	};


	/**
	 * Translates the position of the stage-point provided to game-world coordinates
 	 */
	Camera.prototype.convertStageToWorldCoords = function(point){
		var worldCoords = new Point((point.x / this.scale.x) - this.offset.x, (point.y / this.scale.y) - this.offset.y);

		if(!!this.follow)
		{
			worldCoords.x += this.follow.x + ((this.follow.width * this.scale.x) / 2);
			worldCoords.y += this.follow.y + ((this.follow.height * this.scale.y) / 2);	
		}		
		return worldCoords;
	};

	return new Camera();
});