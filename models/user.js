var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:{type:String},
  surname:{type:String},
  email:{type:String,unique:true},
  type:{default:'customer',type:String},
  mobile:{type:String},
  address:{type:String},
  password:{type:String}
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
