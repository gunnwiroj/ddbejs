var mongoose = require('mongoose');

module.exports.connect = function() {
	mongoose.connect('mongodb://user:user@ds014388.mlab.com:14388/ds_shop');
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}