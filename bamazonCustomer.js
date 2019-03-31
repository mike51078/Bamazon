var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});
  
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

}

function exit() {
    console.log("\nThank you for visiting Bamazon!  Good Bye!\n")
    connection.end();
}