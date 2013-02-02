  	var coords = [];
	var currentDir = null;
	var Cursor = function() {
		
	};
	
	Cursor.prototype = {
		move : function (x,y) {
			x = Math.abs(x);
			y = Math.abs(y);
			if(etchy.curDirection != etchy.prevDirection) {
				etchy.saveCoords(x,y);
				//Direction change.  Store the coordinates for later (optimized)
				console.log("Change of direction, saving: " + x + ", "+ y);

				//etchy.deepStorage.push({'x': x, 'y' : y });
			}
	        etchy.coords.push({'x': x, 'y' : y });
			etchy.context.lineTo(x,y);
			etchy.context.strokeStyle = "#000";
			etchy.context.stroke();
			
		},
		
		undo : function() {
			
		}
	};
	
	
	var etchy = {
		canvas : '',
		context : '',
		curDirection : '',
		prevDirection : '',
		cursor : Cursor,
		commandStack : [],
		deepStorage : [],
		curX:0,
		curY:0,
		
		saveCoords : function(myX, myY) {
			etchy.deepStorage.push({'x': myX, 'y' : myY });
			localStorage.setItem('etchy',etchy.deepStorage);
			//console.dir(localStorage.getItem('etchy'));
		},
		
		redrawFromSaved : function(coords) {
			var t = etchy.deepStorage;
			//etchy.canvas.width = etchy.canvas.width;
			etchy.context.clearRect(0,0,etchy.canvas.width,etchy.canvas.height);
			console.log(t.length);
			var l = t.length;
			etchy.context.beginPath();
			etchy.context.moveTo(etchy.canvas.width / 2,etchy.canvas.height / 2);
			for (x = 0; x<l; x++) {
				console.log(t[x].x,t[x].y);
				//drawDot(t[x].x,t[x].y);
				etchy.context.lineTo(t[x].x,t[x].y);
			}
			etchy.context.stroke();
		}

		drawFromSaved : function (c) {
			var myX, myY;
			c = JSON.parse(c);

			$.each(c,function)
		}
		
	};
$(function () {
	
	// setup
	var w = $(window).width();
	var h = $(window).height();
	//etchy.canvas = document.createElement('canvas');
	etchy.canvas = $('#artBoard')[0];

	$('#artBoard').attr('width',w - 20);
	$('#artBoard').attr('height',h -20);

  	etchy.context = etchy.canvas.getContext('2d');
	etchy.context.strokeStyle = "rgba(90,90,90,5)";
	etchy.context.lineWidth = 1;
	setCenter((w / 2), (h / 2));
	
	var h2 = (h / 2) - 50;
	$('#controls').css('top',h2)

    $(document).keydown(function (event) {
        down = true;
        keyEvent = event;
		checkKeys(event);

    });

	/**
	 *  UP = 38
     *	LEFT = 37
     *	RIGHT = 39
     *	DOWN = 40
	 */

    function checkKeys(e) {
		etchy.prevDirection = etchy.curDirection;
		etchy.curDirection = e.keyCode;
    	var o = etchy.commandStack[etchy.commandStack.length - 1];
		if(e.which == 191 && e.shiftKey) {
	        // ctrl+b pressed
			console.log("Yeah!  You managed to press the '?' key.  Aren't you proud?");
			//utils.togglePopup('#help');
	    }
	    switch(e.keyCode) {
			// Drawing Keys
	        case 37 :
	            drawDot(o.x - 1, o.y);
	            break;
	        case 38 :
	            drawDot(o.x,o.y - 1);
	            break;
	        case 39 :
	            drawDot(o.x + 1, o.y);
	            break;
	        case 40 :
	            drawDot(o.x,o.y + 1);
	            break;

			// keys
			case 65 : // 'a'
				//$('#about').toggle();
				utils.togglePopup('#about');
				break;
			case 67 : // 'c'
				$('#controls').toggle();
				// utils.togglePopup('#controls',true);
				break;
			case 83 : // 's'
				// save drawing
				console.log(JSON.stringify(etchy.deepStorage));
				break;
	    }

  }


  function setCenter(myX,myY) {
    etchy.context.moveTo(Math.abs(myX),Math.abs(myY));
    etchy.commandStack.push({'x': myX, 'y' : myY });
    etchy.curX = myX, etchy.curY = myY;
  }

	// Bindings
	$('#load').click(function() {
		alert('loading coords');
		setCenter((w / 2), (h / 2));
		etchy.redrawFromSaved(etchy.deepStorage);
	});

});

function drawDot(x,y) {
    etchy.context.beginPath();
    etchy.context.moveTo(etchy.curX, etchy.curY);
    etchy.curX = x, etchy.curY = y;
	x = Math.abs(x);
	y = Math.abs(y);
	if(etchy.curDirection != etchy.prevDirection) {
		etchy.saveCoords(x,y);
		//Direction change.  Store the coordinates for later (optimized)
		console.log("Change of direction, saving: " + x + ", "+ y);
		
		//etchy.deepStorage.push({'x': x, 'y' : y });
	}
    etchy.commandStack.push({'x': x, 'y' : y });
	etchy.context.lineTo(x,y);
	etchy.context.closePath();
	etchy.context.stroke();

}
