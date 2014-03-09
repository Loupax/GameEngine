define(['G', 'U'], function(G, U){
	
	var Collisions = {
		
		/**
		 * Adds an event listener that should be executed when the the provided GraphicObjects collide with each other
		 */
		onCollide: function(object1, object2, callback){
			var i;
			if(U.isArray(object1))
			{	
				for(i = 0; i < object1.length; i++){
					Collisions.onCollide(object1[i], object2, callback);

				}
				return;
			}

			if(U.isArray(object2))
			{
				for(i = 0; i < object2.length; i++){
					Collisions.onCollide(object1, object2[i], callback);
				}
				return;
			}			

			var rect1 = object1.getRectangle();
			var rect2 = object2.getRectangle();
			G.addPostUpdateHandler(function(){
				if (rect1.left < rect2.right && rect1.right  > rect2.left &&
					rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
					callback(object1, object2);
					return true;
				}
				else{
					return false;
				}				
			});
		},
		collides: function(object1, object2){
			var rect1 = object1.getRectangle();
			var rect2 = object2.getRectangle();
			
			if (rect1.left < rect2.right && rect1.right  > rect2.left &&
				rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
				return true;
			}
			else{
				return false;
			}				
				
		}
	};

	return Collisions;
});