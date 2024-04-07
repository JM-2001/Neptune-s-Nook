"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/products.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.json(model.getAll());
    //res.render("menu", { Products: meals, title: 'All Meals' });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByCategory(req, res, next) {
  let category = req.params.category;
  let products = model.getAllByCategory(category);
  try {
    //res.json(model.getAllByCategory(req.params.category));
    res.render("product-pages/products", { products: products, title: category});
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}


function getAllByFeatured(req, res, next) {
  let featuredProducts = model.getAllByFeatured();
  try {
    //res.json(model.getAllByFeatured());
    res.render('index', { products: featuredProducts, title: "Neptune's Nook Splash Page" });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getOneById(req, res, next) {
  let id = req.params.id;
  try {
    let product = model.getOneById(id);
    //res.json(model.getOneById(req.params.id));
    res.render("product-pages/details", { product: product, title: 'Product #' + id });
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
