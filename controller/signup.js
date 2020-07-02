const express = require("express");
const e = require("express");
const router = express.Router();
const signupHeader = ` <header>
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
</header>`;

router.get("/signup", (req, res) => {


    res.render("signup", {
        head: "Sign up page",
        header: signupHeader
    });
})

router.post("/submit-signup", (req, res) => {
    err_email = [];
    err_pass = [];
    err_confirm_pass = [];
    err_fname = [];
    err_lname = [];
    let numbers = /[0-9]/g;
    let Schar = /[@#$&%^*!]/g
    let lower = /[a-z]/g;
    let upper = /[A-Z]/g;
    let storefname;
    let storelname;
    let storeemail;
    let storepass;
    let storeconpass

    if (req.body.email === "") {
        err_email.push("Please enter the email")
    }
    if (req.body.fname === "") {
        err_fname.push("Please enter the First Name")
    }
    if (req.body.lname === "") {
        err_lname.push("Please enter the Last Name")
    }

    //complex validation one

    if (req.body.password === "") {
        err_pass.push("Please enter the Password")

    } else
    if (req.body.passwordrepeat == "") {
        err_confirm_pass.push("Re-enter you password")
        // flag = ;
    } else
    if (!(req.body.passwordrepeat == req.body.password)) {
        err_confirm_pass.push("Password does not match")
        // flag = false;
    } else if (req.body.passwordrepeat.length < 8) {
        err_confirm_pass.push("Passowrd mush be of atleast 8 characters")
        // flag = false;
    } else if (!(req.body.passwordrepeat.match(numbers))) {
        err_confirm_pass.push("Passowrd must have numbers")
        //flag = false;
    } else if (!(req.body.passwordrepeat.match(Schar))) {
        err_confirm_pass.push("Passowrd must have special characters")
        //flag = false;

    } else if (!(req.body.passwordrepeat.match(lower))) {
        err_confirm_pass.push("Passowrd must have lower case alphabets")
        //flag=false; 

    } else if (!(req.body.passwordrepeat.match(upper))) {
        err_confirm_pass.push("Passowrd must have upper case alphabets")
        //  flag=false; 

    }

    if (err_email.length > 0 || err_pass.length > 0 || err_confirm_pass.length > 0 || err_fname.length > 0 || err_lname.length > 0) {
        storefname=req.body.fname;
        storelname=req.body.lname;
        storeemail=req.body.email;
        storepass=req.body.password;
        storeconpass=req.body.passwordrepeat;

        res.render("signup", {
            head: "Sign up page",
            header: signupHeader,
            email: err_email,
            pass: err_pass,
            conpass: err_confirm_pass,
            fname: err_fname,
            lname: err_lname,
            storedfname:storefname,
            storedlname:storelname,
            storedemail:storeemail,
            storedpass:storepass,
            storedconpass: storeconpass
        })
    } else {
        res.redirect("/");
    }

})
module.exports = router;