//  Christine Talbot
//  CS 8151
//  Project
//  Due 4/25/13
// 
//  Description :
//  		This object is used for putting information out to the console for user 
// 				feedback on what is happening.  It will keep a running tally of all 
// 				status updates, in reverse order.
//
//  Method Summary :
//			this.update(appendtext)
//				Used to add new events to the console on the screen
//			getTimeStamp()
//				Gets a formatted timestamp
// 
//  --------------------------------------------------------------------------------------

// Console Global
var MAXLENGTH = 50;

//  --------------------------------------------------------------------------------------
//  Name: MyConsole
//
//	Description:
//		MyConsole Object Initialization
//	
//	Inputs:
//		none
//
//	Outputs:
//		console - new object
//
//  --------------------------------------------------------------------------------------
function MyConsole() {
	this.text = "";
	this.numlines = 0;

//  --------------------------------------------------------------------------------------
//  Name: update
//
//	Description:
//		Used to add new events to the console on the screen
//	
//	Inputs:
//		appendtext - text to append to the current list of events
//
//	Outputs:
//		none
//
//  --------------------------------------------------------------------------------------	
	this.update = update;
	function update(appendtext) {
		this.numlines = this.numlines+1;
		var temparr;
		var shortarr;
		var tempstr = this.text;
		if (this.numlines > MAXLENGTH) {
			// too long, so lets remove the oldest stuff
			var temparr = this.text.split("<br>");
			//console.log(temparr+"\n");
			var shortarr = temparr.splice(0,temparr.length-1);
			//console.log(shortarr+"\n");
			//console.log(temparr.splice(0,temparr.length-1));
			var tempstr = shortarr.join("<br>");
			//console.log(tempstr+"\n");
		}
		this.text = getTimeStamp()+"&nbsp;&nbsp;"+appendtext +"<br>"+ tempstr;//this.text;
		document.getElementById("output").innerHTML = this.text;
	}

//  --------------------------------------------------------------------------------------
//  Name: getTimeStamp
//
//	Description:
//		Gets a formatted timestamp
//	
//	Inputs:
//		none
//
//	Outputs:
//		str - formatted timestamp as a string
//
//  --------------------------------------------------------------------------------------	
	function getTimeStamp() {
	    var str = "";
	
	    var currentTime = new Date();
	    var hours = currentTime.getHours();
	    var minutes = currentTime.getMinutes();
	    var seconds = currentTime.getSeconds();
	    var msecs = currentTime.getMilliseconds();
	
	    if (minutes < 10) {
	        minutes = "0" + minutes;
	    }
	    if (seconds < 10) {
	        seconds = "0" + seconds;
	    }
	    if (msecs < 10) {
	    	msecs = "00" + msecs;
	    } else if (msecs < 100) {
	    	msecs = "0" + msecs;
	    }
	    str += hours + ":" + minutes + ":" + seconds + "." + msecs;
	    
	    return str;
	}
	

} // end object