const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport-config.js');
const knex = require('./db.js');
const utils = require('./utils.js');

const options = {};

init();

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username, password, done) {
    knex('user')
      .where('email', '=', username)
      .then((err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValid(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
  }
));

module.exports = passport;
