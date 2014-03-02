
define(function(){
	"use strict";
	var win 	  = window,
		doc 	  = document,
		objects   = [],
		preDraws  = [],
		postDraws = [],
		preUpdates= [],
		postUpdates=[],
		canvas 	  = doc.querySelector('[game]') || null,
		context   = canvas ? canvas.getContext('2d') : null,
		background = canvas.getAttribute('background') || '#0ff',
		update_timeout,
		draw_timeout;
		




	var draw = function(){			
		context.beginPath();
	    context.rect(0, 0, canvas.width, canvas.height);
	    context.fillStyle = background;
	    context.fill();
	    var i;
	    
	    for(i = 0; i < preDraws.length; i++)
	    {
	    	preDraws[i](context);
	    }

		for(i = 0; i < objects.length; i++) {			
			objects[i].draw(context);							
		}
		
		for(i = 0; i < postDraws.length; i++)
	    {
	    	postDraws[i](context);
	    }

		draw_timeout = requestAnimationFrame(draw);		
	};
	
	var update = function(){
		var i = 0;
		for(i = 0; i < preUpdates.length; i++){
			preUpdates[i]();
		}
		for(i = 0; i<objects.length;i++)
		{
			objects[i].update();			
		}
		for(i = 0; i < postUpdates.length; i++){
			postUpdates[i]();
		}
		
		update_timeout = setTimeout(update, 20);
	};
	
	var G = {
			extend: function(member, extension){
				for(var i in extension){
					member[i] = extension[i];
				}
			},
			add: function(object){
				if(object instanceof Array){
					for(var i = 0; i<object.length; i++)
						this.add(object[i]);
				}
				else{
					objects.push(object);	
				}				
			},
			setCanvas: function(_canvas){
				canvas = _canvas;
				context = canvas.getContext('2d');
			},
			start: function(){
				draw();
				update();
			},
			getStage: function(){
				return canvas;
			},
			getObjects: function(){
				return objects;
			},
			addPreDrawHandler: function(callback){
				if(typeof callback === 'function'){
					preDraws.push(callback);
				}
			},
			addPostDrawHandler: function(callback){
				if(typeof callback === 'function'){
					postDraws.push(callback);
				}
			},
			addPreUpdateHandler: function(callback){
				preUpdates.push(callback);
			},
			addPostUpdateHandler: function(callback){
				postUpdates.push(callback);
			}
		};

			
		


	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller
	// fixes from Paul Irish and Tino Zijdel
	 
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
	return G;
});