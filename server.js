
// Name: Sukhbir Singh
// ID -152946182

const express = require("express");
const app = express();
const ServicesDB = require("./model/script1.js")
const packageDB = require("./model/script2.js")
var exphbs = require('express-handlebars');
app.use(express.static('public'));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.listen(3000, () => {
    console.log("TERMINAL IS RUNNING");
})

app.get("/", (req, res) => {

    const header = ` <header>
<p class="header">Get $20 off on your first order!</p>
<nav class="navbar">
    <ul>
    <li id="brand"> <a href="/"> <i class="fas fa-utensils" style="color: Blue;"></i> Hunger
    Thief</a> </li>
<li id="list"><a href="/package">All Packages</a></li>
<li><a href="#chef">Kitchen</a></li>
<li><a href="#footertext">About us</a></li>
<li id="right"><a href="/signup">Sign up</a></li>
    <li id="right"><a href="/login">Login</a></li>
    </ul>

</nav>
</header>`;

    const fakeDB = new ServicesDB();
    const fakeDB2 = new packageDB();
    res.render("home", {
        top: fakeDB2.getTopmeals(),
        services: fakeDB.getServices(),
        head:"Home page",
        header
    });
})


app.get("/package", (req, res) => {
    const fakeDB = new packageDB();
    const header = ` <header>
<p class="header">Get variety of Meal Packages!</p>
<nav class="navbar">
    <ul>
    <li id="brand"> <a href="/"> <i class="fas fa-utensils" style="color: Blue;"></i> Hunger Thief</a> </li>
    <li id="list"><a href="/">Home</a></li>
    <li><a href="/#chef">Kitchen</a></li>
    <li><a href="#footertext">About us</a></li>
    <li id="right"><a href="/signup">Sign up</a></li>
    <li id="right"><a href="/login">Login</a></li>
    
    </ul>

</nav>
</header>`
    res.render("package", {
        head:"Package page",
        package: fakeDB.getPackages(),
        header
    });
})

app.get("/login", (req, res) => {
    const header = ` <header>
<p class="header">Welcome back!</p>
<nav class="navbar">
    <ul>
    <li id="brand"> <a href="/"> <i class="fas fa-utensils" style="color: Blue;"></i> Hunger Thief</a> </li>
    <li id="list"><a href="/">Home</a></li>
    <li><a href="package">All Packages</a></li>
    <li><a href="/#chef">Kitchen</a></li>
    <li><a href="#footertext">About us</a></li>
    <li id="right"><a href="/signup">Sign up</a></li>
    <li id="right"><a href="/login">Login</a></li>
    </ul>

</nav>
</header>`
    res.render("login", {
        head:"Login page",
        header
    });
})

app.get("/signup", (req, res) => {
    const header = ` <header>
<p class="header">Sign up to join!</p>
<nav class="navbar">
    <ul>
    <li id="brand"> <a href="/"> <i class="fas fa-utensils" style="color: Blue;"></i> Hunger Thief</a> </li>
    <li id="list"><a href="/">Home</a></li>
    <li><a href="package">All Packages</a></li>
    <li><a href="/#chef">Kitchen</a></li>
    <li><a href="#footertext">About us</a></li>
    <li id="right"><a href="/signup">Sign up</a></li>
    <li id="right"><a href="/login">Login</a></li>

    </ul>

</nav>
</header>`
    res.render("signup", {
        head:"Sign up page",
        header
    });
})