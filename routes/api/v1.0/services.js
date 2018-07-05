var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");
//var Inmueble = require("../../../database/collections/inmueble");
var fs = require('fs');
var User = require("../../../database/collections/user");
var Datos_Anuncio = require("../../../database/collections/datos_anuncio");
var Img = require("../../../database/collections/img");
var Mapa = require("../../../database/collections/mapa");
var Vecindario = require("../../../database/collections/vecindario");


//var Img = require("../../../database/collections/img");
//var Vecindario = require("../../../database/collections/vecindario");
//var Casa = require("../../../database/collections/home");

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








//publicar anuncio

router.post("/datos_anuncio",(req, res) => {
//validacion
  var datos_anuncio = {
    nombre_a : req.body.nombre_a,
    email_a: req.body.email_a,
    telefono_a : req.body.telefono_a,
    operacion_a : req.body.operacion_a,
    tipo_inmueble_a: req.body.tipo_inmueble_a,
    precio_a: req.body.precio_a,
    superficie_a: req.body.superficie_a,
    num_hab_a: req.body.num_hab_a,
    num_banos_a: req.body.num_banos_a,
    num_plantas_a: req.body.num_plantas_a,
    ascensor_a: req.body.ascensor_a,
    aire_a: req.body.aire_a,
    lat_a :req.body.lat_a,
    lon_a :req.body.lon_a,
    calefaccion_a: req.body.calefaccion_a,
    frase_destacada_a: req.body.frase_destacada_a,
    ubicacion_a: req.body.ubicacion_a,
    observaciones_a: req.body.observaciones_a,
    gallery:"",
    imagen: "",
    correo : req.body.correo

    };
  User.findOne({email : req.body.correo}).exec((error, docs) => {
    //User.findOne({
    if(error){
      res.status(200).json({
        "msn" : error
      })
      return
    }
    if(docs != null){
      var id= docs._id;
      datos_anuncio.user = id;

      //console.log(inmuebles);
      var homeData = new Datos_Anuncio(datos_anuncio);
      var id_in = homeData._id;
      homeData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito",
            "imn" : id_in

          })

      }).catch((err) => {
        res.status(400).json({
          "msn" : err
        })
      });
    }
    else{
      res.status(200).json({
        "msn" : "El usuario no esta Registrado"
      })
    }
  })
});




//leer propiedades_inmueeble
router.get("/datos_anuncio",(req,res,next) => {
  Datos_Anuncio.find({}).exec( (error,docs) =>{
    res.status(200).json(docs);
  })
});

//cargar inmueble por id
router.get(/datos_anuncio\/[a-z0-9]{1,}$/, (req, res) => {
   var url = req.url;
   var id = url.split("/")[2];
   Datos_Anuncio.findOne({ _id : id}).exec( (error, docs) => {  //

    if (docs != null) {
         res.status(200).json(docs);
         return;
     }

     res.status(200).json({
       "msn" : "No existe el inmueble"
     });
   })
 });




// leer un inmueble por id
//router.get(/inmueble:""\/[a-z0-9]{1,}$/, req, res) => {
  //var url =req.url;
  //var id =url.split
//}




//meter usuario
router.post("/user", (req, res) => {
  //validacion
  if(req.body.nombre_u == "" && req.body.email_u ==""){
   res.status(400).json({
     "msn" : "formato incorrecto"
   });
   return;
 }
var user = {
   nombre_u : req.body.nombre_u,
   email_u : req.body.email_u,
   contrasena_u : req.body.contrasena_u,
   contrasena_u_c : req.body.contrasena_u_c
};
      var userData = new User(user);
      userData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito"
          });
      });
});





//cargar un usuario
router.get("/user",(req,res,next) => {
  User.find({}).exec( (error,docs) =>{
    res.status(200).json(docs);
  })
});

//cargar usuario por id
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
   var url = req.url;
   var id = url.split("/")[2];
   User.findOne({_id : id}).exec( (error, docs) => {
     if (docs != null) {
         res.status(200).json(docs);
         return;
     }

     res.status(200).json({
       "msn" : "No existe el usario "
     });
   })
 });

 //eliminar un usuario

router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
 var url = req.url;
 var id = url.split("/")[2];
 User.find({_id : id}).remove().exec( (err, docs) => {
     res.status(200).json(docs);
 });
});


router.patch(/mapa\/[a-z0-9]{1,}$/, (req, res) => {
  //validacion
  var url = req.url;
  var id = url.split("/")[2];

  var img = {
  lat : req.body.lat,
  lon : req.body.lon
  };


  Datos_Anuncio.Update({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

      var userData = new User(user);
      userData.save().then( () => {
          res.status(200).json({
            "msn" : "Registrado con exito"
          });
      });
});
});



//mapas



//subir imagen
router.post(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        idhome: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:5000" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          gallery: new Array()
        }
        Datos_Anuncio.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);
          var data = docs.gallery;
          var aux = new  Array();
          if (data.length == 1 && data[0] == "") {
            home.gallery.push("/api/v1.0/homeimg/" + infoimg._id)
          } else {
            aux.push("/api/v1.0/homeimg/" + infoimg._id);
            data = data.concat(aux);
            home.gallery = data;
          }
          Datos_Anuncio.findOneAndUpdate({_id : id}, home, (err, params) => {
              if (err) {
                res.status(500).json({
                  "msn" : "error en la actualizacion del usuario"
                });
                return;
              }
              res.status(200).json(
                req.file
              );
              return;
          });
        });
      });
    }
  });
});

//obtener la imagen
//en la url se envia con la id de la foto o imagen registrada
router.get(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(id)
  Img.findOne({_id: id}).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn": "Sucedio algun error en el servicio"
      });
      return;
    }
    else{
      if(docs){
        //regresamos la imagen deseada
        var img = fs.readFileSync("./" + docs.physicalpath);
        //var img = fs.readFileSync("./public/avatars/img.jpg");
        res.contentType('image/jpeg');
        res.status(200).send(img);
        //regresamos la imagen deseada
      }
      else{
        res.status(424).json({
          "msn": "La solicitud falló, ,la imagen fue eliminada"
        });
        return;
      }
    }

  });
});


//ruta para actualizar un anuncio segun los campos que se reciban
router.patch(/mapa\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var datos_anuncio = {};
  //aqui cargamos todos los campos recibidos en este caso latitud y longitud
  for (var i = 0; i < keys.length; i++) {
    datos_anuncio[keys[i]] = req.body[keys[i]];
  }
  //Hacemos la actualizacion
  Datos_Anuncio.updateOne({_id: id}, datos_anuncio, (err, doc) => {
      if(err || doc.n==0) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      //devolvemos el documento actualizado
      res.status(200).json(doc);
      return;

  });
});

///esto de aqui les puede servir para insertar el vecindario el modelo esta en la carpeta collections
router.post("/vecindario", (req, res) => {
  //se obviaron los controles alv
  var vecindario = {
    departamento :  req.body.departamento,
    nombre :  req.body.nombre,
    zoom  :  req.body.zoom,
    lat : req.body.lat,//aqui recibimos la posicion central del vecindario lat
    lng : req.body.lng,//aqui recibimos la posicion central del vecindario lng //
    coordenadas : req.body.coordenadas,//aqui recibimos un array de puntos [lat,lng,lat,lng,etc..]
  };
  var vecindarioData = new Vecindario(vecindario);
  vecindarioData.save().then( (doc) => {
    console.log('post req');
    res.status(200).json({
      "msn" : "vecindario Registrado con exito ",
      "doc" : doc._id
    });
  }).catch(err => {
    //console.log(err);
    res.status(500).json({
      error : err
    });
  });
});
//recuperamos todos los vecindarios
router.get("/vecindario", (req, res, next) => {
  Vecindario.find({}).exec( (error, docs) => {
    //console.log(docs)
    if (error) {
      res.status(500).json({error : error});
      return;
    }
    res.status(200).json(docs);
  })

});
//recuperamos solo un vecindario
router.get(/vecindario\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Vecindario.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el vecindario"
    });
  })
});
//Aqui Actualizamos los campos que se reciben de un vecindario
router.patch(/vecindario\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var vecindario = {};
  //aqui cargamos todos los campos recibidos
  for (var i = 0; i < keys.length; i++) {
    vecindario[keys[i]] = req.body[keys[i]];
  }
  //Hacemos la actualizacion
  Vecindario.updateOne({_id: id}, vecindario, (err, doc) => {
      if(err || doc.n==0) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      //devolvemos el documento actualizado//pueden devolver tb otro dato
      res.status(200).json(doc);
      return;

  });
});
///Aqui termina los servicios pa el vecindario




module.exports = router;
