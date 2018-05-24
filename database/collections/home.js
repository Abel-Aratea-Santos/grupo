const mongoose = require("../connect");
var casaSchema = {
  departamento:String,
  nombre:String,
  zoom:Number,
  lat:String,
  lng:String,
  idVecindario:String,
};
var casa = mongoose.model("casa", casaSchema);
module.exports = casa;
