// So far looks to be the best way to parse large xml files.
// It automatically generates some $text tags which cause trouble
// when inserted into MongoDB. So I have to replace them.

var fs        = require('fs')
var XmlStream = require('xml-stream') ;
var stream=fs.createReadStream('sampleData.xml');
var xml = new XmlStream(stream);
xml.collect('subitem');
xml.on('endElement: Listing', function(item) {
	var newItem = JSON.stringify(item, null, 4).replace(/\$text/g , "_");
	console.log(newItem);
});