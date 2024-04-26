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

function getCartIdByUserId(userId) {
    let sql = "SELECT cart_id FROM Cart WHERE user_id = ? AND cart_status = lower('new');";
    const data = db.get(sql, userId);
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

function createCartForUser(userId) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO Cart (user_id, cart_status) VALUES (?, lower('new'));";
        db.run(sql, [userId], function (err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log('New cart created for user');
                resolve(this.lastID); // this.lastID contains the id of the last inserted row
            }
        });
    });
}

function addProductToCart(cartId, productId, quantity) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO CartProducts (cart_id, product_id, item_quantity) VALUES (?, ?, ?);";
        db.run(sql, [cartId, productId, quantity], function (err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log('Product added to cart');
                resolve();
            }
        });
    });
}

function getCartByUserId(userId) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Cart WHERE user_id = ? AND cart_status = lower('new');";
        try {
            let cart = db.get(sql, userId);
            if (!cart) {
                // No active cart found, create a new one
                let createCartSql = "INSERT INTO Cart(user_id, cart_status) VALUES (?, 'new');";
                db.run(createCartSql, userId);
                // Fetch the newly created cart
                cart = db.get(sql, userId);
            }
            resolve(cart);
        } catch (err) {
            reject(err);
        }
    });
}

function updateCartProductQuantity(cartId, productId, quantity) {
    let sql = "UPDATE CartProducts SET item_quantity = ? WHERE cart_id = ? AND product_id = ?;";
    db.run(sql, [quantity, cartId, productId], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Cart product quantity updated');
        }
    });
}

function getCartProductByCartIdAndProductId(cartId, productId) {
    let sql = "SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?;";
    const data = db.get(sql, [cartId, productId]);
    return data;
}

function deleteCartProduct(cartId, productId) {
    let sql = "DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?;";
    db.run(sql, [cartId, productId], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Cart product deleted');
        }
    });
}

function markCartAsPurchased(cartId) {
    let sql = "UPDATE Cart SET cart_status = 'purchased' WHERE cart_id = ?;";
    return new Promise((resolve, reject) => {
        db.run(sql, cartId, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log('Cart updated');
                resolve();
            }
        });
    });
}

module.exports = {
    getAll,
    getAllCartProducts,
    getAllCartProductsByCartIdAndUserId,
    getAllCartProductsByUserId,
    abandonInactiveCarts,
    getCartIdByUserId,

    createCartForUser,
    addProductToCart,
    getCartByUserId,
    updateCartProductQuantity,
    getCartProductByCartIdAndProductId,
    deleteCartProduct,
    
    markCartAsPurchased,
};
