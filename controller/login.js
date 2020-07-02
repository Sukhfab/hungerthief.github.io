const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
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


module.exports=router;