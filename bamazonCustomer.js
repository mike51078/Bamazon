var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
  });
start()
  function start() {
connection.connect(function(err, results) {
    if (err) throw err;
    runSearch();
});
  }  

console.log("\nWelcome to Bamazon!\n")

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
      .then(function(answer){
          switch(answer.action) {
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
    start();
    inquirer
        .prompt([
            {
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                  }
                return choiceArray;
            },
            message: "What is the ID of the product you would like to puchase?"
            },
            {
            name: "purchase",
            type: "input",
            message: "How many would you like to purchase?"
            }
        ])
        .then(function(answer) {
            var chosenItem
            for (var i = 0 ; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                }
            }
            if (chosenItem.stock_quantity > parseInt(answer.purchase)) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (stock_quantity - answer.purchase)
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("Congratulations! Purchase successful!");
                        runSearch();
                    }
                )
            }
            else if (chosenItem.stock_quantity < parseInt(answer.purchase)) {
                console.log("Insufficient quantity in stock.  Please update amount, or choose a different item.  Thank you!");
                runSearch();
            }
        })
    }



function exit() {
    console.log("\nThank you for visiting Bamazon!  Good Bye!\n")
    connection.end();
}