# Bamazon
UCF Coding Bootcamp Bamazon Homework Assignment

# Node.js & MySQL

## Overview

Bamazon is an Amazon-like storefront which allows the user to view the current items in the inventory.  The application allows the user to take in orders from customers and depletes stock from the store's inventory based on the customers purchase.


### Customer View

The foundation of this assignment is a MySQL Database titled `bamazon`, which contains a main table called `products`.  This table has a current inventory of products, with the following unique fields:

   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)

Upon beginning the program, the user will be provided with the options to view products currently for sale or to exit the program.  If the user chooses to view the products, they will be prompted with the following messages:

   * The first will ask for the ID of the product they would like to buy.
   * The second message will ask how many units of the product they would like to buy.

Once the customer has placed the order, the application will check the store and verify there is enough of the product to meet the customer's request.  If there is sufficient quantity, the program will inform the customer of a successful purchase, and return them to the initial screen.

If there is not a sufficient quantity, the app should log a phrase like `Insufficient quantity in stock`, and the user will be directed back to the initial screen.
