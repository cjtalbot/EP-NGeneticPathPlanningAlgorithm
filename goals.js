//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This object is used for the goal node for the robot
//
//  Method Summary :
//			this.update()
//				Sets the priority to the goal is always drawn on top
//			this.draw(c,globgs)
//				Draws the goal green circle on screen
//			this.moveTo(x,y)
//				Moves the location of the goal node to (x,y)
//
//  --------------------------------------------------------------------------------------


//  --------------------------------------------------------------------------------------
//  Name: Goal
//
//	Description:
//		Goal Object Initialization
//	
//	Inputs:
//		x - x coordinate for the goal
//		y - y coordinate for the goal
//
//	Outputs:
//		goal - new object
//
//  --------------------------------------------------------------------------------------
function Goal(x,y) {
	this.name = "GOAL";
	this.center = {x:x, y:y, r:5};

	allobjects.push(this);

//  --------------------------------------------------------------------------------------
//  Name: moveTo
//
//	Description:
//		Moves the location of the goal node to (x,y)
//	
//	Inputs:
//		x - x coordinate for goal
//		y - y coordinate for goal
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.moveTo = moveTo;
	function moveTo(x, y) {
		// do move command
		myconsole.update("Goal Point Moved...");
		this.center = {x:x, y:y, r:5};
	}

//  --------------------------------------------------------------------------------------
//  Name: update
//
//	Description:
//		Sets the priority to the goal is always drawn on top
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.update = function() {
		this.priority = 4999;
		globgs.sortEntities();
	}
	
//  --------------------------------------------------------------------------------------
//  Name: draw
//
//	Description:
//		Draws the goal green circle on the screen
//	
//	Inputs:
//		c - canvas object
//		globgs - gamesoup canvas
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.draw = function(c, globgs) {
		c.fillStyle = 'rgba(0,255,0,1.0)'; // RED ROBOT!!
		c.beginPath();
		c.arc(this.center.x, this.center.y, this.center.r, 0, Math.PI * 2, true);
		c.closePath();
		c.fill();
		
	}
	
}
