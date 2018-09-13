var express = require('express')
var router = express.Router()
const knex = require('./user.js')
const passport = require('./local.js')

router.post('/register', (req, res) => {
  knex
    .from('user')
    .insert({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    })
    .then(() => {
      res.json({ success: true, message: "Data successfully inserted." })
    })
    .catch(() => {
      res.json({ success: false, message: "Error in adding user. Please try again." })
    })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});

module.exports = router
