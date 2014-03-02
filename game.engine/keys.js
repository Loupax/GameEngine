define(['G'], function(G, undefined){
	var Keyboard = {
			keys: {}
	};
	var stage = G.getStage();
	
	window.addEventListener('keydown', function(e){Keyboard.keys[String.fromCharCode(e.which)] = true;});
	window.addEventListener('keyup', function(e){Keyboard.keys[String.fromCharCode(e.which)] = false;});
	

	return Keyboard;
});