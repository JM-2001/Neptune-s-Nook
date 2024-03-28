CREATE TABLE Users
(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type TEXT CHECK(user_type IN ('admin', 'shopper')) NOT NULL DEFAULT 'shopper',
  UNIQUE(email, user_id)
);

CREATE TABLE Cart
(
  cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_status TEXT CHECK(cart_status IN ('new', 'abandoned', 'purchased')) NOT NULL DEFAULT 'new',
  created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  UNIQUE(user_id, cart_id)
);

CREATE TABLE Categories
(
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name VARCHAR(255) NOT NULL,
  category_order INTEGER NOT NULL,
  UNIQUE(category_id)
);

CREATE TABLE Products
(
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name VARCHAR(255) NOT NULL,
  product_desc TEXT,
  product_img_url VARCHAR(255),
  product_price REAL NOT NULL,
  featured_bool INTEGER DEFAULT 0,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
  UNIQUE (product_id, category_id)
);

CREATE TABLE CartProducts
(
  cartProducts_id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_quantity INTEGER NOT NULL DEFAULT 1,
  cart_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  UNIQUE (cart_id, product_id, cartProducts_id)
);
