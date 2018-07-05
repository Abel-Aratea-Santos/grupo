const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var imgSchema = {
  name : String,
  idhome: String,
  physicalpath : String,
  relativepath : String
};
var img = mongoose.model("img", imgSchema);
module.exports = img;
