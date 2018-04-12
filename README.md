# Clubhouse Jersey shop

Small web store for selling Jerseys and possibly other sports apparel. Website is not for actual use but is fully functional.

Some supported features:
* Add product
* Delete product
* Update product
* Buy item
* Shopping cart
* Order history
* Multiple search with comma => itemName,ItemName2
* Filters


### Prerequisites
All dependencies are in package.json

*Tested on windows and chrome

### Installing and Deployment

Download the zip file and extract into your desired location. To install and run the program use the following commands.

To install dependencies use command:
```
npm install
```
Before running the project you must start the MongoDB server and run the seeding script.
To start MongoDB, navigate to your MongoDB/bin directory and type:
```
mongod.exe
```
Once the MongoDB server is running run the seed script with:
```
npm run seed
```

Then you can start the server use the following: 
```
npm start
```
Once the server is running visit `http://localhost:3000/` and login with any of the following credentials:

User: admin@admin.com
Pass: admin

User: max@admin.com
Pass: max

User: guest@guest.com
Pass: guest

Current Paypal API keys are hardcoded in to change this with your own visit app.js file then change client_id and client_secret with your paypal sandbox account.

## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Handlebars](https://handlebarsjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Author

* Maximillian Lefebvre

Code was built off of code base for website structure. But products, database, paypal linking was all done by myself.