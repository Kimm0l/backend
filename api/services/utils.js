/**
 * Created by joamolpe on 1/12/16.
 *
 * Operaciones para obtener localizaciones, voltimetro del mensaje.
 */

var moment = require('moment');

module.exports.getDataLatitud = function (data) {
  var valor = data.substr(7, 12);
  var additional = data.substr(19,5);
  var result = getLatitud(valor,additional);
  return result;
};

function getLatitud(data,additional){
  var decimal = parseInt(data,16).toString(10);
  console.log("Utils: getLatitud()->"+decimal);
  if(decimal.length<14){
    while (decimal.length < 14) {
      bin = '0' + decimal;
    }
  }
  console.log("Utils: getLatitud()->"+decimal);
  var latitud = decimal.substr(7,7);
  var primera_parte = latitud.substr(0,2);
  var segunda_parte = latitud.substr(2,2);
  var tercera_parte = latitud.subtr(4,3);
  var pre_latitud = primera_parte+"º"+segunda_parte+"."+tercera_parte+"'";
  console.log("Latidud: "+primera_parte+"º"+segunda_parte+"."+tercera_parte+"'");
  var additional_binario = parseInt(additional,16).toString(2);
  var signo_latitud = additional_binario.substr(13,1);
  if(signo_latitud == "1"){
    var result = "-"+pre_latitud;
  }
  return result;
};

function getOldLatitud(data) {
  var bin = parseInt(data, 16).toString(2);
  var enc_latitude;
  var dec_latitude;
  var half_range;
  var result;
  if(bin.length < 48 && bin.length > 40) {
    while (bin.length < 48) {
      bin = '0' + bin;
    }
  }else{
    while (bin.length < 40) {
      bin = '0' + bin;
    }
  }
  console.log(bin);
  var latitude_sign = bin.substr(1, 1);
  if (bin.length == 48) {
    enc_latitude = bin.substr(2, 23);
    dec_latitude = parseInt(enc_latitude, 2).toString(10);
    if (latitude_sign == 1) {
      if (dec_latitude == 8333333) {
        half_range = 18;
      } else {
        half_range = 53;
      }
      result = dec_latitude * 108 + half_range;
      return result/-10000000;
    } else {
      if (dec_latitude == 8333333) {
        half_range = 18;
      } else {
        half_range = 53;
      }
      result = dec_latitude * 108 + half_range;
      return result/10000000;
    }
  } else if (bin.length == 40) {
    enc_latitude = bin.substr(21, 19);
    dec_latitude = parseInt(enc_latitude, 2).toString(10);
    var half_range;
    if (latitude_sign == 1) {
      if (dec_latitude == 52470) {
        half_range = 55;
      } else {
        half_range = 858;
      }
      result = dec_latitude * 1717 + half_range;
      return result/-10000000;
    } else {
      if (dec_latitude == 52470) {
        half_range = 55;
      } else {
        half_range = 858;
      }
      result = dec_latitude * 1717 + half_range;
      return result/10000000;
    }
  } else {
    console.log("Que coño han pasado: " + data);
    return;
  }
}

module.exports.getDataLongitud = function (data) {

  var valor = data.substr(7, 12);
  var result = getLongitud(valor);
  var additional = data.subtr(19,5);
  return result;
};

function getLongitud(data,additional){
  var decimal = parseInt(data,16).toString(10);
  console.log("Utils: getLongitud()->"+decimal);
  if(decimal.length<14){
    while (decimal.length < 14) {
      bin = '0' + decimal;
    }
  }
  console.log("Utils: getLongitud()->"+decimal);
  var longitud = decimal.substr(0,7);
  var primera_parte = longitud.substr(0,2);
  var segunda_parte = longitud.substr(2,2);
  var tercera_parte = longitud.subtr(4,3);
  var pre_longitud = primera_parte+"º"+segunda_parte+"."+tercera_parte+"'";
  console.log("Latidud: "+primera_parte+"º"+segunda_parte+"."+tercera_parte+"'");
  var additional_binario = parseInt(additional,16).toString(2);
  var signo_longitud = additional_binario.substr(12,1);
  if(signo_longitud == "1"){
    var result = "-"+pre_longitud;
  }
  return result;
};

function getOldLongitud(data) {
  var bin = parseInt(data, 16).toString(2);
  var enc_longitude;
  var dec_longitude;
  var half_range;
  var result;
  if(bin.length < 48 && bin.length > 40) {
    while (bin.length < 48) {
      bin = '0' + bin;
    }
  }else{
    while (bin.length < 40) {
      bin = '0' + bin;
    }
  }
  console.log(bin);
  var longitude_sign = bin.substr(0, 1);
  if (bin.length == 48) {
    enc_longitude = bin.substr(25, 23);
    dec_longitude = parseInt(enc_longitude, 2).toString(10);
    if (longitude_sign == 1) {
      if (dec_longitude == 8372093) {
        half_range = 2;
      } else {
        half_range = 107;
      }
      result = dec_longitude * 215 + half_range;
      return result/-10000000;
    } else {
      if (dec_longitude == 8372093) {
        half_range = 2;
      } else {
        half_range = 107;
      }
      result = dec_longitude * 215 + half_range;
      return result/10000000;
    }
  } else if (bin.length == 40) {
    enc_longitude = bin.substr(21, 19);
    longitude_sign = bin.substr(0, 1);
    dec_longitude = parseInt(enc_longitude, 2).toString(10);
    if (longitude_sign == 1) {
      if (dec_longitude == 8372093) {
        half_range = 110;
      } else {
        half_range = 1716;
      }
      result = dec_longitude * 3434 + half_range;
      return result/-10000000;
    } else {
      if (dec_longitude == 8372093) {
        half_range = 110;
      } else {
        half_range = 1716;
      }
      result = dec_longitude * 3434 + half_range;
      return result/10000000;
    }
  } else {
    console.log("Que coño han pasado?" + data);
    return;
  }
}

module.exports.getBateriaKeepAlive = function (data) {

  var result;
  var hex_battery = data.substr(8, 2);
  var mv = ((0.01) * (143 - parseInt(hex_battery, 16).toString(10)));
  if (mv <= 0.96) {
    result = ((0.96 - mv) * 100) / (0.96);
  } else {
    result = 0.00;
  }
  return result;

};

module.exports.getBateriaReset = function (data) {
  var result;
  var hex_battery = data.substr(10, 4);
  if (hex_battery >= 2300) {
    result = ((hex_battery - 2300) * 100) / 980;
  } else {
    result = 0.00;
  }
  return result;
};

module.exports.getBateriaAlertaMov = function (data) {
  var result;
  var hex_battery = data.substr(18, 4);
  if (hex_battery >= 2300) {
    result = ((hex_battery - 2300) * 100) / 980;
  } else {
    result = 0.00;
  }
  return result;
};

module.exports.getTipo = function (data) {
  var tipo;
  var data_inicial = data.substr(0, 16);
  console.log(data_inicial);
  var keep_alive_inicial = data.substr(3, 5);
  var mov_inicial = data.substring(0, 18);
  var movimiento = data.substr(3, 4);
  var efe = data.substr(7,9);
  var keep_alive = data.substr(3, 4);
  var reset_primera_fase = data.substr(0, 10);

  /**
  * Secreto de su
  ^*/
};

module.exports.getTime = function(){
  var time = moment().format('LLL');
  moment.locale('es');
  console.log(time)
  return time;
}
