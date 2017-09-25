/**
 * AuthController
 *
 * @description :: Acciones para acceder al backend.
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  signup: function (req, res) {

    console.log("Signup");

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

  login: function (req, res) {

    console.log("Login");

    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    User.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
          res.json(401, {err: 'forbidden'});
        }

        if (!valid) {
          res.json(401, {err: 'invalid email or password'});
        } else {
          res.json(200,{
            user: user,
            token: jwToken.issue({id: user.id})
          });
        }
      });
    })
  },
};
