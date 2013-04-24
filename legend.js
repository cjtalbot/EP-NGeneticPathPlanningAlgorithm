//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This object is used for the buttons on the side of the screen
//
//  Method Summary :
//			this.draw(c, globgs)
//				Draws the legend box on the screen, as well as all the buttons
//			this.update()
//				Updates the priority so this is always drawn on top
// 
//  --------------------------------------------------------------------------------------


//  --------------------------------------------------------------------------------------
//  Name: Legend
//
//	Description:
//		Legend Object Initialization
//	
//	Inputs:
//		none
//
//	Outputs:
//		legend - new object
//
//  --------------------------------------------------------------------------------------
function Legend() {
	this.buttons = [];
	
	var tempbtn = new Button("Create Obstacle", "createObst");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;
	
	var tempbtn = new Button("Delete Obstacle", "delObst");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;
	
	tempbtn = new Button("Choose Start Location", "chooseStart");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;
	
	tempbtn = new Button("Choose Goal Destination", "chooseGoal");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;
	
	tempbtn = new Button("Clear Screen", "clearScreen");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;
	
	tempbtn = new Button("Run Path Generation", "runPathGen");
	globgs.addEntity(tempbtn);
	this.buttons[this.buttons.length] = tempbtn;

//  --------------------------------------------------------------------------------------
//  Name: update
//
//	Description:
//		Updates the priority so this is always drawn on top
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------	
	this.update = function() {
		this.priority = 5001;
		globgs.sortEntities();
	}
	
//  --------------------------------------------------------------------------------------
//  Name: draw
//
//	Description:
//		Draws the legend box on the screen, as well as all the buttons
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
		c.fillStyle = 'rgba(200,200,200,1.0)'; 
		c.beginPath();
		c.moveTo(LEGEND_X_LOCATION, 0);
		c.lineTo(LEGEND_X_LOCATION, 500);
		c.lineTo(1000,500);
		c.lineTo(1000, 0);
		c.lineTo(LEGEND_X_LOCATION, 0);
		c.closePath();
		c.fill();
		
		c.fillStyle = '#000';
		c.font = 'bold 16px sans-serif';
		c.textBaseline = 'bottom';
		c.fillText("LEGEND", ((1000-LEGEND_X_LOCATION)/2) - 40 + LEGEND_X_LOCATION, LEGEND_Y_LOCATION);
		
		c.stroke();
		
		for (var i=0; i< this.buttons.length; i++) {
			this.buttons[i].mydraw(c, globgs);
		}
	}

}