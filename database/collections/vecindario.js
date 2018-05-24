const mongoose = require("../connect");
var vecindarioSchema = {
  name : String,
  codigo : Number,
  idCiudad : String,
  descripcion : String,
  latitud:Number,
  longitud:Number
};
var vecindario = mongoose.model("vecindario", vecindarioSchema);
module.exports = vecindario;
