const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');
const bcrypt = require('bcrypt');

/* THIS CAN STAY
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await User.getOneByEmail(email);
        if (!user) {
            return done(null, false, { message: 'No user found.' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
*/

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await User.getOneByEmail(email);
        if (!user) {
            return done(null, false, { message: 'No user found.' });
        }
        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser(function (user, done) {
    console.log('Serializing user:', user);
    done(null, user.user_id);
});

passport.deserializeUser(async function (id, done) {
    console.log('Deserializing user:', id);
    try {
        const user = await User.getOneById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;