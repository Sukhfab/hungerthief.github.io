
// Name: Sukhbir Singh
// ID -152946182

const express = require("express");
const app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
require('dotenv').config({path : "./key.env"});

// mangoDB
var mongoose = require("mongoose");
let pass1 = encodeURIComponent("&ahiL2000"); // this step is needed if there are special characters in your password, ie "$"
mongoose.connect(`mongodb+srv://sukhLikesMango:${pass1}@cluster0.4wqpx.mongodb.net/Web322?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var hungerThiefUser = new Schema({
    "FirstName":  String, 
    "LastName": String,
    "Email": String,
    "Password": String 
  });
  var hungerThiefmeal = new Schema({
    "packagename":  String, 
    "meals": String,
    "synopsis": String,
    "category": String ,
    "price": String ,
    "description": String,
    "image":String,
    "istop":Boolean

  });
  var usersTable = mongoose.model("Hungerthief", hungerThiefUser);
  var mealsTable = mongoose.model("Hungerthiefmeal", hungerThiefmeal);
const tables={
    usersTable,mealsTable
}
  module.exports = tables;
// mangoDB

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const generalController = require("./controller/general.js");
const loginController= require("./controller/login.js");
const signupController= require("./controller/signup.js");
const altermealController = require("./controller/alterMeal.js");

app.use("/",generalController,loginController,signupController,altermealController);

app.listen(process.env.PORT || 3000, () => {
    console.log("TERMINAL IS RUNNING");
})