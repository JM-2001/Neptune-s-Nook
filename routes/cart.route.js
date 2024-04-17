"use strict";
const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.get("/all", cartController.getAll);
router.get("/allCartProducts", cartController.getAllCartProducts);
router.get("/getCart/:cart_id/:user_id", cartController.getAllCartProductsByCartIdAndUserId);
router.get("/getCart/:user_id", cartController.getAllCartProductsByUserId);

router.post("/addToCart/:user_id", cartController.addToCart);

module.exports = router;