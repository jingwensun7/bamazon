DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lilly GMG dress", "Women's Clothing", 220, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Julia GMG dress", "Women's Clothing", 178, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Agatha GMG dress", "Women's Clothing", 188, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neil Bouclé GMG dress", "Women's Clothing", 198, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lola GMG dress", "Women's Clothing", 188, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carla GMG dress", "Women's Clothing", 178, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adele GMG dress", "Women's Clothing", 250, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eve GMG dress", "Women's Clothing", 210, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cristine GMG dress", "Women's Clothing", 200, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hope GMG dress", "Women's Clothing", 188, 1);