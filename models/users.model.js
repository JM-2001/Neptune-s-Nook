"use strict";
const db = require("./db-conn");

function getAll() {
  let sql = "SELECT * FROM Users;";
  const data = db.all(sql);
  return data;
};

function getAllByUserType(userType) {
  let sql = "SELECT * FROM Users WHERE user_type =?;";
  const data = db.all(sql, userType);
  return data;
}


function getOneByEmail(email) {
  let sql = "SELECT * FROM Users WHERE email = lower(?);";
  const data = db.get(sql, email);
  return data;
}

function getOneById(id) {
  let sql = "SELECT * FROM Users WHERE user_id =?;";
  const data = db.get(sql, id);
  return data;
}

function createNewUser(params) {
  let sql = "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, lower(?), ?);";
  const data = db.run(sql, params);
  return data;
}

function getUserType(id) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT user_type FROM Users WHERE user_id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.user_type : null);
      }
    });
  });
}

/*
function getAllByCategory(category) {
  let sql = "SELECT * FROM Products WHERE category_id =?";
  const data = db.all(sql, category);
  return data;
};

function getAllByFeatured() {
  let sql = "SELECT * FROM Products WHERE featured_bool = 1;";
  const data = db.all(sql);
  return data;
}

function getOneById(id) {
  let sql = "SELECT * FROM Products WHERE product_id =?;";
  const item = db.get(sql, id);
  return item;
}

function getCategoryById(id) {
  let sql = "SELECT category_name FROM Categories WHERE category_id =?;";
  const item = db.get(sql, id);
  return item;
}

function createNew(params) {
  let sql =
    'INSERT INTO menu ("id","name","category","subcategory","price","cost") ' +
    "VALUES(?, ?, ?, ?, ?, ?);";
  const item = db.run(sql, params);
  return item;
};

function search(params) {
  let sql = 'SELECT * FROM menu WHERE name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function deleteById(id) {
  let sql = 'DELETE FROM MENU WHERE id =?';
  const response = db.run(sql, id);
  return response;
};

function update(params) {
  let sql = 'UPDATE menu SET name =?, category =?,subcategory =?,price =?,cost =? WHERE id =?;';
  const response = db.run(sql, params);
  return response;
};

*/

module.exports = {
  getAll,
  getAllByUserType,
  getOneByEmail,
  getOneById,
  createNewUser,
  getUserType,
  /*
  getAllByCategory,
  getAllByFeatured,
  getOneById,
  getCategoryById,
  
  createNew,
  search,
  deleteById,
  update,
  */
};
