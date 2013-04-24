//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This is the main function which initializes the application and contains some
//				general utilities for the application
//
//  Method Summary :
//  		startGame(gs)
//				Function to create the environment and setup mouse listener events
//			mousedown(e)
//				Handles the mouse clicks
//			doMode(x,y)
//				Performs action required by mouse click at (x,y) based on the application's
//					current mode
//			findObject(name, mytype)
//				Searches all created objects for the one with the specified name of a
//					certain object type
//			getdist(x1,y1,x2,y2)
//				Calculates the distance between (x1,y1) and (x2,y2)
//			angletwopoints(x1,y1,x2,y2,x3,y3,x4,y4)
//				Calculates the angle between the segments from (x1,y1) to (x2,y2) and
//					(x3,y3) to (x4,y4)
// 
//  --------------------------------------------------------------------------------------

// GLOBALS
var legend = null;
var globgs = null;
var robot = null;
var gsrobot = null;
var gsobstacles = [];
var goal = null;
var gsgoal = null;
var obstacles = [];
var allobjects = [];
var allbuttons = [];
var myconsole = null;
var canvas = null;
var INCREMENT = 50;
var LEGEND_X_LOCATION = 800;
var LEGEND_Y_LOCATION = 100;
var BUTTON_START_X_LOCATION = LEGEND_X_LOCATION + 25;
var BUTTON_START_Y_LOCATION = LEGEND_Y_LOCATION + INCREMENT;
var MODE = 'start'; // keep track of current mode for mouse clicks

//  --------------------------------------------------------------------------------------
//  Name: startGame
//
//	Description:
//		This is the main function which initializes the application and contains some
//				general utilities for the application
//	
//	Inputs:
//		gs - canvas object to draw on
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function startGame(gs) {
	if (globgs == null) {
		globgs = gs;
	}
	canvas = document.getElementById('canvas');
	canvas.addEventListener("mousedown", mousedown);

	myconsole = new MyConsole();
	
	legend = new Legend();
	globgs.addEntity(legend);
	myconsole.update("Created legend");

}

//  --------------------------------------------------------------------------------------
//  Name: mousedown
//
//	Description:
//		Handles the mouse clicks
//	
//	Inputs:
//		e - mouse event
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function mousedown(e) {
	if (MODE === 'run' || MODE === 'move') {
		myconsole.update("MouseDown");
		// don't do anything
		// if clicking clear, handle
		for (var i = 0; i < allbuttons.length; i++) {
			if (allbuttons[i].name === "Clear Screen") {
				myconsole.update("In clear screen");
				if (allbuttons[i].checkIntersectPoint(mouseX, mouseY)) {
					myconsole.update("Intersected");
					btns[allbuttons[i].action]();
					myconsole.update(allbuttons[i].action);
				}
			}
		}
	} else {
		//...calc coords into mouseX, mouseY
		var mouseX = e.layerX;
		var mouseY = e.layerY;
		// if in sketch area, then call function based on current mode
		if (mouseX < LEGEND_X_LOCATION) {
			doMode(mouseX, mouseY);
		} else {
			// else if in legend area, then check for which button to change mode to
			for ( var i = 0; i < allobjects.length; i++) {
		
				if (allobjects[i] instanceof Button && allobjects[i].checkIntersectPoint(mouseX, mouseY)) {
					//if ( allobjects[i] instanceof Button ){
						btns[allobjects[i].action]();
					//} else {
						
					//}
				}
			}
		}
	}
}

//  --------------------------------------------------------------------------------------
//  Name: doMode
//
//	Description:
//		Performs action required by mouse click at (x,y) based on the application's
//			current mode
//	
//	Inputs:
//		x - x coordinate from the mouse click
//		y - y coordinate from the mouse click
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function doMode(x, y) {
	switch (MODE) {
		case 'obstacle':
			// create an obstacle with center at the clicked location
			var Obst = new Obstacle(Math.floor(Math.random()*100)+5, x, y); // random size
			gsobstacles.push(globgs.addEntity(Obst));
			//printObs();
			//myconsole.update("Added Obstacle");
			break;
		case 'delobstacle':
			// check all obstacles for one intersecting with x,y, going in reverse order of drawing since anything under it is probably not seen
			var found = false;
			var i = obstacles.length -1;
			var which = null;
			var temp = null;
			while (!found && i>= 0) {
				//myconsole.update("Checking for delete "+found+", "+i);
				temp = obstacles[i].checkIntersectPoint(x,y);
				//myconsole.update("Found it is ="+temp+", "+obstacles[i].name);
				if (temp) {
					found = true;
					which = i;
				}
				i = i-1;
			}
			// if get here and still !found, do nothing
			if (found) {
				myconsole.update("Deleted Obstacle "+obstacles[which].name);
				var num = findObject(obstacles[which].name, Obstacle);
				globgs.delEntity(gsobstacles[which]);
				gsobstacles.splice(which,1);
				obstacles.splice(which,1);
				allobjects.splice(num,1);
				
			}
			//printObs();
			break;
		case 'start':
			
			if (robot == null) {
				robot = new Robot(x, y, Math.floor(Math.random()*2*Math.PI)); // random orientation
				gsrobot = globgs.addEntity(robot);
				myconsole.update("Created Robot...");
			} else {
				// delete current robot and create a new one
				robot.moveTo(x,y);
				//globgs.delEntity(gsrobot);
				//robot = new Robot(x, y, Math.floor(Math.random()*2*Math.PI)); // random orientation
				//gsrobot = globgs.addEntity(robot);
			}
			break;
		case 'goal':
			if (goal == null) {
				goal = new Goal(x, y);
				gsgoal = globgs.addEntity(goal);
				myconsole.update("Created Goal...");
			} else {
				goal.moveTo(x,y);
			}
			break;
		default:
			// do nothing
	}
}

//  --------------------------------------------------------------------------------------
//  Name: findObject
//
//	Description:
//		Performs action required by mouse click at (x,y) based on the application's
//			current mode
//	
//	Inputs:
//		name - string name of the object
//		mytype - object type being searched for
//
//	Outputs:
//		i - index of the requested object in the allobjects array, or null if doesn't exist
//
//  --------------------------------------------------------------------------------------
function findObject(name, mytype) {
	for (var i=0; i< allobjects.length; i++) {
		if (allobjects[i] instanceof mytype && allobjects[i].name === name) {
			return i;
		}
	}
	return null; // not found;
}

//  --------------------------------------------------------------------------------------
//  Name: getdist
//
//	Description:
//		Calculates the distance between (x1,y1) and (x2,y2)
//	
//	Inputs:
//		x1 - x coordinate for point 1
//		y1 - y coordinate for point 1
//		x2 - x coordinate for point 2
//		y2 - y coordinate for point 2
//
//	Outputs:
//		dist - distance between point 1 and point 2
//
//  --------------------------------------------------------------------------------------
function getdist(x1, y1, x2, y2) {
	return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}

//  --------------------------------------------------------------------------------------
//  Name: getdist
//
//	Description:
//		Calculates the angle between the segments from (x1,y1) to (x2,y2) and
//			(x3,y3) to (x4,y4)
//	
//	Inputs:
//		x1 - x coordinate for point 1
//		y1 - y coordinate for point 1
//		x2 - x coordinate for point 2
//		y2 - y coordinate for point 2
//		x3 - x coordinate for point 3
//		y3 - y coordinate for point 3
//		x4 - x coordinate for point 4
//		y4 - y coordinate for point 4
//
//	Outputs:
//		angle - angle between segment (point1,point2) and (point3,point4)
//
//  --------------------------------------------------------------------------------------
function angletwopoints(x1, y1, x2, y2, x3, y3, x4, y4) {
	var angle1 = Math.atan2(y1 - y2, x1-x2);
	var angle2 = Math.atan2(y3 - y4, x3 - x4);
	return angle1-angle2;
}