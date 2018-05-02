var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  numproduct:{type:String,unique:true},
  title: String,
  type:String,
  cost:Number,
  M:Number,
  L:Number,
  XL:Number,
  description: String,
  image:String
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
