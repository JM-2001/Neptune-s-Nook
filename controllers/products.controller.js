"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer;
const fs = require("fs").promises;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(multer().none());

const model = require("../models/products.model");
const userModel = require("../models/users.model");
const cartModel = require("../models/cart.model");




function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllAndCategoryName(req, res, next) {
  let loggedIn = req.user ? true : false;
  let user_type = null;
  let user_id = null;
  if (req.user) {
    user_type = req.user.user_type;
    user_id = req.user.user_id;
  }
  //console.log('User Type:', user_type);
  //console.log('User ID:', user_id);

  //let products = model.getAllAndCategoryName();
  let products = model.getAll();
  try {
    //res.json(model.getAll());
    res.render("admin/product-edit", {
      products: products,
      loggedIn: loggedIn,
      user_type: user_type,
      user_id: user_id,
      title: "Product Edit - Admin Page"
    });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByCategory(req, res, next) {
  let loggedIn = req.user ? true : false;
  let user_type = null;
  let user_id = null;
  if (req.user) {
    user_type = req.user.user_type;
    user_id = req.user.user_id;
  }
  //console.log('User Type:', user_type);
  //console.log('User ID:', user_id);

  let category = req.params.category;
  let categoryName = model.getCategoryById(category);
  let products = model.getAllByCategory(category);
  try {
    //res.json(model.getAllByCategory(req.params.category));
    res.render("product-pages/products", {
      products: products,
      loggedIn: loggedIn,
      user_type: user_type,
      user_id: user_id,
      title: categoryName.category_name
    });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByFeatured(req, res, next) {
  let featuredProducts = model.getAllByFeatured();
  let loggedIn = req.user ? true : false;
  let user_type = null;
  let user_id = null;
  if (req.user) {
    user_type = req.user.user_type;
    user_id = req.user.user_id;
  }
  //console.log('User Type:', user_type);
  //console.log('User ID:', user_id);
  try {
    res.render('index', {
      products: featuredProducts,
      loggedIn: loggedIn,
      user_type: user_type,
      user_id: user_id,
      title: "Neptune's Nook Splash Page"
    });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

async function getOneById(req, res, next) {
  let loggedIn = req.user ? true : false;
  let user_type = null;
  let user_id = null;

  if (req.user) {
    user_type = req.user.user_type;
    user_id = req.user.user_id;
  }

  console.log("Fetching product with ID:", req.params.id);
  console.log("User ID:", user_id);

  let id = req.params.id;
  try {
    let product = model.getOneById(id);
    let isInCart = false;

    if (loggedIn) {
      let cart = await cartModel.getCartByUserId(user_id);
      console.log("Fetched cart:", cart);

      if (cart && cart.products) {
        isInCart = cart.products.some(
          (product) => product.product_id === parseInt(id)
        );
        console.log("Is product in cart:", isInCart);
      }
    }

    res.render("product-pages/details", {
      product: product,
      loggedIn: loggedIn,
      user_type: user_type,
      user_id: user_id,
      title: 'Product #' + id,
      isInCart: isInCart
    });
  } catch (err) {
    console.error("Error while getting product details", err.message);
    next(err);
  }
}


async function bulkUpload(req, res, next) {
  try {
    // Parse the JSON file
    const products = JSON.parse(req.file.buffer.toString());

    // Loop through the products and insert each one
    for (const product of products) {
      await model.createNewProduct(product);
    }

    // Send a success response
    //res.json({ message: 'Products uploaded successfully' });
    res.redirect('/products/admin/product-edit');

  } catch (err) {
    console.error("Error while uploading products ", err.message);
    next(err);
  }
}

function updateProductById(req, res, next) {
  let product = {
    productName: req.body.productName,
    sciName: req.body.productSciName,
    productDesc: req.body.productDesc,
    productImagePath: req.body.productImgPath,
    productPrice: req.body.productPrice,
    featuredBool: req.body.productFeatured,
    categoryId: req.body.productCate,
    productId: req.body.productId
  };
  console.log(product)
  try {
    let updatedProduct = model.updateProductById(product);
    //res.json(updatedProduct);
    res.redirect('/products/admin/product-edit');
  } catch (err) {
    console.error("Error while updating product ", err.message);
    next(err);
  }
}

function createNewProductAdmin(req, res, next) {
  let product = {
    productName: req.body.productName,
    productSciName: req.body.productSciName,
    productDesc: req.body.productDesc,
    productImgPath: req.body.productImgPath,
    productPrice: req.body.productPrice,
    productFeatured: req.body.productFeatured,
    productCate: req.body.productCate
  };
  try {
    model.createNewProductAdmin(product);
    res.redirect('/products/admin/product-edit');
  } catch (err) {
    console.error("Error while creating product ", err.message);
    next(err);
  }
}


module.exports = {
  getAll,
  getAllAndCategoryName,
  getAllByCategory,
  getAllByFeatured,
  getOneById,
  bulkUpload,
  updateProductById,
  createNewProductAdmin,
  /*
  createNew,
  searchByName,
  deleteById,
  update,
  */
};
