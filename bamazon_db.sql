DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Call of Duty", "Video Games", 60, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Division 2", "Video Games", 65, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Dead Pool", "Movies", 15, 38);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Captain Marvel", "Movies", 25, 24);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Chocolate Ice Cream", "Food", 5, 48);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Popsicles", "Food", 1, 19);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Yard Chairs", "Outdoors", 20, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Cornhole", "Outdoors", 75, 36);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Jeep", "Automotive", 30000, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Auto Freshener", "Automotive", 3, 96);
