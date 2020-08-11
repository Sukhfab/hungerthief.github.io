
// Name: Sukhbir Singh
// ID -152946182

const express = require("express");
const app = express();
var exphbs = require('express-handlebars');
//body parser
var bodyParser = require('body-parser');
require('dotenv').config({path : "./key.env"});
//session
const clientSessions = require("client-sessions");
// Setup client-sessions
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "week10example_web322", // this should be a long un-guessable string.
  duration: 10 * 60 * 1000, // duration of the session in milliseconds (10 minutes)
  activeDuration: 2000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

// mangoDB
var mongoose = require("mongoose");
let a=`mongodb+srv://sukhLikesMango:${encodeURIComponent(process.env.MONGOCONNECT)}@cluster0.4wqpx.mongodb.net/Web322?retryWrites=true&w=majority`;
mongoose.connect( a,{ useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var hungerThiefUser = new Schema({
    "FirstName":  String, 
    "LastName": String,
    "Email": String,
    "Password": String ,
    "isClerk":Boolean
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
const altermealController = require("./controller/authorization.js");
const addmealController = require("./controller/addmeal.js");
const updatemealController = require("./controller/updatemeal.js");
const deletemealController = require("./controller/deletemeal.js");
const checkoutController = require("./controller/checkout.js");

app.use("/",generalController,loginController.router,signupController,altermealController,addmealController,updatemealController,deletemealController,checkoutController);

app.listen(process.env.PORT || 3000, () => {
    console.log("TERMINAL IS RUNNING");
})