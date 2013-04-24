//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This object is used for the obstacles within the environment
//
//  Method Summary :
//			this.draw(c, globgs)
//				Draws the obstacle on the screen in blue
//			this.checkIntersectRobotPath(x1,y1,x2,y2)
//				Checks for robot intersections for a segment from pt1 to pt2
//			this.checkIntersectSegment(x1,y1,x2,y2)
//				Checks for a single segment's intersection from pt1 to pt2
//			this.checkIntersectPoint(x,y)
//				Checks if a point from the mouse is within this obstacle
// 
//  --------------------------------------------------------------------------------------

// Obstacle GLOBALS
var curName = 65; // for A
var MAXOBSTACLES = 25;
var curPrefix = "";
var curPrefixNum = 64;

//  --------------------------------------------------------------------------------------
//  Name: Obstacle
//
//	Description:
//		Obstacle Object Initialization
//	
//	Inputs:
//		obsSize - radius of the obstacle
//		obsX - x coordinate for the obstacle center
//		obsY - y coordinate for the obstacle center
//
//	Outputs:
//		obstacle - new object
//
//  --------------------------------------------------------------------------------------
function Obstacle(obsSize, obsX, obsY) {
	this.name = curPrefix + String.fromCharCode(curName);
	if(curName == MAXOBSTACLES+65) {
		curName = 97;
	} else if (curName == MAXOBSTACLES+97){
		debug.console("ERROR - too many obstacles!");
		curPrefixNum = curPrefixNum+1;
		curPrefix = String.fromCharCode(curPrefixNum);
		curName = 65;
	} else {
		curName = curName + 1;
	}
	this.r = obsSize;
	this.center = {x:obsX, y:obsY }
	
	obstacles.push(this);
	allobjects.push(this);
	
//  --------------------------------------------------------------------------------------
//  Name: checkIntersectRobotPath
//
//	Description:
//		Checks for robot intersections for a segment from pt1 to pt2
//	
//	Inputs:
//		x1 - x coordinate for point 1
//		y1 - y coordinate for point 1
//		x2 - x coordinate for point 2
//		y2 - y coordinate for point 2
//
//	Outputs:
//		crossed - boolean on whether this obstacle intersects the robot's path on the 
//			line segment
//		penetration - depth of penetration of the robot into the obstacle along the 
//			robot's path
//		clearance - distance the robot's path clears this obstacle
//
//  --------------------------------------------------------------------------------------	
	this.checkIntersectRobotPath = checkIntersectRobotPath;
	function checkIntersectRobotPath(x1, y1, x2, y2) {
		// get the robot's orientation for travelling along this path
		var orient = Math.atan2(y1-y2, x1-x2);
		// extend the segment by the robot's length and width
		var new1 = {x:x1 + (ROBOT_WIDTH*Math.cos(orient)), y:y1 + (ROBOT_WIDTH*Math.sin(orient))};
		var new2 = {x:x2, y:y2};
		var new3 = {x:x2 + (ROBOT_HEIGHT*Math.cos(orient+(Math.PI/2))), y:y2 + (ROBOT_HEIGHT*Math.sin(orient+(Math.PI/2)))};
		var new4 = {x:x1 + (ROBOT_DIAG*Math.cos(orient+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG)))), y:y1 + (ROBOT_DIAG*Math.sin(orient+(Math.atan2(ROBOT_HEIGHT/ROBOT_DIAG, ROBOT_WIDTH/ROBOT_DIAG))))};
		// check each segment of the new path
		var crossed = [];
		var penetration = [];
		var clearance = [];
		var closest = [];
		
		var temp;
		temp = this.checkIntersectSegment(new1.x, new1.y, new2.x, new2.y);
		crossed[0] = temp.crossed;
		penetration[0] = temp.penetration;
		clearance[0] = temp.clearance;
		closest[0] = temp.closest;
		
		temp = this.checkIntersectSegment(new2.x, new2.y, new3.x, new3.y);
		crossed[1] = temp.crossed;
		penetration[1] = temp.penetration;
		clearance[1] = temp.clearance;
		closest[1] = temp.closest;
		
		temp = this.checkIntersectSegment(new3.x, new3.y, new4.x, new4.y);
		crossed[2] = temp.crossed;
		penetration[2] = temp.penetration;
		clearance[2] = temp.clearance;
		closest[2] = temp.closest;
		
		temp = this.checkIntersectSegment(new4.x, new4.y, new1.x, new1.y);
		crossed[3] = temp.crossed;
		penetration[3] = temp.penetration;
		clearance[3] = temp.clearance;
		closest[3] = temp.closest;
		
		// use the closest information to determine whether the circle is inside or outside the rectangle
		//crossed[4] = ??;
		
		var iscrossed = false;
		var maxpenetration = 0;
		var minclearance = clearance[0] ;
		for (var i=0; i<4; i++) {
			// return crossed=true if any are true
			if (crossed[i]) {
				iscrossed = true;
			}
			// return max penetration of all edges
			if (penetration[i] > maxpenetration) {
				maxpenetration = penetration[i];
			}
			// return min clearance of all edges
			if (clearance[i] < minclearance) {
				minclearance = clearance[i];
			}
			// return closest which is closest to the center - not needed
		}
		if (crossed[4]) {
			iscrossed = true;
		}
		return {crossed:iscrossed, penetration:maxpenetration, clearance:minclearance};
	}

//  --------------------------------------------------------------------------------------
//  Name: checkIntersectSegment
//
//	Description:
//		Checks for a single segment's intersection from pt1 to pt2
//	
//	Inputs:
//		x1 - x coordinate for point 1
//		y1 - y coordinate for point 1
//		x2 - x coordinate for point 2
//		y2 - y coordinate for point 2
//
//	Outputs:
//		crossed - boolean on whether this obstacle intersects the line segment
//		penetration - depth of penetration of the line segment into the obstacle
//		clearance - distance the line segment clears this obstacle
//
//  --------------------------------------------------------------------------------------	
	this.checkIntersectSegment = checkIntersectSegment;
	
	function checkIntersectSegment(x1, y1, x2, y2) {
		var crossed = false;
		var penetration = 0;
		var clearance = 0;
		
		var segv = new Node(x2-x1, y2-y1);
		var sizesegv = getdist(x1, y1, x2, y2);
		var ptv = new Node(this.center.x-x1, this.center.y-y1);
		var sizeprojv = (ptv.x*segv.x/sizesegv) + (ptv.y*segv.y/sizesegv);
		var closest = null;
		
		if (sizeprojv < 0) {
			closest = new Node(x1, y1);
		} else if (sizeprojv > sizesegv) {
			closest = new Node(x2, y2);
		} else {
			var projv = new Node(sizeprojv*(segv.x/sizesegv), sizeprojv*(segv.y/sizesegv));
			closest = new Node(x1+projv.x, y1+projv.y);
		}
		
		var distv = new Node(this.center.x-closest.x, this.center.y-closest.y);
		var sizedistv = getdist(0,0,distv.x, distv.y);
		
		var offset = new Node((this.r - sizedistv)*distv.x/sizedistv, (this.r - sizedistv)*distv.y/sizedistv);
		var sizeoffset = getdist(0,0,offset.x, offset.y);
		if (sizedistv < this.r) {
			crossed = true;
			penetration = sizeoffset;
		} else {
			crossed = false;
			if (sizeoffset - 10 >= 0) {
				clearance = sizeoffset - 10; 
			} else {
				clearance = Math.exp(7*(sizeoffset - 10)) - 1;
			}
		}
		
		return {crossed:crossed, penetration:penetration, clearance:clearance, closest:closest};
	}
	
	myconsole.update("Obtacle "+this.name+" is at: ("+this.center.x+", "+this.center.y+"), radius="+this.r);
	
//  --------------------------------------------------------------------------------------
//  Name: checkIntersectPoint
//
//	Description:
//		Checks if a point from the mouse is within this obstacle
//	
//	Inputs:
//		x - x coordinate to check
//		y - y coordinate to check
//
//	Outputs:
//		boolean - true if (x,y) is inside this obstacle
//
//  --------------------------------------------------------------------------------------
	this.checkIntersectPoint = checkIntersectPoint;
	function checkIntersectPoint(x,y) {
		// return true if touching this object
		var xs = x - this.center.x;
		xs = xs*xs;
		var ys = y - this.center.y;
		ys = ys*ys;
		
		//myconsole.update("Checking "+this.name+" with ("+x+","+y+","+this.r+"), and "+Math.sqrt(xs+ys));
		if (this.r >= Math.sqrt(xs+ys)) {
			return true;
		} else {
			return false;
		}
	}
	
//  --------------------------------------------------------------------------------------
//  Name: draw
//
//	Description:
//		Draws the obstacle on the screen in blue
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
		c.fillStyle = 'rgba(0,0,255,1.0)'; // BLUE OBSTACLES!!
		c.beginPath();
		c.arc(this.center.x, this.center.y, this.r, 0, Math.PI * 2, true);
		c.closePath();
		c.fill();

		c.fillStyle = '#FFF';
		c.font = 'bold 16px sans-serif';
		c.textBaseline = 'bottom';
		c.fillText(this.name, this.center.x - (5 * (this.name.length)), this.center.y + 10);
		
		c.stroke();
	}

}