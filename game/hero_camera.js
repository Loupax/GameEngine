define(['G', 'game/hero','Camera'], function(G, hero, Camera){
	var canvas = G.getStage();
	var camera = new Camera(0, 0, 1024, 768);
	
	camera.follow(hero, 100, 100);
	G.addPostUpdateHandler(function(){camera.update(); document.getElementById('debug').innerHTML = JSON.stringify([camera]);});
	return camera;
});