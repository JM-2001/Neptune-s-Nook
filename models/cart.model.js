"use strict";
const db = require("./db-conn");

function getAll() {
    let sql = "SELECT * FROM Cart;";
    const data = db.all(sql);
    return data;
};

function getAllCartProducts() {
    let sql = "SELECT * FROM CartProducts;";
    const data = db.all(sql);
    return data;
}

function getAllCartProductsByCartIdAndUserId(cartId, userId) {
    let sql = "SELECT CartProducts.product_id, CartProducts.item_quantity, Cart.cart_id, Cart.user_id FROM CartProducts JOIN Cart on CartProducts.cart_id = Cart.cart_id JOIN Users on Cart.user_id = Users.user_id WHERE Users.user_id = ? AND Cart.cart_id = ? AND Cart.cart_status = lower('New');";
    const data = db.all(sql, cartId, userId);
    return data;
}

function getAllCartProductsByUserId(userId) {
    let sql = "SELECT CartProducts.product_id, CartProducts.item_quantity, Products.product_name, Products.product_img_url, Products.product_price, Cart.cart_id, Cart.user_id FROM CartProducts JOIN Cart on CartProducts.cart_id = Cart.cart_id JOIN Users on Cart.user_id = Users.user_id JOIN Products on CartProducts.product_id = Products.product_id WHERE Users.user_id = ? AND Cart.cart_status = lower('new');";
    const data = db.all(sql, userId);
    return data;
}

function abandonInactiveCarts() {
    const THRESHOLD = 15 * 60 * 1000; // 15mins in milliseconds
    const currentTime = new Date().getTime();
    let sql = "UPDATE Cart SET cart_status = lower('Abandoned') WHERE cart_status = lower('New') AND (? - created_date) > ?;";
    db.run(sql, [currentTime, THRESHOLD], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Inactive carts have been marked as abandoned');
        }
    });
}

/*
function createCartForUser(userId) {
    let sql = "INSERT INTO Cart (user_id, cart_status) VALUES (?, lower('new'));";
    db.run(sql, [userId], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('New cart created for user');
        }
    });
}
*/

function createCartForUser(userId, callback) {
    let sql = "INSERT INTO Cart (user_id, cart_status) VALUES (?, lower('new'));";
    db.run(sql, [userId], function (err) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            console.log('New cart created for user');
            callback(null, this.lastID); // this.lastID contains the id of the last inserted row
        }
    });
}


function addProductToCart(cartId, productId, quantity) {
    let sql = "INSERT INTO CartProducts (cart_id, product_id, item_quantity) VALUES (?, ?, ?);";
    db.run(sql, [cartId, productId, quantity], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Product added to cart');
        }
    });
}


module.exports = {
    getAll,
    getAllCartProducts,
    getAllCartProductsByCartIdAndUserId,
    getAllCartProductsByUserId,
    abandonInactiveCarts,

    createCartForUser,
    addProductToCart,

};
