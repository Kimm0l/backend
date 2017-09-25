/**
 * UserController
 *
 * @description :: Acciones de usuario, obtención de tokens.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    console.log("Create token");
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Las contraseñas no coinciden.'});
    }
    User.findOrCreate({email: req.body.email}, req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },

  suscribir: function (req, res) {
    //FUNCIONA
    var email = req.param("email");
    var group = req.param("group");
    var module = req.param("module");
    console.log("\nsuscribir: " + email + "\ngrupo: " + group + "\nmodule: " + module);

    User.native(function (err, collection) {
      if (err) return res.serverError(err);
      collection.update({email: email}, {$set: {group: group}}, function (err, result) {
        if (err) {
          return res.serverError(err)
        }
      });
    });

    User.native(function (err, collection) {
      if (err) return res.serverError(err);
      collection.update({email: email}, {$push: {devices: module}}, function (err, result) {
        if (err) {
          return res.serverError(err)
        }
      });
    });

    Device.findOrCreate({device: module}, {device: module, group: group}).exec(function (err, result) {
      if (err) return res.serverError(err);
    });

    AlarmsUser.findOrCreate({email: email}, {email: email}).exec(function (err, result) {
      if (err) return res.serverError(err);
    });
  },

  registrar_token: function (req, res) {
    var token = req.param('token');
    var email = req.param('email');
    console.log("\nregistrar_token: " + token + "\nemail:" + email);
    User.native(function (err, collection) {
      if (err) return res.serverError(err);
      collection.update({email: email}, {$set: {token: token}});
      return res.json(200, {email: email, token: token});
    });
  }
};
