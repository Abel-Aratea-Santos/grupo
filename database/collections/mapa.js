const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var mapaSchema = new Schema({

  lat : Number,
  lon : Number

});
var mapa = mongoose.model("mapa", mapaSchema);
module.exports = mapa;
