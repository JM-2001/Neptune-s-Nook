"use strict";
const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.get("/all", cartController.getAll);
router.get("/allCartProducts", cartController.getAllCartProducts);
router.get("/getCart/:cart_id/:user_id", cartController.getAllCartProductsByCartIdAndUserId);
router.get("/getCart/:user_id", cartController.getAllCartProductsByUserId);

router.post("/addToCart/:user_id", cartController.addToCart);
router.post("/updateProductQuantity/:cart_id/:product_id", cartController.updateCartProductQuantity);
router.post("/deleteCartProduct/:cart_id/:product_id", cartController.deleteCartProduct);

router.post("/markCartAsPurchased/:cart_id", cartController.markCartAsPurchased);

module.exports = router;