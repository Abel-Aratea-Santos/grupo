const mongoose = require("../connect");
var coorSchema = {
  lat:Number,
  lng:Number,
  idCasa:String,
};
var coordenadas = mongoose.model("coordenadas", coorSchema);
module.exports = coordenadas;
