
// Name: Sukhbir Singh
// ID -152946182

const express = require("express");
const app = express();
var exphbs = require('express-handlebars');
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const generalController = require("./controller/general.js");
const loginController= require("./controller/login.js");
const signupController= require("./controller/signup.js");
app.use("/",generalController,loginController,signupController);

app.listen(3000, () => {
    console.log("TERMINAL IS RUNNING");
})