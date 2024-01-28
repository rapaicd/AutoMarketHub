# AutoMarketHub Application
This is a Node.js web application written in TypeScript that utilizes the Express framework and MySQL database. The application is designed to resemble a Serbian 'Polovni Automobili' web application, allowing users to buy and sell vehicles. Additionally, users receive email notifications upon successful purchases, and the application prioritizes security to ensure a safe user experience.

## Features
 - User Authentication: Secure user authentication ensures that only authorized users can access the application.

 - Vehicle Listings: Users can view a list of available vehicles for sale, including details such as make, model, year, price..

 - Email Notifications: Users receive email notifications upon successful purchase transactions.

 - Security: The application implements security measures to protect user data and ensure a secure environment.

## Prerequisites
Before running the application, ensure the following dependencies are installed:

 - Node.js
 - MySQL

## Configuration
Before running the appplication ensure that you created a .env file in the root directory with the following content (replacing the placeholders with your actual database and email service information):

```.env
PORT=3000
ORIGIN_URL= http://localhost:3000
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database
DB_USER=your_mysql_user
GMAIL_APP_USER=your_email_service
GMAIL_APP_PASSWORD=your_email_password 
JWT_SECRET=your_jwt_secret
```
This file is used to configure your application. Make sure not to share sensitive information.