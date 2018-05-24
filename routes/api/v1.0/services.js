var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
var User = require("../../../database/collections/user");
var Img = require("../../../database/collections/img");
var Vecindario = require("../../../database/collections/vecindario");
var Casa = require("../../../database/collections/casa");

var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    console.log("-------------------------");
    console.log(file);
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  }
});
var upload = multer({
  storage: storage
}).single("img");;



//CRUD Create, Read, Update, Delete
//Creation of users
router.post("/userimg", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:5000" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( () => {
        //content-type
        res.status(200).json(
          req.file
        );
      });
    }
  });
});

router.post("/user", (req, res) => {

  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    name : req.body.name,
    altura : req.body.altura,
    peso : req.body.peso,
    edad : req.body.edad,
    sexo : req.body.sexo,
    email : req.body.email
  };
  var userData = new User(user);

  userData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "usuario Registrado con exito "
    });
  });
});

// READ all users
router.get("/user", (req, res, next) => {
  User.find({}).exec( (error, userData) => {
    res.status(200).json(userData);
  })
});
// Read only one user
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});


/* GET home page. */

//-----------------------------------------------------------






router.post("/neighborhood", (req, res) => {
  if (req.body.name == ""  && req.body.codigo == "" && req.body.idciudad == "" && req.body.descripcion == "" && req.body.latitud == "" && req.body.longitud == "") {
    res.status(400).json({
      "msn" : "Los datos incorrectos"
    });
    return;
  }

  var vecindario = {
    name : req.body.name,
    codigo : req.body.codigo,
    idCiudad : req.body.idciudad,
    descripcion : req.body.descripcion,
    latitud:req.body.latitud,
    longitud:req.body.longitud
  };
  var vecindarioData = new Vecindario(vecindario);
  vecindarioData.save().then( () => {
    res.status(200).json({
      "msn" : "Vecindario registrado con exito "
    });
    return;
  });
});

router.get("/neighborhood", (req, res, next) => {
  Vecindario.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  });
});

router.get(/neighborhood\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Home.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null){
      res.status(200).json(docs);
      return;
    }

    res.status(200).json({
      "msn" : "el vecindario no existe"
    });
  });
});

router.post("/home", (req, res) => {
  if (req.body.departamento == "" && req.body.lng == ""){
     res.status(400).json({
        "msn" : "formato incorrecto"
     });
     return;
  }
  var casa = {
    departamento : req.body.departamento,
    nombre : req.body.nombre,
    zoom : req.body.zoom,
    lat : req.body.lat,
    lng : req.body.lng
  };
  var homeData = new Home(home);
  homeData.save().then( () =>{
     res.status(200).json({
        "msn" : "home registradp con exito"
     });
  });
});
//ver todas las casas registradas
router.get("/home", (req, res, next) => {
  Home.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
//ver solo una casa mediante el id
router.get(/home\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Home.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null){
      res.status(200).json(docs);
      return;
    }

    res.status(200).json({
      "msn" : "No existe la casa"
    });
  });
});






module.exports = router;
