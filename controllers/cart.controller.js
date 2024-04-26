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

async function getAllCartProductsByUserId(req, res, next) {
    let user_id = req.params.user_id;
    let loggedIn = req.user ? true : false;
    let user_type = null;
    if (req.user) {
        user_type = req.user.user_type;
    }
    try {
        let cartItems = await model.getAllCartProductsByUserId(user_id);
        let cart = await model.getCartIdByUserId(user_id); // fetch the cart
        let cartId = cart ? cart.cart_id : null; // check if cart is defined before accessing its properties
        let subtotal = 0;
        for (let cartItem of cartItems) {
            subtotal += cartItem.item_quantity * cartItem.product_price;
        }

        let taxes = subtotal * 0.0675;
        let delivery = subtotal > 30 ? 'FREE' : 10;
        let grandTotal = delivery === 'FREE' ? subtotal + taxes : subtotal + taxes + delivery;
        res.render('services/cart', {
            cartItems: cartItems,
            loggedIn: loggedIn,
            user_type: user_type,
            user_id: user_id,
            cartId: cartId, // pass cartId to the template
            title: "Cart",
            subtotal: subtotal.toFixed(2),
            taxes: taxes.toFixed(2),
            delivery: delivery === 'FREE' ? delivery : delivery.toFixed(2),
            grandTotal: grandTotal.toFixed(2)
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

/* THIS CAN STAY
async function addToCart(req, res, next) {
    let userId = null;
    let productId = req.body.product_id;
    let quantity = req.body.quantity;
    if (req.user) {
        userId = req.user.user_id;
    }

    console.log('User ID:', userId);
    try {
        let cart = await model.getCartByUserId(userId);
        console.log('Cart:', cart);
        let cartId;
        if (!cart) {
            cartId = await model.createCartForUser(userId);
            console.log('New cart ID:', cartId);
        } else {
            cartId = cart.cart_id;
        }
        model.addProductToCart(cartId, productId, quantity);
        //res.json({ message: 'Product added to cart' });
        res.redirect('/products/product/' + productId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the product to the cart' });
    }
}
*/

async function addToCart(req, res, next) {
    let userId = null;
    let productId = req.body.product_id;
    let quantity = Number(req.body.quantity); // Ensure quantity is a number
    if (req.user) {
        userId = req.user.user_id;
    }

    console.log('User ID:', userId);
    try {
        let cart = await model.getCartByUserId(userId);
        console.log('Cart:', cart);
        let cartId;
        if (!cart) {
            cartId = await model.createCartForUser(userId);
            console.log('New cart ID:', cartId);
        } else {
            cartId = cart.cart_id;
        }
        // Check if the product already exists in the cart
        let cartProduct = await model.getCartProductByCartIdAndProductId(cartId, productId);
        if (cartProduct) {
            // If the product exists, update the quantity
            let newQuantity = Number(cartProduct.item_quantity) + quantity; // Ensure cartProduct.item_quantity is a number
            model.updateCartProductQuantity(cartId, productId, newQuantity);
        } else {
            // If the product doesn't exist, add it to the cart
            model.addProductToCart(cartId, productId, quantity);
        }
        //res.json({ message: 'Product added to cart' });
        res.redirect('/products/product/' + productId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the product to the cart' });
    }
}

function updateCartProductQuantity(req, res, next) {
    console.log(req.body); // Debug step 1

    let userId = null;
    let cartId = req.body.cartId;
    let productId = req.body.productId;
    let quantity = req.body.quantity;

    console.log(cartId, productId, quantity); // Debug step 2

    if (req.user) {
        userId = req.user.user_id;
    }

    try {
        model.updateCartProductQuantity(cartId, productId, quantity);
        res.redirect('/cart/getCart/' + userId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the product quantity' });
    }
}

async function updateProductQuantity(req, res, next) {
    let cartId = req.params.cartId;
    let productId = req.params.productId;
    let quantity = req.body.quantity;

    try {
        await model.updateCartProductQuantity(cartId, productId, quantity);
        //res.json({ message: 'Product quantity updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the product quantity' });
    }
}

function deleteCartProduct(req, res, next) {
    console.log(req.body); // Debug step 1

    let userId = null;
    let cartId = req.body.cartId;
    let productId = req.body.productId;

    console.log(cartId, productId); // Debug step 2

    if (req.user) {
        userId = req.user.user_id;
    }

    try {
        model.deleteCartProduct(cartId, productId);
        res.redirect('/cart/getCart/' + userId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the product from the cart' });
    }
}

async function markCartAsPurchased(req, res, next) {
    let cartId = req.body.cartId;

    console.log(cartId); // Debug step 2

    
    try {
        model.markCartAsPurchased(cartId);
        res.json({ message: 'Cart marked as purchased' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while marking the cart as purchased' });
    }
}

module.exports = {
    getAll,
    getAllCartProducts,
    getAllCartProductsByCartIdAndUserId,
    getAllCartProductsByUserId,
    abandonInactiveCarts,


    addToCart,
    updateProductQuantity,
    updateCartProductQuantity,
    deleteCartProduct,
    markCartAsPurchased,
};
