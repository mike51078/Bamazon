var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

//functions to begin the program and allows program to return to this location with callback function
start();
function start() {
    connection.connect(function (err) {
        if (err) throw err;
        runSearch();
    });
};

//Welcome screen
console.log("\nWelcome to Bamazon!\n");

//First thing which runs, providing user with two options to choose from
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
//Swtich directing program where to go after user chooses option
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

//Logic the program uses if user selects to see list of products for sale
function productListSearch() {
//Querying the table of `products` to provide data
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "What is the ID of the product you would like to puchase?",
//this function loops through the table and provides the product name from the table for returning to the user
                    choices: function () {
                                var choiceArray = [];
                                for (var i = 0; i < res.length; i++) {
                                    choiceArray.push(res[i].product_name);
                                }
                                return choiceArray;
                    },
                },
                {
//this is where user is providing input for how many unit they would like to purchase
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
//this is comparing the users choice of product to the existing list of available products
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        var chosenItem = res[i];
                    }
                }
//query allowing the program to identify the quantity of the selected item and assigned a variable
                connection.query("SELECT * FROM products WHERE item_id = ?", [chosenItem.item_id], function (err, res) {
                    var quanity = answer.quantity;
                    if (err) throw err;
                    else if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    connection.query(
//this updates the table, subtracting the quantity ordered by the user from the existing stock quantity
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenItem.stock_quantity - answer.quantity)
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
//display to the user and providing feedback of successful purchase; program will then be called back to the beginning
                        function () {
                            console.log("Congratulations! Purchase successful!");
                            runSearch();
                        }
                );
                }
//displays to let the user know the requested quantity is not available, and they will need to choose again; the program is then called back to the beginning
                else if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                    console.log("Insufficient quantity in stock.  Please update amount, or choose a different item.  Thank you!");
                    runSearch();
                }
            })
    })
}
    )}
//this function is accessed from the original options in the beginning, if the user selects `exit`.  This will exit the program and return user to the console.
function exit() {
    console.log("\nThank you for visiting Bamazon!  Good Bye!\n")
    connection.end();
}