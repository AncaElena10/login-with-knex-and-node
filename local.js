const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport-config.js');
const knex = require('./db.js');
const utils = require('./utils.js');

const options = {};

init();

// passport.use(new LocalStrategy(options, (email, password, done) => {
//   console.log(email)
//   knex('user').where('email', '=', email)
//     .then((user) => {
//       if (!user) return done(null, false);
//       if (!utils.comparePass(password, user.password)) {
//         return done(null, false);
//       } else {
//         return done(null, user);
//       }
//     })
//     .catch((err) => { return done(err); });
// }));


// passport.use('local', new LocalStrategy({
//   emailField: 'email',
//   passwordField: 'password'
// },
//   function (email, password, done) {
//     knex('user').where('email', '=', email)
//       .then((user) => {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect email.' });
//         }
//         if (!user.isValid(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       })
//   }
// ));

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