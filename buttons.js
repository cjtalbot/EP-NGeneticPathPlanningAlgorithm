//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This object is used for the buttons on the side of the screen
//
//  Method Summary :
//			this.update()
//				Updates the priority so the buttons are always drawn on top
//			this.mydraw(c,globgs)
//				Draws the buttons on the legend
//			this.checkIntersectPoint(x,y)
//				Checks if a point is within the boundaries of the button
//			getButton(findname)
//				Retrieves a button by name
//			findActiveButton()
// 				Retrieves the currently activated button
//			doneRunning()
//				Called when the robot has finished running the genetic path planning algorithm
//			btns[createObst]
//				Called to update the currently active button to "Create Obstacle"
//			btns[delObst]
//				Called to update the currently active button to "Delete Obstacle"
//			btns[chooseStart]
//				Called to update the currently active button to "Choose Start"
//			btns[chooseGoal]
//				Called to update the currently active button to "Choose Goal"
//			btns[clearScreen]
//				Called to clear the screen of obstacles, robot, and goal
//			btns[runPathGen]
//				Called to initiate the genetic path planning algorithm
//
//  --------------------------------------------------------------------------------------


// Button GLOBAL functions for button actions
var btns= {
	
//  --------------------------------------------------------------------------------------
//  Name: btns[createObst]
//
//	Description:
//		Called to update the currently active button to "Create Obstacle"
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	createObst: function () {
					// create circle of random size at mouse click location
					MODE = 'obstacle';
					var active = findActiveButton();
					if (active != null) {
						active.selected = false;
					}
					var curBtn = getButton("Create Obstacle");
					if (curBtn != null) {
						curBtn.selected = true;
					}
					myconsole.update("Creating Obstacles Mode Enabled");
			},
			
//  --------------------------------------------------------------------------------------
//  Name: btns[delObst]
//
//	Description:
//		Called to update the currently active button to "Delete Obstacle"
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	delObst: function () {
					// create circle of random size at mouse click location
					MODE = 'delobstacle';
					var active = findActiveButton();
					if (active != null) {
						active.selected = false;
					}
					var curBtn = getButton("Delete Obstacle");
					if (curBtn != null) {
						curBtn.selected = true;
					}
					myconsole.update("Deleting Obstacles Mode Enabled");
			},
			
//  --------------------------------------------------------------------------------------
//  Name: btns[chooseStart]
//
//	Description:
//		Called to update the currently active button to "Choose Start"
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	chooseStart: function () {
						// set the robot's position at mouse click location
						MODE='start';
						var active = findActiveButton();
						if (active != null) {
							active.selected = false;
						}
						var curBtn = getButton("Choose Start Location");
						if (curBtn != null) {
							curBtn.selected = true;
						}
						myconsole.update("Choose Starting Point Mode Enabled");
				},
				
//  --------------------------------------------------------------------------------------
//  Name: btns[chooseGoal]
//
//	Description:
//		Called to update the currently active button to "Choose Goal"
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	chooseGoal: function () {
					// draw green dot for destination at mouse click location
					MODE='goal';
					var active = findActiveButton();
					if (active != null) {
						active.selected = false;
					}
					var curBtn = getButton("Choose Goal Destination");
					if (curBtn != null) {
						curBtn.selected = true;
					}
					myconsole.update("Choose Goal Point Mode Enabled");
			},
			
//  --------------------------------------------------------------------------------------
//  Name: btns[clearScreen]
//
//	Description:
//		Called to clear the screen of obstacles, robot, and goal
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	clearScreen: function () {
						// remove all objects and robot
						// loop through allobjects and destroy them, then set robot & obstacles = null
						var num;
						globgs.delEntity(gsrobot);
						num = findObject("ROBOT", Robot);
						if (num != null) {
							allobjects.splice(num,1);
						}
						gsrobot = null;
						robot = null;
						globgs.delEntity(gsgoal);
						num = findObject("GOAL", Goal);
						if (num != null) {
							allobjects.splice(num,1);
						}
						gsgoal = null;
						goal = null;
						//var num;
						while(gsobstacles.length > 0) {
							num = findObject(obstacles[0].name, Obstacle);
							globgs.delEntity(gsobstacles[0]);
							gsobstacles.splice(0,1);
							obstacles.splice(0,1);
							if (num != null) {
								allobjects.splice(num,1);
							}
						}
						myconsole.update("Scene Reset - All Objects Removed");
				},
				
//  --------------------------------------------------------------------------------------
//  Name: btns[runPathGen]
//
//	Description:
//		Called to initiate the genetic path planning algorithm
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	runPathGen: function () {
					// start the path simulation - do some pauses to show after x steps what paths are there, pause, show next stage, etc to final stage
					if (goal == null || robot == null) {
						myconsole.update("Cannot run - must define robot and goal locations first!");
					} else {
						MODE='run';
						var active = findActiveButton();
						if (active != null) {
							active.selected = false;
						}
						var curBtn = getButton("Run Path Generation");
						if (curBtn != null) {
							curBtn.selected = true;
						}
						
						// then let robot run the final path
						myconsole.update("Running Simulation Using Genetic Algorithm");
						
						//RUN!!!!!
						runpath();
					}
					
					
				}
};

//  --------------------------------------------------------------------------------------
//  Name: doneRunning
//
//	Description:
//		Called when the robot has finished running the genetic path planning algorithm
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function doneRunning() {
	
	myconsole.update("Done Running Simulation");
	// remove last path
	globgs.delEntity(gspaths[0]);
	gspaths.splice(0,1);
	allpaths.splice(0,1);
	MODE='goal';
	var active = findActiveButton();
	if (active != null) {
		active.selected = false;
	}
	var curBtn = getButton("Choose Goal Destination");
	if (curBtn != null) {
		curBtn.selected = true;
	}
}

//  --------------------------------------------------------------------------------------
//  Name: Button
//
//	Description:
//		Button Object Initialization
//	
//	Inputs:
//		none
//
//	Outputs:
//		button - new object
//
//  --------------------------------------------------------------------------------------
function Button(label, action) {
	this.name = label;
	this.action = action;
	this.x = BUTTON_START_X_LOCATION;
	this.y = BUTTON_START_Y_LOCATION;
	BUTTON_START_Y_LOCATION = BUTTON_START_Y_LOCATION + INCREMENT;
	this.width = 150;
	this.height = 25;
	if (this.name === 'Choose Start Location') {
		this.selected = true;
	} else {
		this.selected = false;
	}
	allobjects.push(this);
	allbuttons.push(this);
	myconsole.update("Created Button - "+this.name);

//  --------------------------------------------------------------------------------------
//  Name: checkIntersectPoint
//
//	Description:
//		Checks if a point is within the boundaries of the button
//	
//	Inputs:
//		x - x coordinate to check
//		y - y coordinate to check
//
//	Outputs:
//		boolean - true if (x,y) is within this button's box
//
//  --------------------------------------------------------------------------------------
	this.checkIntersectPoint = checkIntersectPoint;	
	function checkIntersectPoint(x,y) {
		// return true if touching this object
		if (x >=this.x && x <= this.x+this.width && y >= this.y && y <= this.y+this.height) {
			return true;
		} else {
			return false;
		}
		return true;
	}

//  --------------------------------------------------------------------------------------
//  Name: update
//
//	Description:
//		Updates the priority so the buttons are always drawn on top
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.update = function() {
		this.priority = 5002;
		globgs.sortEntities();
	}

//  --------------------------------------------------------------------------------------
//  Name: mydraw
//
//	Description:
//		Draws the button on the legend
//	
//	Inputs:
//		c - canvas object
//		globgs - gamesoup canvas
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.mydraw = function(c, globgs) {
		if (this.selected) {
			c.fillStyle = 'rgba(0,255, 0, 1.0)';
		} else {
			c.fillStyle = 'rgba(255,0,0,1.0)'; 
		}
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.lineTo(this.x+this.width, this.y);
		c.lineTo(this.x+this.width, this.y+this.height);
		c.lineTo(this.x, this.y+this.height);
		c.lineTo(this.x, this.y);
		c.closePath();
		c.fill();
		
		c.fillStyle = '#000';
		c.font = 'bold 10px sans-serif';
		c.textBaseline = 'bottom';
		c.fillText(this.name, this.x+5, this.y+15);
		
		c.stroke();
	}

}


//  --------------------------------------------------------------------------------------
//  Name: getButton
//
//	Description:
//		Retrieves a button by name
//	
//	Inputs:
//		findname - name of the button to find
//
//	Outputs:
//		button - the button object with the requested name, or null
//
//  --------------------------------------------------------------------------------------
function getButton(findname) {
	for (var i=0; i<allbuttons.length; i++) {
		if (allbuttons[i].name === findname) {
			return allbuttons[i];
		}
	}
	// if reach here, return null;
	return null;
}

//  --------------------------------------------------------------------------------------
//  Name: findActiveButton
//
//	Description:
//		Retrieves the currently activated button
//	
//	Inputs:
//		none
//
//	Outputs:
//		button - the button object that is currently active, or null
//
//  --------------------------------------------------------------------------------------
function findActiveButton() {
	for (var i=0; i<allbuttons.length; i++) {
		if (allbuttons[i].selected) {
			return allbuttons[i];
		}
	}
	// if reach here, return null;
	return null;
}
