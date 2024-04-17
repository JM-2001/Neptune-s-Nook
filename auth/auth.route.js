const express = require('express');
const router = express.Router();
const passport = require('./auth.passport'); // adjust this path to your auth.passport.js file

router.get('/login', function (req, res) {
    res.render("user/login", { title: "Login", message: req.flash('error')[0] })
});

/*
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            //return res.status(200).json({ status: 'success', code: 'authorized' });
            return res.redirect('/');
        });
    })(req, res, next);
});
*/

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/auth/login'); // Change this line
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logOut(function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 'error', code: 'server error' });
        }
        return res.redirect('/');
    });
});


router.post('/logout', function (req, res) {
    if (!req.user) {
        return res.json({ status: 'error', code: 'unauthorized' });
    }

    req.logout();

    // You can check if the user is still in the session to confirm they have been logged out
    if (req.user) {
        return res.status(400).json({ status: 'error', code: 'server error' });
    }

    return res.status(200).json({ status: 'success', code: 'logged out'});
});


router.get('/status', function (req, res) {
    console.log('User:', req.user);
    console.log('Session:', req.session);

    if (req.user) {
        res.json({ status: 'User is logged in', user: req.user });
    } else {
        res.json({ status: 'User is not logged in' });
    }
});

module.exports = router;