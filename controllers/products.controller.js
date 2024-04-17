"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/products.model");
const userModel = require("../models/users.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.json(model.getAll());
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
    { product: product, 
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



/*
function createNew(req, res, next) {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let category = req.body.category;
  let subcategory = req.body.subcategory;
  let price = parseFloat(req.body.price);
  let cost = parseFloat(req.body.cost);
  if (id && name && category && subcategory && price && cost) {
    let params = [id, name, category, subcategory, price, cost];
    try {
      model.createNew(params);
      res.render("menu", { meals: model.getAll(), title: 'All Meals' });
    } catch (err) {
      console.error("Error while creating menu ", err.message);
      next(err);
    }
  }
}

function update(req, res, next) {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let category = req.body.category;
  let subcategory = req.body.subcategory;
  let price = parseFloat(req.body.price);
  let cost = parseFloat(req.body.cost);
  if (id && name && category && subcategory && price && cost) {
    let params = [name, category, subcategory, price, cost, id,];
    try {
      model.update(params);
      res.render("menu", { meals: model.getAll(), title: 'All Meals' });
    } catch (err) {
      console.error("Error while creating menu ", err.message);
      next(err);
    }
  }
}


function searchByName(req, res, next) {
  let term = req.query.term;
  let meals = [];
  if (term) {
    let searchTerm = '%' + term + '%';
    meals = model.search(searchTerm);
  }
  else {
    meals = model.getAll();
  }
  try {
    res.render("menu", { meals: meals, title: '' + term + ' Meals' });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

function deleteById(req, res, next) {
  let id = req.params.id;
  try {
    model.deleteById(id);
    res.render("menu", { meals: model.getAll(), title: 'Meal #' + id });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}
*/

module.exports = {
  getAll,
  getAllByCategory,
  getAllByFeatured,
  getOneById,
  /*
  createNew,
  searchByName,
  deleteById,
  update,
  */
};
