/**
 * AlarmsController
 * html pruebs
 * @description :: Entrada de las alarmas e Sigfox
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var utils = require('../services/utils');
var firebase = require('../services/firebase');

module.exports = {

  recibir: function (req, res) {

    console.log("////////////////////NUEVA ALARMA////////////////////")

    var device = req.param('device');
    var data = req.param('data');
    var lat = req.param('lat');
    var lng = req.param('lng');
    console.log("Latitud: " + lat + "\nLongitud: " + lng);
    var tipo = utils.getTipo(data);
    console.log("Tipo: " + tipo);
    var longitud = null;
    var latitud = null;
    var bateria = null;


    var time = utils.getTime();

    console.log("ApiController: send function\nData: " + data);
    console.log(device);

    User.find({devices: device}).exec(function (err, result) {
      if(err) return res.serverError(err);
      if(!result) return res.json(404, {err: "No encontrado el dispositivo."});
      console.log(result);
      for(var i = 0; i < result.length; i++){
          switch (tipo) {
          case 0: //inicio modulo
            firebase.alerta_encendido(device,result[i].token);
            break;
          case 1: // keep alive inicial
            bateria = utils.getBateriaKeepAlive(data);
            firebase.alerta_keep_alive_inicial(device,result[i].token, bateria, time);
            break;
          case 2: // movimiento inicial
            bateria = utils.getBateriaAlertaMov(data);
            firebase.alerta_movimiento_inicial(device,result[i].token, bateria, time);
            break;
          case 3: // movimiento
            latitud = utils.getDataLatitud(data);
            longitud = utils.getDataLongitud(data);
            console.log("///" + latitud + "///" + longitud);
            firebase.alerta_movimiento(device,result[i].token, latitud, longitud, time);
            break;
          case 4: // keep alive
            bateria = utils.getBateriaKeepAlive(data);
            firebase.alerta_keep_alive(device,result[i].token, bateria, time);
            break;
          case 5: // reset primera fase
            bateria = utils.getBateriaReset(data);
            firebase.alerta_reset_primera_fase(device,result[i].token, bateria, time);
            break;
          default:
            break;
        }
        console.log(result[i].email)
        guardarEnUsuario(result[i].email,device,latitud, longitud, time, bateria, tipo);
      }
      guardarEnDispositivo(device,latitud, longitud, time, bateria, tipo);
      return res.send(200);
    });


  }
};


function guardarEnUsuario(email, device, latitud, longitud, time, bateria, tipo){

  AlarmsUser.native(function (err, collection) {
    if (err) return res.serverError(err);
    collection.update({email: email},{$push: {alarms: {device: device, latitud: latitud,longitud: longitud,time: time,bateria: bateria,tipo: tipo}}}, function (err, result) {
      if (err) {return res.serverError(err);}
      console.log("Guardado en AlarmsUser");
    });
  });
}

function guardarEnDispositivo(device, latitud, longitud, time, bateria, tipo){
  Device.native(function(err, collection){
    if(err) return res.serverError(err);
    collection.update({device: device},{$push: {alarms: {device: device, latitud: latitud,longitud: longitud,time: time,bateria: bateria,tipo: tipo}}}, function (err, result) {
      if (err) {return res.serverError(err);}
      console.log("Guardado en Device");
    });
  });
}

