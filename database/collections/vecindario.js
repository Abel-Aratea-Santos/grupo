const mongoose = require("../connect");
var vecindarioSchema = {
  	//id: 124212,
	departamento: String,//“Potosi”
	nombre: String,//“Satelite”
	zoom: Number,// 16,
	lat: Number,//-131.123,
	lng: Number,//-131.124,
	coordenadas:Array//[“-131,123”,“-131,223”,“-131,123”,“-131,223”] array de puntos lat ,lng ,lat,lng
};
var vecindario = mongoose.model("vecindario", vecindarioSchema);
module.exports = vecindario;
