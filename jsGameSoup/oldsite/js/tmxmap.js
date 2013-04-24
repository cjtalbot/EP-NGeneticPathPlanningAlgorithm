function TMXMap(tmxfile) {
	var xmlhttp = null;
	var me = this;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// when we receive the file
	xmlhttp.onreadystatechange = function() {
		if (typeof xmlhttp != "undefined")	{
			// reponse 4 = 'request complete'
			if (xmlhttp.readyState == 4) {
				me.parse_tmx(xmlhttp.responseXML);
			}
		} else {
			// whut
		}
	};
	
	xmlhttp.open("GET", tmxfile, true);
	xmlhttp.send();
	
	this.parse_tmx = function(xml) {
		// progress callback to say we have loaded the xml file now
		console.log(xml);
		// load all the tile images
		// then trigger the loaded callback
	}
}
