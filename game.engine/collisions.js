define(['G'], function(G){
	
	var Collisions = {
		onCollide: function(object1, object2, callback){
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
		}
	};

	return Collisions;
});