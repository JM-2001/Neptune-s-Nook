"use strict";
const db = require("../models/db-conn");

function getAll() {
  let sql = "SELECT * FROM Products;";
  const data = db.all(sql);
  return data;
};

function getAllAndCategoryName() {
  let sql = "SELECT Products.product_id, Products.product_name, Products.product_desc, Products.product_desc, Products.product_img_url, Products.product_price, Categories.category_name FROM Products JOIN Categories where Products.category_id = Categories.category_id;";
  const data = db.all(sql);
  return data;
}

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

async function createNewProduct(product) {
  let sql = "SELECT category_id FROM Categories WHERE category_name = ?;";
  let category = await db.get(sql, product.productCategory);

  if (!category) {
    throw new Error(`Category ${product.productCategory} not found`);
  }

  sql = 'INSERT INTO Products ("product_name", "product_desc", "product_img_url", "product_price", "category_id") VALUES (?, ?, ?, ?, ?);';
  const params = [product.productName, product.productDesc, product.productImagePath, product.productPrice.replace('$', ''), category.category_id];
  const item = await db.run(sql, params);
  return item;
}

function updateProductById(product) {
  let sql = 'UPDATE Products SET product_name = ?, sci_name = ?, product_desc = ?, product_img_url = ?, product_price = ?, featured_bool = ?, category_id = ? WHERE product_id = ?;';
  const params = [
    product.productName,
    product.sciName,
    product.productDesc,
    product.productImagePath,
    product.productPrice ? product.productPrice.replace('$', '') : null,
    product.featuredBool,
    product.categoryId,
    product.productId
  ];
  const item = db.run(sql, params);
  return item;
}

function createNewProductAdmin(product) {
  let sql = "INSERT INTO Products (product_name, sci_name, product_desc, product_img_url, product_price, featured_bool, category_id) VALUES (?, ?, ?, ?, ?, ?, ?);";
  const item = db.run(sql, [product.productName, product.productSciName, product.productDesc, product.productImgPath, product.productPrice, product.productFeatured, product.productCate]);
  return item;
}

module.exports = {
  getAll,
  getAllByCategory,
  getAllByFeatured,
  getOneById,
  getCategoryById,
  createNewProduct,
  getAllAndCategoryName,
  updateProductById,
  createNewProductAdmin,
};
