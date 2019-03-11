var mongoose = require("mongoose");
var schema = new mongoose.schema({
	Name:String,
	current_trip:String,
	Past_Trips:[String]
	Stats:{}

})