const express = require("express");
const router = express.Router();
const ServicesDB = require("../model/script1.js")
const packageDB = require("../model/script2.js")
const database = require("../server.js")

router.get("/", (req, res) => {
    const fakeDB = new ServicesDB();
    const fakeDB2 = new packageDB();
    res.render("home", {
        top: fakeDB2.getTopmeals(),
        services: fakeDB.getServices(),
        head: "Home page",
    });
})

router.get("/package", (req, res) => {
    database.mealsTable.find()
        .exec()
        .then((meal) => {
            if (meal) {
                let x = meal;
                let y = [];
                x.forEach((ele) => {
                    y.push({
                        url: ele.image,
                        caption: ele.packagename,
                        des:ele.description,//
                        meal:ele.meals,//
                        Synopsis: ele.synopsis  ,
                        price:ele.price//
                    });

                })
                // const fakeDB = new packageDB();
                res.render("package", {
                    head: "Package page",
                    package: y,

                });
            }

        })
})


module.exports = router;