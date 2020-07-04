const express = require("express");
const router = express.Router();
const ServicesDB = require("../model/script1.js")
const packageDB = require("../model/script2.js")

router.get("/", (req, res) => {


    const fakeDB = new ServicesDB();
    const fakeDB2 = new packageDB();
    res.render("home", {
        top: fakeDB2.getTopmeals(),
        services: fakeDB.getServices(),
        head:"Home page",
        header:` <header>
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
        </header>`
    });
})


router.get("/package", (req, res) => {
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

module.exports=router;