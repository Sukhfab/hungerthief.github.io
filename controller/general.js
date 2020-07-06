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
    });
})


router.get("/package", (req, res) => {
    const fakeDB = new packageDB();
    res.render("package", {
        head:"Package page",
        package: fakeDB.getPackages(),
        
    });
})

module.exports=router;