var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

start();
function start() {
    connection.connect(function (err) {
        if (err) throw err;
        runSearch();
    });
};

console.log("\nWelcome to Bamazon!\n");

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "See list of products for sale.",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "See list of products for sale.":
                    productListSearch();
                    break;

                case "Exit":
                    exit();
                    break;
            }
        });
}
function productListSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "What is the ID of the product you would like to puchase?",
                    choices: function () {
                                var choiceArray = [];
                                for (var i = 0; i < res.length; i++) {
                                    choiceArray.push(res[i].product_name);
                                }
                                return choiceArray;
                    },
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
               
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        var chosenItem = res[i];
                    }
                }
                connection.query("SELECT * FROM products WHERE item_id = ?", [chosenItem.item_id], function (err, res) {
                    var quanity = answer.quantity;
                    console.log(answer.quantity);
                    if (err) throw err;
                    else if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenItem.stock_quantity - answer.quantity)
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function () {
                            console.log("Congratulations! Purchase successful!");
                            runSearch();
                        }
                );
                }
                else if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                    console.log("Insufficient quantity in stock.  Please update amount, or choose a different item.  Thank you!");
                    runSearch();
                }
            })
    })
}
    )}

function exit() {
    console.log("\nThank you for visiting Bamazon!  Good Bye!\n")
    connection.end();
}