# Bamazon
UCF Coding Bootcamp Bamazon Homework Assignment

# Node.js & MySQL

## Overview

Bamazon is an Amazon-like storefront which allows the user to view the current items in the inventory.  The application allows the user to take in orders from customers and depletes stock from the store's inventory based on the customers purchase.

## Technologies Used

In creating this program, we used the following technologies:
* MySQL
* Node.js
* MAMP
* DBeaver
* JavaScript

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

Please see the following GIF's below to reference the proper functionality for the program:

![functionality - start to purchase](https://user-images.githubusercontent.com/45186642/55432487-02486b80-5561-11e9-954d-1feece496306.gif)
This GIF shows the program starting and going through the correct prompts.  The user is able to enter the desired item to be purchased and the quantity desired.

![functionality - purchase completion and db update](https://user-images.githubusercontent.com/45186642/55432474-f9579a00-5560-11e9-8659-3c47003767a2.gif)
This GIF shows the program processing the requested quantity of the item, and displays the database updating appropriately by removing the selected quantity.

![insufficient_quantity](https://user-images.githubusercontent.com/45186642/55432507-0a081000-5561-11e9-9432-bfcb36d75ee8.gif)
This GIF shows the program responding when the user selects a quantity greater than the available current inventory.

If you have any questions, please reach out to me directly at elcid00@aol.com.
