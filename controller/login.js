const express = require("express");
const router = express.Router();
const userTable = require("../server.js")



router.get("/login", (req, res) => {
    res.render("login", {
        head: "Login page",

    });
})

router.post("/submit-login", (req, res) => {
    err_email = [];
    err_pass = [];
    err_db = [];
    let storeEmail;
    let storepass;

    if (req.body.password === "") {
        err_pass.push("Please enter the Password.")
    }

    if (req.body.email === "") {
        err_email.push("Please enter the email.")

        if (err_email.length > 0 || err_pass.length > 0) 
        {
            storeEmail = req.body.email;
            storepass = req.body.password;
            res.render("login", {
                head: "Login page",
                email: err_email,
                pass: err_pass,
                storedEmail: storeEmail,
                storedPass: storepass,
            })

        } 
    } else {
        userTable.findOne({
                Email: req.body.email,
                Password: req.body.password
            })
            .exec()
            .then((company) => {
                if (!company) {
                    err_email.push("Either the Email or the Password does not match");
                }

                if (err_email.length > 0 || err_pass.length > 0) {
                    storeEmail = req.body.email;
                    storepass = req.body.password;
                    res.render("login", {
                        head: "Login page",
                        pass: err_pass,
                        email:err_email,
                        storedEmail: storeEmail,
                        storedPass: storepass,
                    })

                } else {

                    res.redirect("/");
                }

            })

    }
    // mongo fetch


})

module.exports = router;