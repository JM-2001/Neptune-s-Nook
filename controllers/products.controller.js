"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/products.model");
const userModel = require("../models/users.model");

const upload = multer({ storage: multer.memoryStorage() });


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

  let products = model.getAllAndCategoryName();
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

/*
function getAllByFeatured(req, res, next) {
  let featuredProducts = model.getAllByFeatured();
  let loggedIn = req.user ? true : false;
  let user_type = null;
  if (req.user) {
    user_type = req.user.user_type;
  }
  console.log('User Type:', user_type);
  try {
    res.render('index', { products: featuredProducts, loggedIn: loggedIn, user_type: user_type, title: "Neptune's Nook Splash Page" });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}
*/

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

function getOneById(req, res, next) {
  let loggedIn = req.user ? true : false;
  let user_type = null;
  let user_id = null;
  if (req.user) {
    user_type = req.user.user_type;
    user_id = req.user.user_id;
  }
  //console.log('User Type:', user_type);
  //console.log('User ID:', user_id);

  let id = req.params.id;
  try {
    let product = model.getOneById(id);
    //res.json(model.getOneById(req.params.id));
    res.render("product-pages/details",
      {
        product: product,
        loggedIn: loggedIn,
        user_type: user_type,
        user_id: user_id,
        title: 'Product #' + id
      });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}


async function bulkUpload(req, res, next) {
  let jsonData = req.body.jsonData;

  console.log(req.body); // log the body

  if (!jsonData) {
    return res.status(400).send('No data provided');
  }

  let products;
  try {
    products = JSON.parse(jsonData);
  } catch (err) {
    console.error("Error while parsing JSON data ", err.message);
    next(err);
  }

  for (let product of products) {
    try {
      await model.createNewProduct(product);
    } catch (err) {
      console.error("Error while creating product ", err.message);
      next(err);
    }
  }

  res.status(200).send('Products uploaded successfully');
}

module.exports = {
  getAll,
  getAllAndCategoryName,
  getAllByCategory,
  getAllByFeatured,
  getOneById,
  bulkUpload,
  /*
  createNew,
  searchByName,
  deleteById,
  update,
  */
};
