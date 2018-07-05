const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var imgSchema = {
  nombre_a : String,
  email_a: String,
  telefono_a : String,
  operacion_a : String,
  tipo_inmueble_a: String,
  precio_a: String,
  superficie_a: String,
  num_hab_a: String,
  num_banos_a: String,
  num_plantas_a: String,
  ascensor_a: String,
  aire_a: String,
  calefaccion_a: String,
  frase_destacada_a: String,
  ubicacion_a: String,
  lan_a : String,
  lon_a : String,
  observaciones_a: String,
  user : String,
  gallery : Array
};
var datos_anuncio = mongoose.model("datos_anuncio", imgSchema);
module.exports = datos_anuncio;
