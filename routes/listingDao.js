var express = require("express");
var router = express.Router();
var monk = require("monk");

//	var mongo = require("mongodb");

var db = monk("localhost:27017/RealEstates");

router.get("/", function(req, resp) {
	var collection = db.get("Listings");
//	var doc_id = new mongo.ObjectId("574a9eff58adc46a36c1b74a");
	var pageSize = 6;
	var options = {
		"limit": pageSize,
		"sort": {_id: -1}
	};
	// Notice that the first argument in find() is for fields conditions like 
	// collection.find({Bedrooms: "2"}, options, function(err, data) { ... }) or like
	// collection.find({Bedrooms: {$gt: "2"}}, options, function(err, data) {
	// Also notice the quotes.
	// For _id's one can write: collection.find({_id: {$gt: doc_id}}, options, function(err, data) {
	collection.find({}, options, function(err, data) {
		if (err) throw err;
		resp.json(data);
	});
});

router.get('/:n',function(req,resp){
	var collection = db.get('Listings');
	var pageSize = 6;
	var n = req.params.n;
	var options = {
		"limit": pageSize,
		"sort": {_id: -1},
		"skip": (n - 1) * pageSize
	};
	collection.find({}, options, function(err, data) {

		if (err) throw err;
		resp.json(data);
	});
})



module.exports = router;