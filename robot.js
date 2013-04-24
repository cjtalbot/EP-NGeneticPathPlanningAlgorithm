//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This is robot object which is being manipulated
//
//  Method Summary :
//  		this.draw(c,globgs)
//				Draw function for the robot
//			this.update()
//				Used for robot motion and priority - fires during update cycles
//			this.moveTo(x,y)
//				Moves the origin of the robot to (x,y)
// 
//  --------------------------------------------------------------------------------------

// Robot-related GLOBALS
var ROBOT_WIDTH = 40;
var ROBOT_HEIGHT = 30;
var ROBOT_DIAG = 50;
var TURNAMT = Math.PI/18; // turn 10 degrees at a time
var MOVEAMT = 5; // move 5 units at a time

//  --------------------------------------------------------------------------------------
//  Name: Robot
//
//	Description:
//		Robot Object Initialization
//	
//	Inputs:
//		robX - x coordinate of robot's origin
//		robY - y coordinate of robot's origin
//		orient - angle orientation of the robot
//
//	Outputs:
//		robot - new object
//
//  --------------------------------------------------------------------------------------
function Robot(robX, robY, orient) {
	this.name = "ROBOT";
	this.center = {x:robX, y:robY, o:orient*Math.PI/180};
	this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
	this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
	this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
	
	allobjects.push(this);
	
//  --------------------------------------------------------------------------------------
//  Name: moveTo
//
//	Description:
//		Updates the robot's origin to (x,y)
//	
//	Inputs:
//		x - x coordinate for robot
//		y - y coordinate for robot
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
	this.moveTo = moveTo;
	function moveTo(x, y) {
		// do move command
		this.center = {x:x, y:y, o:Math.floor(Math.random()*2*Math.PI)};
		myconsole.update("AT "+ this.center.x+","+this.center.y);
		// update the min x, max x, min y, and max y for the rectangle!!
		this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
		this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
		this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
	}

//  --------------------------------------------------------------------------------------
//  Name: draw
//
//	Description:
//		Draws a red robot with a black origin and black line for the "front" of the robot
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
			c.fillStyle = 'rgba(255,0,0,1.0)'; // RED ROBOT!!
			c.lineWidth = 1;
			c.strokeStyle = 'rgba(255,0,0, 1.0)';
			c.beginPath();
			c.moveTo(this.xs.x1, this.ys.y1);
			c.lineTo(this.xs.x2, this.ys.y2);
			c.lineTo(this.xs.x3, this.ys.y3);
			c.lineTo(this.xs.x4, this.ys.y4);
			c.lineTo(this.xs.x1, this.ys.y1);
			c.closePath();
			c.fill();
			c.stroke();
			c.strokeStyle = 'rgba(0,0,0, 1.0)';
			c.lineWidth=2;
			c.beginPath();
			c.moveTo(this.xs.x2, this.ys.y2);
			c.lineTo(this.xs.x1, this.ys.y1);
			c.closePath();
			c.stroke();
			c.fillStyle = 'rgba(0,0,0,1.0)';
			c.beginPath();
			c.arc(this.center.x, this.center.y, 3, 0, Math.PI * 2, true);
			c.closePath();
			c.fill();
		}

//  --------------------------------------------------------------------------------------
//  Name: update
//
//	Description:
//		Resets the priority so the robot is drawn on top, and performs the robot movement
//			when done with genetic algorithm
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
		this.update = function() {
			this.priority = 5000;
			globgs.sortEntities();
			// check if in moving mode of runpath
			if (MODE === "move") {
				//myconsole.update("In bounding box - "+this.center.x+","+this.center.y+"--"+allpaths[0].nodes[1].x+","+allpaths[0].nodes[1].y);
			// if are, check to see if reached end of first segment in path (check collision with a point)
				if (Math.round(robot.center.x) == Math.round(allpaths[0].nodes[1].x) && Math.round(robot.center.y) == Math.round(allpaths[0].nodes[1].y)) {
					//myconsole.update("hit end of segment");
					if (allpaths[0].nodes.length == 2) {
						// exit
						allpaths[0].nodes.splice(0,1);
						if (allpaths[0].nodes == null || allpaths[0].nodes.length <= 1) {
							// done running!
							MODE = "run";
							setTimeout(doneRunning, 1000);
						}
					} else {
			// if at end of segment, calculate new angle of next segment
					var newangle = Math.atan2(allpaths[0].nodes[1].y - allpaths[0].nodes[2].y, allpaths[0].nodes[1].x - allpaths[0].nodes[2].x);
					
			// move x amt for rotation angle towards next segment
					if (this.center.o == newangle) {
						// if at end of segment and at new angle, delete prior segment -- if no more segments, change mode and call doneRunning
						allpaths[0].nodes.splice(0,1);
						if (allpaths[0].nodes == null || allpaths[0].nodes.length == 0) {
							// done running!
							MODE = "run";
							setTimeout(doneRunning, 1000);
						}
					} else {
						if (this.center.o > newangle) {
							if (this.center.o - newangle < newangle+360 - this.center.o) { // CJT ADDED
								if (this.center.o - TURNAMT <= newangle) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o - TURNAMT;
								}
							} else { // CJT ADDED
								if (this.center.o + TURNAMT <= newangle+360) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o + TURNAMT;
								}
							}
							//this.center.o = Math.min(this.center.o - TURNAMT, newangle);
							this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
							this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
							this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
						} else {
							if (newangle - this.center.o < this.center.o+360 - newangle) { // CJT ADDED
								if (this.center.o + TURNAMT >= newangle) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o + TURNAMT;
								}
							} else { // CJT ADDED
								if (this.center.o - TURNAMT <= newangle+360) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o - TURNAMT;
								}
							}
							//this.center.o = Math.max(this.center.o + TURNAMT, newangle);
							this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
							this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
							this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
						}
					}
			}
			
				} else {
					var newangle = Math.atan2(allpaths[0].nodes[0].y - allpaths[0].nodes[1].y, allpaths[0].nodes[0].x - allpaths[0].nodes[1].x);
					
			// move x amt for rotation angle towards next segment
					if (this.center.o == newangle) {
						// if not at end of segment, move x amt along the segment (this.x + amt*Math.xin(angle)) & (this.y - amt*Math.cos(angle))
						var TEMPAMT = MOVEAMT;
						if (getdist(this.center.x, this.center.y, allpaths[0].nodes[1].x, allpaths[0].nodes[1].y) < MOVEAMT) {
							TEMPAMT = getdist(this.center.x, this.center.y, allpaths[0].nodes[1].x, allpaths[0].nodes[1].y);
						} else {
							TEMPAMT = MOVEAMT;
						}
						var mycos = Math.cos(this.center.o);
						var mysin = Math.sin(this.center.o);
						if (mycos < 0 ) {
							if (allpaths[0].nodes[1].x < this.center.x) {
								this.center.x = this.center.x + TEMPAMT*mycos;
							} else {
								this.center.x = this.center.x - TEMPAMT*mycos;
							}
							
						} else {
							if (allpaths[0].nodes[1].x < this.center.x) {
								this.center.x = this.center.x - TEMPAMT*mycos;
							} else {
								this.center.x = this.center.x + TEMPAMT*mycos;
							}
						}
						
						if (mysin < 0 ) {
							if (allpaths[0].nodes[1].y < this.center.y) {
								this.center.y = this.center.y + TEMPAMT*mysin;
							} else {
								this.center.y = this.center.y - TEMPAMT*mysin;
							}
							
						} else {
							if (allpaths[0].nodes[1].y < this.center.y) {
								this.center.y = this.center.y - TEMPAMT*mysin;
							} else {
								this.center.y = this.center.y + TEMPAMT*mysin;
							}
						}
			
						this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
						this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
						this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
					} else {
						if (this.center.o > newangle) {
							if (this.center.o - newangle < newangle+360 - this.center.o) { // CJT ADDED
								if (this.center.o - TURNAMT <= newangle) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o - TURNAMT;
								}
							} else { // CJT ADDED
								if (this.center.o + TURNAMT <= newangle+360) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o + TURNAMT;
								}
							}
							//this.center.o = Math.min(this.center.o - TURNAMT, newangle);
							this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
							this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
							this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
						} else {
							if (newangle - this.center.o < this.center.o+360 - newangle) { // CJT ADDED
								if (this.center.o + TURNAMT >= newangle) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o + TURNAMT;
								}
							} else { // CJT ADDED
								if (this.center.o - TURNAMT <= newangle+360) {
									this.center.o = newangle;
								} else {
									this.center.o = this.center.o - TURNAMT;
								}
							}
							//this.center.o = Math.max(this.center.o + TURNAMT, newangle);
							this.xs = {x1: this.center.x, x2:this.center.x + (ROBOT_HEIGHT*Math.cos(this.center.o+(Math.PI/2))) , x3: this.center.x + (ROBOT_DIAG*Math.cos(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), x4: this.center.x + (ROBOT_WIDTH*Math.cos(this.center.o))};
							this.ys = {y1: this.center.y, y2: this.center.y + (ROBOT_HEIGHT*Math.sin(this.center.o+(Math.PI/2))), y3: this.center.y + (ROBOT_DIAG*Math.sin(this.center.o+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y4: this.center.y + (ROBOT_WIDTH*Math.sin(this.center.o))};
							this.all = {minx: Math.min(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4) , miny: Math.min(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4), maxx: Math.max(this.xs.x1, this.xs.x2, this.xs.x3, this.xs.x4), maxy: Math.max(this.ys.y1, this.ys.y2, this.ys.y3, this.ys.y4)};
						}
					}
				}
			}
		}
	
}


