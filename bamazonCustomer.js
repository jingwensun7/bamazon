var mysql = require("mysql");
var inquirer = require("inquirer");
//connection information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    //your password goes here
    password: "*****",
    database: "bamazonDB"
});
//testing the connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});
//to choose to buy a dress or exit
function start() {
    inquirer
    .prompt({
        name: "buyOrNo",
        type: "list",
        message: "Would you like to buy a GMG dress?",
        choices: ["Yes", "No"]
    })
    .then(function(answer) {
        if (answer.buyOrNo === "Yes") {
            buyDress();
        }
        else {
            console.log("See you next time!\n");
            connection.end();
        }
    });
};
//show the table of items
function displayItems() {
    console.log("\nHere are the GMG dresses available for sale...");
    console.log("----------------------------");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("----------------------------\n");
    });
};
//Purchase
function buyDress() {
    displayItems();
    connection.query("SELECT * FROM products", function(err, res) {
        inquirer
        .prompt([
            {
            name: "choice",
            type: "number",
            message: "Which GMG dress would you like to buy?\n"
            },
            {
            name: "quantity",
            type: "number",
            message: "How many would you like?\n"
            }
        ])
        .then(function (answer) {
            var quantity = answer.quantity;
            var itemID = answer.choice;
            connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                if (err) throw err;
                if (selectedItem[0].stock_quantity - quantity >= 0) {
                    console.log("Bamazon has suffiecient inventory of " + selectedItem[0].product_name + " to complete your order!\n");
                    connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantity - quantity, itemID]);
                    start();  
                }  
                else {
                    console.log("INSUFFICIENT INVENTORY ALERT: \nBamazon only has " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " in stock at this moment.\n");
                    start();
                }
            });
        });
    });
};

