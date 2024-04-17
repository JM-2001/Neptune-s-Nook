"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/cart.model");

function getAll(req, res, next) {
    let cart = model.getAll();
    try {
        res.json(model.getAll());
    } catch (err) {
        console.error("Error while getting carts ", err.message);
        next(err);
    }
}

function getAllCartProducts(req, res, next) {
    let CartProducts = model.getAllCartProducts();
    try {
        res.json(model.getAllCartProducts());
    } catch (err) {
        console.error("Error while getting carts ", err.message);
        next(err);
    }
}

function getAllCartProductsByCartIdAndUserId(req, res, next) {
    let cart_id = req.params.cart_id;
    let user_id = req.params.user_id;
    try {
        res.json(model.getAllCartProductsByCartIdAndUserId(cart_id, user_id));
    } catch (err) {
        console.error("Error while getting carts ", err.message);
        next(err);
    }
}

function getAllCartProductsByUserId(req, res, next) {
    let user_id = req.params.user_id;
    let loggedIn = req.user ? true : false;
    let user_type = null;
    if (req.user) {
        user_type = req.user.user_type;
    }
    //console.log('User Type:', user_type);
    //console.log('User ID:', user_id);
    try {
        //res.json(model.getAllCartProductsByUserId(user_id));
        res.render('services/cart', {
            cartItems: model.getAllCartProductsByUserId(user_id),
            loggedIn: loggedIn,
            user_type: user_type,
            user_id: user_id,
            title: "Cart"
        });

    } catch (err) {
        console.error("Error while getting carts ", err.message);
        next(err);
    }
}

function abandonInactiveCarts() {
    console.log('Running abandonInactiveCarts function');
    try {
        model.abandonInactiveCarts();
        console.log("Inactive carts have been marked as abandoned");
    } catch (err) {
        console.error("Error while getting carts ", err.message);
    }
}

/*
async function addToCart(req, res, next) {
    let userId = req.params.user_id;
    let productId = req.body.product_id;
    let quantity = req.body.quantity;
    try {
        let cartItems = await model.getAllCartProductsByUserId(userId);
        if (cartItems.length === 0) {
            await model.createCartForUser(userId);
            cartItems = await model.getAllCartProductsByUserId(userId);
        }
        console.log(cartItems[0].cart_id);
        let cartId = cartItems[0].cart_id;
        await model.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Product added to cart' });
    } catch (err) {
        console.error("Error while adding product to cart ", err.message);
        next(err);
    }
}
*/

async function addToCart(req, res, next) {
    let userId = req.params.user_id;
    let productId = req.body.product_id;
    let quantity = req.body.quantity;
    try {
        let cartItems = await model.getAllCartProductsByUserId(userId);
        let cartId;
        if (cartItems.length === 0) {
            model.createCartForUser(userId, (err, id) => {
                if (err) {
                    console.error("Error while creating cart for user ", err.message);
                    next(err);
                } else {
                    cartId = id;
                    model.addProductToCart(cartId, productId, quantity);
                    res.json({ message: 'Product added to cart' });
                }
            });
        } else {
            cartId = cartItems[0].cart_id;
            await model.addProductToCart(cartId, productId, quantity);
            res.json({ message: 'Product added to cart' });
        }
    } catch (err) {
        console.error("Error while adding product to cart ", err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getAllCartProducts,
    getAllCartProductsByCartIdAndUserId,
    getAllCartProductsByUserId,
    abandonInactiveCarts,


    addToCart,
};
