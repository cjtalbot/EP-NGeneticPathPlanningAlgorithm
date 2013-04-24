//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This is the main set of functions for performing the genetic path planning
//				algorithms in the application
//
//  Method Summary :
//			runpath()
//				Starts the genetic path planning algorithm and initializes the first
//					100 paths with random values
//			runfirstiterations()
//				Runs 4 rounds of 50 generations of genetic mutations of the paths for
//					the algorithm
//			runlastiterations()
//				Runs the last round of 50 generations of genetic mutations of the paths
//					for the algorithm and chooses the best path to follow
//			moverobot()
//				Initiates the robot's movement across the best path (viable) found by
//					the genetic planning algorithm
//			runoneiteration()
//				Runs one generation of genetic mutations of the paths
//			OPERFUNCS[0](path1,path2)
//				Performs the Add mutation for one path
//			OPERFUNCS[1](path1,path2)
//				Performs the Delete mutation for one path
//			OPERFUNCS[2](path1,path2)
//				Performs the Crossover mutation for one path using the two paths
//			OPERFUNCS[3](path1,path2)
//				Performs the Mutate mutation for one path
//			OPERFUNCS[4](path1,path2)
//				Performs the Swap mutation for one path
//
//  --------------------------------------------------------------------------------------

// all my runpath code, genetic algorithms for paths, etc go here
var allpaths = [];
var gspaths = [];
var MAXNUMPATHS = 100;//100;
var MAXPATHLENGTH = 15;
var MINPATHLENGTH = 2;
var NUMOPERATIONS = Math.floor(Math.random()*50);//Math.floor(Math.random()*50); 
var NUMITERATIONS = 50;
var round = 0;
var MAXROUNDS = 5;

var OPERFUNCS = {
	
//  --------------------------------------------------------------------------------------
//  Name: OPERFUNCS[0]
//
//	Description:
//		Performs the Add mutation for one path
//	
//	Inputs:
//		path1 - first path to use
//		path2 - second path to use
//
//	Outputs:
//		result - new / mutated path
//
//  --------------------------------------------------------------------------------------
		// ADD
		0: function(path1, path2) {
			// only work with path1
			var numposs = path1.numnodes-2;
			var where = Math.floor(Math.random()*(numposs-1))+1;
			var result = null;
			// only add if have less than MAXPATHLENGTH nodes
			if (numposs < MAXPATHLENGTH) {
				result = new Path(numposs+1, path1.nodes[0], path1.nodes[path1.numnodes-1]); // need this to be a new path, but with specific settings
				for (var i=1; i<where;i++) {
					result.updNode(i, path1.nodes[i].x, path1.nodes[i].y);
				}
				result.updNode(where, Math.floor(Math.random()*800), Math.floor(Math.random()*500));
				result.updNode(where+1, path1.nodes[where].x, path1.nodes[where].y);
				for (var j=where+1; j<path1.numnodes; j++) {
					result.updNode(j+1, path1.nodes[j].x, path1.nodes[j].y);
				}
			} else {
				// try path2, just so we get something
				numposs = path2.numnodes-2;
				where = Math.floor(Math.random()*(numposs-1))+1;
				if (numposs < MAXPATHLENGTH) {
					result = new Path(numposs+1, path2.nodes[0], path2.nodes[path2.numnodes-1]); // need this to be a new path, but with specific settings
					for (var i=1; i<where;i++) {
						result.updNode(i, path2.nodes[i].x, path2.nodes[i].y);
					}
					result.updNode(where, Math.floor(Math.random()*800), Math.floor(Math.random()*500));
					result.updNode(where+1, path2.nodes[where].x, path2.nodes[where].y);
					for (var j=where+1; j<path2.numnodes; j++) {
						result.updNode(j+1, path2.nodes[j].x, path2.nodes[j].y);
					}
				} else {
					//myconsole.update("ADD RETURNING NULL - length of 1 is "+path1.numnodes+", and 2 is "+path2.numnodes);
					return null; // can't add to this path
				}
			}
			if (path1.nodes[path1.nodes.length] !== result.nodes[result.nodes.length]) {
				myconsole.update("ADD Turned "+path1.print()+" and "+path2.print()+" into "+result.print());
			}
			
			return result;
		},
		
//  --------------------------------------------------------------------------------------
//  Name: OPERFUNCS[1]
//
//	Description:
//		Performs the Delete mutation for one path
//	
//	Inputs:
//		path1 - first path to use
//		path2 - second path to use
//
//	Outputs:
//		result - new / mutated path
//
//  --------------------------------------------------------------------------------------
		// DELETE
		1: function(path1, path2) {
			// only work with path1
			var numposs = path1.numnodes-2;
			var where = Math.floor(Math.random()*(numposs-1))+1;
			var result = null;
			// only add if have less than MAXPATHLENGTH nodes
			if (numposs > MINPATHLENGTH) {
				result = new Path(numposs-1, path1.nodes[0], path1.nodes[path1.numnodes-1]); // need this to be a new path, but with specific settings
				for (var i=1; i<where;i++) {
					result.updNode(i, path1.nodes[i].x, path1.nodes[i].y);
				}
				// don't copy the where location one over
				for (var j=where+1; j<path1.numnodes; j++) {
					result.updNode(j-1, path1.nodes[j].x, path1.nodes[j].y);
				}
			} else {
				// try path2, just so we get something
				numposs = path2.numnodes-2;
				where = Math.floor(Math.random()*(numposs-1))+1;
				if (numposs > MINPATHLENGTH) {
					result = new Path(numposs-1, path2.nodes[0], path2.nodes[path2.numnodes-1]); // need this to be a new path, but with specific settings
					for (var i=1; i<where;i++) {
						result.updNode(i, path2.nodes[i].x, path2.nodes[i].y);
					}
					for (var j=where+1; j<path2.numnodes; j++) {
						result.updNode(j-1, path2.nodes[j].x, path2.nodes[j].y);
					}
				} else {
					//myconsole.update("DELETE RETURNING NULL - length of 1 is "+path1.numnodes+", and 2 is "+path2.numnodes);
					return null; // can't add to this path
				}
			}
			if (path1.nodes[path1.nodes.length] !== result.nodes[result.nodes.length]) {
				myconsole.update("DELETE Turned "+path1.print()+" and "+path2.print()+" into "+result.print());
			}
			return result;
		},
		
//  --------------------------------------------------------------------------------------
//  Name: OPERFUNCS[2]
//
//	Description:
//		Performs the Crossover mutation for one path
//	
//	Inputs:
//		path1 - first path to use
//		path2 - second path to use
//
//	Outputs:
//		result - new / mutated path
//
//  --------------------------------------------------------------------------------------
		// CROSSOVER of first half = path1, second half = path2
		2: function(path1, path2) {
			var numposs = Math.min(path1.numnodes, path2.numnodes);
			numposs = numposs - 2;
			var where = Math.floor(Math.random()*(numposs-1))+1;
			var result = new Path(path2.numnodes-2, path1.nodes[0], path2.nodes[path2.numnodes-1]);
			for (var i=1; i < path2.numnodes; i++) {
				if (i >= where) {
					result.updNode(i, path2.nodes[i].x, path2.nodes[i].y);
				} else {
					result.updNode(i, path1.nodes[i].x, path1.nodes[i].y);
				}
			}
			if (path1.nodes[path1.nodes.length] !== result.nodes[result.nodes.length]) {
				myconsole.update("CROSSOVER Turned "+path1.print()+" and "+path2.print()+" into "+result.print());
			}
			return result;
		},
		
//  --------------------------------------------------------------------------------------
//  Name: OPERFUNCS[3]
//
//	Description:
//		Performs the Mutate mutation for one path
//	
//	Inputs:
//		path1 - first path to use
//		path2 - second path to use
//
//	Outputs:
//		result - new / mutated path
//
//  --------------------------------------------------------------------------------------
		// MUTATION
		3: function(path1, path2) {
			// only use path1
			var numposs = path1.numnodes - 2;
			var where = Math.floor(Math.random()*(numposs-1))+1;
			var result = new Path(numposs, path1.nodes[0], path1.nodes[path1.numnodes-1]);
			for (var i=1; i < path1.numnodes-1; i++) {
				result.updNode(i, path1.nodes[i].x, path1.nodes[i].y);
			}
			result.updNode(where, Math.floor(Math.random()*800), Math.floor(Math.random()*500));
			if (path1.nodes[path1.nodes.length] !== result.nodes[result.nodes.length]) {
				myconsole.update("MUTATION Turned "+path1.print()+" and "+path2.print()+" into "+result.print());
			}
			return result;
			
		},
		
//  --------------------------------------------------------------------------------------
//  Name: OPERFUNCS[4]
//
//	Description:
//		Performs the Swap mutation for one path
//	
//	Inputs:
//		path1 - first path to use
//		path2 - second path to use
//
//	Outputs:
//		result - new / mutated path
//
//  --------------------------------------------------------------------------------------
		// SWAP
		4: function(path1, path2) {
			var numposs = path1.numnodes - 2;
			var where = Math.floor(Math.random()*(numposs-2))+1;
			var result = new Path(numposs, path1.nodes[0], path1.nodes[path1.numnodes-1]);
			for (var i=1; i < path1.numnodes; i++) {
				result.updNode(i, path1.nodes[i].x, path1.nodes[i].y);
			}
			var temp = {x:result.nodes[where].x, y:result.nodes[where].y};
			result.updNode(where, result.nodes[where+1].x, result.nodes[where+1].y);
			result.updNode(where+1, temp.x, temp.y);
			if (path1.nodes[path1.nodes.length] !== result.nodes[result.nodes.length]) {
				myconsole.update("SWAP Turned "+path1.print()+" and "+path2.print()+" into "+result.print());
			}
			return result;
		}
	}

//  --------------------------------------------------------------------------------------
//  Name: runpath
//
//	Description:
//		Starts the genetic path planning algorithm and initializes the first
//			100 paths with random values
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function runpath() {
	// initialize all paths
	var temppath = null;
	var startnode = new Node(robot.center.x, robot.center.y);
	var goalnode = new Node(goal.center.x, goal.center.y);
	for (var i=0; i<MAXNUMPATHS; i++) {
		temppath = new Path(Math.floor(Math.random()*12)+3, startnode, goalnode);
		gspaths.push(globgs.addEntity(temppath));
	}
	// draw all paths
	
	// evaluate all paths!!!!
	for (var m=0; m< allpaths.length; m++) {
		if (allpaths[m].nodes[allpaths[m].numnodes-1].x != goal.center.x && allpaths[m].nodes[allpaths[m].numnodes-1].y != goal.center.y) {
			myconsole.update("Allpath "+m+" has a wrong goal!  "+allpaths[m].print());
		}
	}
	// pause
	myconsole.update("Viewing all initialized paths")
	setTimeout(runfirstiterations, 5000);
}

//  --------------------------------------------------------------------------------------
//  Name: runfirstiterations
//
//	Description:
//		Runs 4 rounds of 50 generations of genetic mutations of the paths for
//			the algorithm
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function runfirstiterations() {
	round++;
	if (round < MAXROUNDS) {
		// run first y iterations
		for (var i=0; i< NUMITERATIONS; i++) {//50; i++) {
			runoneiteration();
		}
		
		// draw all paths
		//pause
		myconsole.update("Viewing all paths after "+(NUMITERATIONS*round)+" generations ("+allpaths.length+" paths)");
		setTimeout(runfirstiterations, 5000);
	} else {
		setTimeout(runlastiterations, 500);
	}
	
}

//  --------------------------------------------------------------------------------------
//  Name: runlastiterations
//
//	Description:
//		Runs the last round of 50 generations of genetic mutations of the paths
//			for the algorithm and chooses the best path to follow
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function runlastiterations() {
	
	// run last x iterations
	for (var i=0; i<NUMITERATIONS;i++){//50; i++) {
		runoneiteration();
	}
	
	// find best solution and delete all others
	var best = allpaths[0];
	var bestnum = 0;
	for (var j=1; j<allpaths.length; j++) {
		if (allpaths[j].better(best)){//allpaths[j].quality > best.quality) {
			best = allpaths[j];
			bestnum = j;
		}
	}
	
	allpaths[bestnum].best = true;

	var totnum = allpaths.length;
	var ctr = 0;
	while(ctr < bestnum) {
		globgs.delEntity(gspaths[0]);
		gspaths.splice(0,1);
		allpaths.splice(0,1);
		ctr++;
	}
	ctr++; // to skip best
	while (ctr < totnum) {
		globgs.delEntity(gspaths[1]);
		gspaths.splice(1,1);
		allpaths.splice(1,1);
		ctr++;
	}

	// draw final path
	//pause
	myconsole.update("Viewing chosen path after "+(NUMITERATIONS*round)+" generations, with distance = "+parseFloat(Math.round(allpaths[0].pathlength * 100) / 100).toFixed(2)+", quality ="+parseFloat(Math.round(allpaths[0].quality * 100) / 100).toFixed(2));
	if (allpaths[0].viable) {
		setTimeout(moverobot, 5000);
	} else {
		myconsole.update("Best path generated is not viable - cancelling movement.");
		setTimeout(doneRunning, 5000);
	}
	round = 0;
}

//  --------------------------------------------------------------------------------------
//  Name: moverobot
//
//	Description:
//		Initiates the robot's movement across the best path (viable) found by
//			the genetic planning algorithm
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function moverobot() {
	// move the robot on the screen slowly
	myconsole.update("Moving robot along chosen path");
	MODE='move';
	
}

//  --------------------------------------------------------------------------------------
//  Name: runoneiteration
//
//	Description:
//		Runs one generation of genetic mutations of the paths
//	
//	Inputs:
//		none
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------
function runoneiteration() {
	
	var operations = [];
	var oparents = [];
	var results = [];
	var maxtries = 0;
	
	// choose x random operations
	for (var i=0; i< NUMOPERATIONS;i++) {
		maxtries = 0;
		operations[i] = Math.floor(Math.random()*5);
		// choose one or two "parents" for each operation - based on need for the operation
		oparents[i] = {path1:allpaths[Math.floor(Math.random()*(allpaths.length-1))], path2:allpaths[Math.floor(Math.random()*(allpaths.length-1))]};
		// make sure the two paths are not the same - if they are, find another second path
		while (oparents[i].path1 === oparents[i].path2 && maxtries < 10) {
			oparents[i].path2 = allpaths[Math.floor(Math.random()*(allpaths.length-1))];
			maxtries++;
		}
		
		// perform operation
		results[i] = OPERFUNCS[operations[i]](oparents[i].path1, oparents[i].path2);
		if (results[i] != null) {
			gspaths.push(globgs.addEntity(results[i]));
		} else {
			i--; // re-run this one
		}
		// evaluate the new paths generated!!!
		
	}
	
	var worst = allpaths[0];
	var worstnum = 0;
	// replace worst x paths with the x new children
	for (var j=0; j<NUMOPERATIONS; j++) {
		// find worst path in allpaths
		worst = allpaths[0];
		worstnum = 0;
		for (var k=0; k<allpaths.length; k++) {

			if (!allpaths[k].better(worst)) {//allpaths[k].quality < worst.quality) {
				worst = allpaths[k];
				worstnum = k;
			}
		}
		
		// delete it
		globgs.delEntity(gspaths[worstnum]);
		gspaths.splice(worstnum, 1);
		allpaths.splice(worstnum, 1);

	}
	
	for (var m=0; m< allpaths.length; m++) {
		if (allpaths[m].nodes[allpaths[m].numnodes-1].x != goal.center.x && allpaths[m].nodes[allpaths[m].numnodes-1].y != goal.center.y) {
			myconsole.update("Allpath "+m+" has a wrong goal!  "+allpaths[m].print());
		}
	}
}
