"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/users.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting users ", err.message);
    next(err);
  }
}

function getOneByEmail(req, res, next) {
  let email = req.params.email;
  try {
    res.json(model.getOneByEmail(email));
  } catch (err) {
    console.error("Error while getting user ", err.message);
    next(err);
  }
}

function createNewUser(req, res, next) {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let password = req.body.password;

  if (first_name && last_name && email && password) {
    let params = [first_name, last_name, email, password];
    try {
      model.createNewUser(params);

      //res.json(model.getAll());
      res.redirect("/auth/login");
    } catch (err) {
      console.error("Error while creating user ", err.message);
      next(err);
    }
  }
}

function getUserType(req, res, next) {
  let id = req.params.id;
  try {
    res.json(model.getUserType(id));
  } catch (err) {
    console.error("Error while getting user ", err.message);
    next(err);
  }
}

function getBulkUploadPage(req, res, next) {
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
    res.render('admin/bulk-upload', {
      loggedIn: loggedIn,
      user_type: user_type,
      user_id: user_id,
      title: "Bulk Upload - Admin Only"
    });
  } catch (err) {
    console.error("Error while getting page ", err.message);
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
  getOneByEmail,
  createNewUser,
  getUserType,
  getBulkUploadPage,
  /*
  getAllByCategory,
  getAllByFeatured,
  getOneById,

  createNew,
  searchByName,
  deleteById,
  update,
  */
};
