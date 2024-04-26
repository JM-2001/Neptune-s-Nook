"use strict";
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs").promises
const upload = multer;

//
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session');
//

const flash = require("connect-flash");
const cron = require("node-cron");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./auth/auth.route');
app.use('/auth', authRoutes);
//


const productsRouter = require("./routes/products.route");
const usersRouter = require("./routes/users.route");
const authRouter = require("./auth/auth.route");
const cartRouter = require("./routes/cart.route");

app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/cart", cartRouter);

const productsController = require('./controllers/products.controller');
app.get("/", productsController.getAllByFeatured);

const cartController = require('./controllers/cart.controller');
cron.schedule('*/15 * * * *', cartController.abandonInactiveCarts)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
