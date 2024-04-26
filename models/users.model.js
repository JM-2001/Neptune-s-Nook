"use strict";
const db = require("./db-conn");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

/* THIS CAN STAY
function createNewUser(params) {
  let sql = "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, lower(?), ?);";
  const data = db.run(sql, params);
  return data;
}
*/

function createNewUser(params) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(params[3], saltRounds, function(err, hashedPassword) {
      if (err) {
        reject(err);
      }
      else {
        let sql = "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, lower(?), ?);";
        const data = db.run(sql, [params[0], params[1], params[2], hashedPassword]);
        resolve(data);
      }
    });
  });
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

module.exports = {
  getAll,
  getAllByUserType,
  getOneByEmail,
  getOneById,
  createNewUser,
  getUserType,
};
