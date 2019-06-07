var mysql = require("mysql");
var inquirer = require("inquirer");
//connection information
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});
//testing the connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});
//to choose to buy a dress or exic
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
            displayProducts();
            buyDress();
        }
        else {
            console.log("See you next time!\n");
            connection.end();
        }
    });
}
//show list of products
function displayProducts() {
    console.log("\nHere are the GMG dresses available for sale...");
    console.log("----------------------------");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("----------------------------\n");
    });
}
//purchase
function buyDress() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    inquirer
    .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].id);
              }
              return choiceArray;
          },
          message: "Which GMG dress would you like to buy?"
        },
        {
          name: "purchase",
          type: "input",
          message: "How many would you like?"
        }
    ])
    // .then(function(answer) {
    //     var chosenItem;
    //     for (var i = 0; i < res.length; i ++) {
    //         if (res[i].id === answer.choice) {
    //             chosenItem = res[i];
    //         }
    //     }
        
    // })
}); 
}