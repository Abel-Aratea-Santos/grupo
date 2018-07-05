const mongoose = require("../connect");
var coorSchema = {
  nombre_u : String,
  email_u : String,
  contrasena_u : String,
  contrasena_u_c : String,

};
var user = mongoose.model("user", coorSchema);
module.exports = user;
