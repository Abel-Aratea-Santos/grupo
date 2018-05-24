const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/inmuebles");
module.exports = mongoose;
