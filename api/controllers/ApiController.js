/**
 * ApiController ALL CORRECT
 *
 * @description :: API REST
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  getLastAlarms: function (req, res) {
    var email = req.param('email');
    console.log("getLastAlarms");
    AlarmsUser.find({email: email}).exec(function (err, result) {
      if (err) return res.serverError(err);
      if (result[0]==null) return res.json(404, {err: "No encontrado."});;
      return res.send(result[0].alarms);
    });
  },

  getAllAlarms: function (req, res){
    AlarmsUser.find().exec(function (err, result) {
      if (err) return res.serverError(err);
      if (result[0]==null) return res.json(404, {err: "No encontrado."});;
      return res.send(result);
    });
  },

  getAlarmsFromDevice: function (req, res) {
    var device = req.param('device');
    console.log("getAlarmsFromDevice");
    Device.find({device: device}).exec(function (err, result) {
      if (err) return res.serverError(err);
      if (result[0]==null) return res.json(404, {err: "No encontrado."});
      console.log(result[0].alarms);
      return res.send(result[0].alarms);
    });
  },

  getPerfil: function (req, res) {
    var email = req.param('email');
    console.log("getPerfil");
    User.find({email: email}).exec(function (err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.json(404, {err: "No encontrado."});
      return res.send(result);
    });
  },

  getDevices: function (req, res) {
    var email = req.param('email');
    console.log("getDevices");
    User.find({email: email}).exec(function (err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.json(404, {err: "No encontrado."});
      return res.send(result[0].devices);
    });
  }
};



