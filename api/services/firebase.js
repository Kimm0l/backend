/**
 * Created by joamolpe on 1/12/16.
 */
/**
 * Created by Ximo on 05/11/2016.
 * Servicio de conexión con Firebase de Google para las notificaciones push.
 *
 */
var https = require('https');

module.exports.alerta_encendido = function (device, register, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'titulo': strings.alerta_encendido(device),
      'descripcion': strings.alerta_encendido_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });

}

module.exports.alerta_keep_alive_inicial = function (device, register, bateria, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'bateria': bateria,
      'titulo': strings.alerta_keep_alive_inicial(device),
      'descripcion': strings.alerta_keep_alive_inicial_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });


}

module.exports.alerta_movimiento_inicial = function (device, register, bateria, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'bateria': bateria,
      'titulo': strings.alerta_movimiento_inicial(device),
      'descripcion': strings.alerta_movimiento_inicial_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });


}

module.exports.alerta_movimiento = function (device, register, latitud, longitud, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'latitud': latitud,
      'longitud': longitud,
      'titulo': strings.alerta_movimiento(device),
      'descripcion': strings.alerta_movimiento_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });


}

module.exports.alerta_keep_alive = function (device, register, bateria, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'bateria': bateria,
      'titulo': strings.alerta_keep_alive(device),
      'descripcion': strings.alerta_keep_alive_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });


}

module.exports.alerta_reset_primera_fase = function (device, register, bateria, hora) {

  var options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='//TODO: Auth key
    }
  };

  /*
   * Body de la petición
   */

  var post_data = JSON.stringify({
    data: {
      'bateria': bateria,
      'titulo': strings.alerta_reset_primera_fase(device),
      'descripcion': strings.alerta_reset_primera_fase_descripcion,
      'hora': hora
    },
    to: register
  });

  /*
   * Enviamos a Firebase la petición
   */

  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(JSON.stringify(json)))
      });
    });

    //Insertamos el body
    postReq.write(post_data);
    postReq.end();
  });


}





