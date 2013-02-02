function objParse(obj) {
    for (key in obj) {
        //console.log('type: ' + typeof obj[key])
        if(typeof obj[key] === "object") {
            objParse(obj[key]);
        } else {
            console.log(key + ":");
            console.log("    " + obj[key]);
        }
    }
    
}

function trace(msg) {
	if(app.debug) {
        if(window.console) {
		  console.log(msg);
        }
	}
}
