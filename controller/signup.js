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
        err_email.push("Please enter the email.")
    }
    if (req.body.fname === "") {
        err_fname.push("Please enter the First Name.")
    }
    if (req.body.lname === "") {
        err_lname.push("Please enter the Last Name.")
    }

    //complex validation one

    if (req.body.password === "") {
        err_pass.push("Please enter the Password.")

    } else
    if (req.body.passwordrepeat == "") {
        err_confirm_pass.push("Re-enter you password.")
    } else
    if (!(req.body.passwordrepeat == req.body.password)) {
        err_confirm_pass.push("Password does not match.")
    } else
    if (req.body.passwordrepeat.length < 8) {
        err_confirm_pass.push("Password mush be of atleast 8 characters.")
    } else
    if (!(req.body.passwordrepeat.match(numbers))) {
        err_confirm_pass.push("Password must have a number.")
    } else
    if (!(req.body.passwordrepeat.match(Schar))) {
        err_confirm_pass.push("Password must have a special character.")

    } else
    if (!(req.body.passwordrepeat.match(lower))) {
        err_confirm_pass.push("Password must have a lower case alphabet.")

    } else
    if (!(req.body.passwordrepeat.match(upper))) {
        err_confirm_pass.push("Password must have a upper case alphabet.")

    }

    if (err_email.length > 0 || err_pass.length > 0 || err_confirm_pass.length > 0 || err_fname.length > 0 || err_lname.length > 0) {
        storefname = req.body.fname;
        storelname = req.body.lname;
        storeemail = req.body.email;
        storepass = req.body.password;
        storeconpass = req.body.passwordrepeat;
        res.render("signup", {
            
            head: "Sign up page",
            header: signupHeader,
            email: err_email,
            pass: err_pass,
            conpass: err_confirm_pass,
            fname: err_fname,
            lname: err_lname,
            storedfname: storefname,
            storedlname: storelname,
            storedemail: storeemail,
            storedpass: storepass,
            storedconpass: storeconpass
        })
    } else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.MY_API_ID);
        const msg = {
            to:  `${req.body.email}`,
            from: 'ss9112000@gmail.com',
            subject: 'Registration Confirmation',
            html: `Hello ${req.body.fname}, <br>
             This Email is a confirmation that you are successfully registered as a new user in "Hunger Thief" <br>
             Tasty food on the way <br>
             Thank You <br>
             Hunger Thief`,
        };
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`error is ${err}`);
        })
    }

})
module.exports = router;