/*
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');

/*
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        // Find user in your database
        const user = await User.getOneByEmail(email);
        if (!user) {
            console.log('No user found with email:', email);
            return done(null, false, { message: 'No user found.' });
        }
        // Check password
        if (user.password !== password) {
            console.log('Incorrect password for user:', email);
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        console.log('Error fetching user:', err);
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
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
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