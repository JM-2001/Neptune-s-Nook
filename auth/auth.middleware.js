"use strict";
function isAdmin(req, res, next) {
    if (req.user && req.user.user_type === 'admin') {
        next();
    } else {
        res.status(403).send('Only admins can access this route');
    }
}

module.exports = isAdmin;