// This one parses xml file in a nice format.
// However, it has a out-of-memory problem when dealling with large xml files.
// Also, I haven't figure out how to add parameters so it only parses a specific tag.
// It seems to parse everything by default.
// TODO: These problem needs to be fixed

var returnJSONResults = function(baseName, queryName) {
    var XMLPath = "oneListing.xml";
    var rawJSON = loadXMLDoc(XMLPath);
    function loadXMLDoc(filePath) {
        var fs = require('fs');
        var xml2js = require('xml2js');
        var json;
        try {
            var fileData = fs.readFileSync(filePath, 'ascii');

            var parser = new xml2js.Parser({explicitArray : false});
            parser.parseString(fileData, function (err, result) {
            	json = JSON.stringify(result, null, 4);
            	console.log(json);
        	});

//			console.log("File '" + filePath + "/ was successfully read.\n");
        	return json;
    	} catch (ex) {console.log(ex)}
	}
}();