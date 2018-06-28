const mongoose = require("../connect");
var coorSchema = {
  precio : String,
  nombre : String,
  ubicacion : String,
  superficie : String,
  num_banos : String,
  num_plantas : String,
  num_hab : String,
  aire_acondicionado : String,
  calefaccion : String,
  operacion : String,
  t_inmueble :String,
  latitud : Number,
  longitud : Number,
  descripcion : String
};
var inmueble = mongoose.model("inmueble", coorSchema);
module.exports = inmueble;
