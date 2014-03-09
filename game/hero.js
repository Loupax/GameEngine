define(['G', 'Graphic', 'game.engine/keys.js', 'Vector', 'Collisions'],function(G, Graphic, Keyboard, Vector, Collisions){
	var Hero = new Graphic({
		x: 0,
		y: 300,
		width: 100,
		height: 100,
		weight: 20,
		is_falling: true,
		is_jumping: false,
		velocity: new Vector(0, 0),
		'background-color': '#ff0000',
		update: function(){
			var speed = 20;
			this.bottom_rect = {x: this.x, y: this.y + this.height};
			if(Keyboard.keys.A){
				this.velocity.x = -speed;
			}
						
			if(Keyboard.keys.D){
				this.velocity.x = speed;
			}

			if(!(Keyboard.keys.A || Keyboard.keys.D)){
				this.velocity.x = 0;
			}

			if(Keyboard.keys.W){
				this.velocity.y = -speed;
				this.is_jumping = true;
			}
			else{
				this.is_jumping = false;
			}
			
			if(this.is_falling){
				this.velocity.y = this.weight;	
			}

			this.y += this.velocity.y;
			this.x += this.velocity.x;
			
			
			// Handle collisions with the worlds blocks
			var collides_with_floor = false
			for(var i = 0; i < this.grid.getObjects().length; i++)
			{
				if(Collisions.collides(this, this.grid.getObjects()[i]))
				{
					collides_with_floor = true;
					break;
				}
			}

			if(collides_with_floor && !this.is_jumping){
				this.is_falling = false;
				this.velocity.y = 0;
			}
			else{
				this.is_falling = !this.is_jumping;	
			}
		}
	}); 
	

	return Hero;
});