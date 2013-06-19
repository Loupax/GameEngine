//@requires game.engine/graphic.js
(function(window, G, undefined){
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

	var eventFix = function(e){
		e = e || window.event;

	    var pageX = e.pageX;
	    var pageY = e.pageY;
	    if (pageX === undefined) {
	        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	    }
	    return e;
	}

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
		event = eventFix(event);
		var object_count = G.getObjects().length;
		var current_object;
		var index;
		var event_type = event.type;

		while(object_count--)
		{
			current_object = G.getObjects()[object_count];
						
			if(G.Geometry.pointIsInRectangle({x: event.clientX, y: event.clientY}, current_object.getRectangle())){
				index = indexOfEventObject(events[event_type], current_object);
				if(index > -1)
				{
					events[event_type][index].listener.call(events[event_type][index].object, event);	
				}				
				return;
			}				
			
		}
	};

	//G.getStage().addEventListener('click', pointerHandler);
	//G.getStage().addEventListener('mousemove', pointerHandler);
	var e = 'click mousedown mousemove touchstart touchend touchcancel touchleave touchmove'.split(' ');
	for(var i = 0; i < e.length; i++)
	{
		G.getStage().addEventListener(e[i], pointerHandler);;	
	}
	
	
	
	G.Events = Events;
})(window, G);