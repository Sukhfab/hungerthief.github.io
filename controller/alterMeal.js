const express = require("express");
const router = express.Router();
const database = require("../server.js")

router.get("/addmeal", (req, res) => {

  res.render("AddMeal", {
    head: "Add page",
  });
})
router.post("/mealdatabase", (req, res) => {
  var meal = new database.mealsTable({
    packagename: req.body.name,
    meals: req.body.meals,
    synopsis: req.body.synopsis,
    category: req.body.category,
    price: req.body.price,
    description: req.body.desc,
    image: req.body.image,
    istop: Boolean(req.body.istop)
  })

  meal.save((err) => {
    if (err) {
      console.log(`There was an error in saving ${err}`);
    } else {
      console.log("The meal was saved to the HungerThief");
    }
  });
  res.render("AddMeal", {
    head: "Add page",
  });
})


// update meal
router.get("/updatemeal", (req, res) => {

  res.render("updatemeal", {
    head: "Update page",
  });
})

router.post("/updatemeal", (req, res) => {
  let error;
  database.mealsTable.findOne({
      packagename: req.body.name,
    })
    .exec()
    .then((meal) => {
      if (!meal) {

          res.render("updatemeal", {
            head: "Update page",
            err:"The Meal is not found."
          });
      
      } else {
        let ele = meal;
          res.render("updatingmeal", {
          head: "AddMeal page",
          name: ele.packagename,
          price: ele.price,
          synopsis: ele.synopsis,
          meals: ele.meals,
          desc: ele.description,
          image: ele.image,
          istop: ele.istop,
          category: ele.category
        });
      }
    })
})

router.post("/mealupdated", (req, res) => {

  database.mealsTable.updateOne(
    {    packagename: req.body.name },
    { $set: {   
      price: req.body.price,
      meals: req.body.meals,
      description: req.body.desc,
      synopsis: req.body.synopsis,
      image: req.body.image,
      istop: Boolean(req.body.istop)

    } }
  ).exec();
res.redirect("/");
})


// delete meal
router.get("/deletemeal", (req, res) => {
  res.render("deletemeal", {
    head: "delete meal page",
  });
})

router.post("/deletemeal", (req, res) => {
  database.mealsTable.findOne({
    packagename: req.body.name,
  })
  .exec()
  .then((meal) => {
    if (!meal) {

        res.render("deletemeal", {
          head: "Update page",
          err:"The Meal is not found."
        });}else{
  database.mealsTable.deleteOne({ packagename: req.body.name  })
.exec()
.then(() => {
  // removed company
  console.log("meal removed");
})
.catch((err) => {
  console.log(err);
});
  res.render("deletemeal", {
    head: "delete meal page",
  });
}
});
})
  
module.exports = router;