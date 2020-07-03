const express = require("express");
const router = express.Router();
const loginHeader = ` <header>
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
</header>`;


router.get("/login", (req, res) => {
    res.render("login", {
        head: "Login page",
        header: loginHeader
    });
})

router.post("/submit-login", (req, res) => {
    err_email = [];
    err_pass = [];
    let storeEmail;
    let storepass;
    if (req.body.email === "") {
        err_email.push("Please enter the email.")
    }
    if (req.body.password === "") {
        err_pass.push("Please enter the Password.")
    }
    if (err_email.length > 0 || err_pass.length > 0) {
        storeEmail = req.body.email;
        storepass = req.body.password;

        res.render("login", {
            head: "Login page",
            header: loginHeader,
            email: err_email,
            pass: err_pass,
            storedEmail: storeEmail,
            storedPass: storepass
        })

    } else {
      
        res.redirect("/");
    }


})

module.exports = router;