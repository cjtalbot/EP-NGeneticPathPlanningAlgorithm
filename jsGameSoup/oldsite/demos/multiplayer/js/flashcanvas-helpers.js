document.createElementOverride = document.createElement;
	document.createElement = function(type) {
	if (type.toLowerCase() === "canvas") {
		var canvas = document.createElementOverride(type);
		if (typeof FlashCanvas != "undefined") {
			FlashCanvas.initElement(canvas);
		}
		return canvas;
	} else { // other nodes
		return document.createElementOverride(type);
	}
};
