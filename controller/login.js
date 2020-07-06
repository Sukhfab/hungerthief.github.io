const express = require("express");
const router = express.Router();



router.get("/login", (req, res) => {
    res.render("login", {
        head: "Login page",

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