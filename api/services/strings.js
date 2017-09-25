/**
 * Created by joamolpe on 3/12/16.
 */

/**
 * Strings de notificaciones
 * @type {string}
 */

module.exports.alerta_encendido = function (device){ return "El disposito ("+device+") se ha encendido";}
module.exports.alerta_encendido_descripcion = "Todo funciona correctamente";
module.exports.alerta_keep_alive_inicial = function (device){ return  "El dispositvo ("+device+") esta en funcionamiento";}
module.exports.alerta_keep_alive_inicial_descripcion = "Comprueba la ubicación actual";
module.exports.alerta_movimiento_inicial = function (device){ return  "El dispositivo  ("+device+") ha empiezado a moverse";}
module.exports.alerta_movimiento_inicial_descripcion = "Comprueba la ubicación actual";
module.exports.alerta_movimiento = function (device){ return "El dispositivo ("+device+") esta en movimiento";}
module.exports.alerta_movimiento_descripcion = "Comprueba la ubicación actual";
module.exports.alerta_keep_alive = function (device){ return "El dispositivo ("+device+") continua en funcionamiento";}
module.exports.alerta_keep_alive_descripcion = "El dispositivo continua en funcionamiento";
module.exports.alerta_reset_primera_fase = function (device){ return "El dispositivo ("+device+") se ha restablecido";}
module.exports.alerta_reset_primera_fase_descripcion = "Todo funciona correctamente";
