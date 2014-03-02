//@requires game.engine/graphic.js
(define(['G', 'Geometry'], function(G, Geometry, undefined){
	var events = {
		click: []
	};

	var indexOfEventObject = function(array, object){
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].object === object)
			{
				return i;
			}
		}
		return -1;
	}
	
	function EventException(message)
	{
		this.message = message;
		this.name    = 'EventException';
	}

	function EventObject(caller, listener){
		this.object = caller;
		this.listener = listener;

		return this;
	}

	var eventFix = function(event){
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		// posx and posy contain the mouse position relative to the document
		// Do something with this information
		event.clientX = posx;
		event.clientY = posy;
	};

	var Events = {
		// Declares the provided object as a mouse handled object
		addEventListener: function(event_types, game_object, listener){

			event_types = event_types.split(' ');
			var event_type = '',
				iterator,
				temp;
			for(var index = 0; index < event_types.length; index++)
			{	
				event_type = event_types[index];

				if(!(event_type in events))
				{	
					events[event_type] = [];
				}
				// We set the proper indexes of all the existing game objects 
				// (according to the sequence they are added to the game loop)
				
				// We add the new game object to the game loop
				events[event_type].push(new EventObject(game_object, listener));
				
				// Reindexing the table and removing any dead objects...
				events[event_type] = events[event_type].filter(function(item){
					return (item != undefined);
				});					
			}
		}
	};

	var pointerHandler = function(event){
		//eventFix(event);
		var object_count = G.getObjects().length;
		var current_object;
		var index;
		var event_type = event.type;
		var relativeX = event.pageX - this.offsetLeft;
	    var relativeY = event.pageY - this.offsetTop;

		while(object_count--)
		{
			current_object = G.getObjects()[object_count];
						
			if(Geometry.pointIsInRectangle({x: relativeX, y: relativeY}, current_object.getRectangle())){
				index = indexOfEventObject(events[event_type], current_object);
				if(index > -1)
				{
					events[event_type][index].listener.call(events[event_type][index].object, event);	
				}				
				return;
			}				
			
		}
	};
	
	// Events to handle:  mousedown mousemove touchstart touchend touchcancel touchleave touchmove
	var e = 'click'.split(' ');
	for(var i = 0; i < e.length; i++)
	{
		G.getStage().addEventListener(e[i], pointerHandler);
	}	
	
	return Events;
});