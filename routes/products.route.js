"use strict";
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");


router.get("/all", productsController.getAll);
router.get("/category/:category", productsController.getAllByCategory);
router.get("/featured", productsController.getAllByFeatured);
router.get("/product/:id", productsController.getOneById);

/*
router.post("/new", menucontroller.createNew);
router.get("/search", menucontroller.searchByName);
router.delete("/delete/:id", menucontroller.deleteById);
router.put("/update/:id", menucontroller.update)
*/

module.exports = router;
