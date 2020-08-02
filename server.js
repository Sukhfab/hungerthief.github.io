
// Name: Sukhbir Singh
// ID -152946182

const express = require("express");
const app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
require('dotenv').config({path : "./key.env"});
const clientSessions = require("client-sessions");
// Setup client-sessions
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "week10example_web322", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
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
  var checkoutData = new Schema({
    "FirstName":  String, 
    "LastName": String,
    "Email": String,
    "Address": String ,
    "Zip": String, 
    "city": String ,
    "prvince": String ,
    "country": String ,
    "cardname": String ,
    "cardnumber": String ,
    "cardexpiry": String ,
    "cardcvv": String ,
  });
  var usersTable = mongoose.model("Hungerthief", hungerThiefUser);
  var mealsTable = mongoose.model("Hungerthiefmeal", hungerThiefmeal);
  var checkoutInfo = mongoose.model("UserCheckoutData", checkoutData);

const tables={
    usersTable,mealsTable,checkoutInfo
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