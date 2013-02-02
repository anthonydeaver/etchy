  	var coords = [];
	var currentDir = null;
	var Cursor = function() {
		return {
			direction : '',
			prevDirection: '',
			move : function (x,y) {
				x = Math.abs(x);
				y = Math.abs(y);
				if(this.curDirection != this.prevDirection) {
					etchy.saveCoords(x,y);
					//Direction change.  Store the coordinates for later (optimized)
					console.log("Change of direction, saving: " + x + ", "+ y);22122
					//etchy.deepStorage.push({'x': x, 'y' : y });
				}
		        etchy.coords.push({'x': x, 'y' : y });
				etchy.context.lineTo(x,y);
				etchy.context.strokeStyle = "#000";
				etchy.context.stroke();
				
			},
			
			drawExisting : function (c) {
				console.log('drawing from memory: ', c)
				// var myX, myY;
				// c = JSON.parse(c);

				$.each(c,function (i){
					console.log('entry: ' + c[i].x + ':' + c[i].y);
					drawDot(c[i].x,c[i].y);
				});
			},

			undo : function () {
				
			},

			drawDot333: function (x,y) {
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

		};
	};
	
var etchy = {
	canvas : '',
	context : '',
	curDirection : '',
	prevDirection : '',
	cursor : new Cursor,
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
};

$(function () {
	
	// setup
	var w = $('#artBoard').attr('width'); //$(window).width();
	var h = $('#artBoard').attr('height'); //$(window).height();
	//etchy.canvas = document.createElement('canvas');
	etchy.canvas = $('#artBoard')[0];

	// $('#artBoard').attr('width',w - 20);
	// $('#artBoard').attr('height',h -20);

	console.log('height: ', $('#artBoard').attr('height'))
  	etchy.context = etchy.canvas.getContext('2d');
	etchy.context.strokeStyle = "rgba(90,90,90,5)";
	etchy.context.lineWidth = 1;
	setCenter((w / 2), (h / 2));
	
	var h2 = (h / 2) - 50;
	$('#controls').css('top',h2)

	/**
	 *  UP = 38
     *	LEFT = 37
     *	RIGHT = 39
     *	DOWN = 40
	 */

    $(document).keydown(function (e) {
  //       // down = true;
  //       // keyEvent = event;
		// checkKeys(e);
  //   });

  //   function checkKeys(e) {
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
	        case 37 : // Left
	            // drawDot(o.x - 1, o.y);
	            drawDot2(-1,0);
	            break;
	        case 38 : // Up
	            // drawDot(o.x,o.y - 1);
	            drawDot2(0,-1);
	            break;
	        case 39 : // Right
	            // drawDot(o.x + 1, o.y);
	            drawDot2(1,0);
	            break;
	        case 40 : // Down
	            // drawDot(o.x,o.y + 1);
	            drawDot2(0,1);
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
				// console.log(Base64.encode(JSON.stringify(etchy.deepStorage)));
				console.log(etchy.canvas.toDataURL("image/png"));
				break;
	    }

  	});

	function setCenter(myX,myY) {
		myX = parseInt(myX);
		myY = parseInt(myY);
		etchy.context.moveTo(Math.abs(myX),Math.abs(myY));
		etchy.commandStack.push({'x': myX, 'y' : myY });
		etchy.curX = myX, etchy.curY = myY;
	}

	// Bindings
	$('#load').click(function() {
		alert('loading coords');
		setCenter(Math.abs((w / 2)), Math.abs(h / 2));
		etchy.redrawFromSaved(etchy.deepStorage);
	});

});

function drawSaved(c) {
	console.log('drawing from memory: ', c)
	// var myX, myY;
	c = JSON.parse(c);

	$.each(c,function (i){
		console.log('entry: ' + c[i].x + ':' + c[i].y);
		drawDot(c[i].x,c[i].y);
	});
}

function drawDot2 (x,y) {
	// x = Math.abs(x);
	// y = Math.abs(y);
    etchy.context.beginPath();
    etchy.context.moveTo(etchy.curX, etchy.curY);
    etchy.curX = etchy.curX + x; 
    etchy.curY = etchy.curY + y;
	etchy.saveCoords(etchy.curX,etchy.curY);
	if(etchy.curDirection != etchy.prevDirection) {
		// etchy.saveCoords(etchy.curX,etchy.curY);
		//Direction change.  Store the coordinates for later (optimized)
		console.log("Change of direction, saving: " + etchy.curX + ", "+ etchy.curY);
		
		//etchy.deepStorage.push({'x': x, 'y' : y });
	}
    etchy.commandStack.push({'x': etchy.curX, 'y' : etchy.curY });
	etchy.context.lineTo(etchy.curX,etchy.curY);
	etchy.context.closePath();
	etchy.context.stroke();
}

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
