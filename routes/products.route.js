"use strict";
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const productsController = require("../controllers/products.controller");
const isAdmin = require('../auth/auth.middleware');

router.get("/all", productsController.getAll);
router.get("/category/:category", productsController.getAllByCategory);
router.get("/featured", productsController.getAllByFeatured);
router.get("/product/:id", productsController.getOneById);


router.post('/bulk-upload', isAdmin, upload.single('uploadFile'), productsController.bulkUpload);
router.get("/admin/product-edit", isAdmin, productsController.getAllAndCategoryName);
router.post("/admin/product-edit/update", isAdmin, productsController.updateProductById);
router.post("/admin/create-product", isAdmin, productsController.createNewProductAdmin);

module.exports = router;
