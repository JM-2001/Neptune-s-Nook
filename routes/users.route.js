"use strict";
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const isAdmin = require('../auth/auth.middleware');


router.get("/all", usersController.getAll);
router.get('/register', function (req, res) {
    res.render("user/register", { title: "Register" })
    //res.render("user/register", { title: "Register", message: req.flash('error')[0] })
});
router.get("/:email", usersController.getOneByEmail);
router.post("/new", usersController.createNewUser);
router.get("/type/:id", usersController.getUserType);
router.get("/admin/bulk-upload", isAdmin, usersController.getBulkUploadPage);



module.exports = router;
