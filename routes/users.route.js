"use strict";
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");


router.get("/all", usersController.getAll);
router.get('/register', function (req, res) {
    res.render("user/register", { title: "Register" })
    //res.render("user/register", { title: "Register", message: req.flash('error')[0] })
});
router.get("/:email", usersController.getOneByEmail);
router.post("/new", usersController.createNewUser);
router.get("/type/:id", usersController.getUserType);

/*
router.post("/new", menucontroller.createNew);
router.get("/search", menucontroller.searchByName);
router.delete("/delete/:id", menucontroller.deleteById);
router.put("/update/:id", menucontroller.update)
*/

module.exports = router;
