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
        });}
        else{
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

  // meal detail
  router.post("/mealdetail", (req, res) => {
   database.mealsTable.findOne({
    packagename: req.body.name,
  })
  .exec()
  .then((meal)=>{
    if(meal){
      ele=meal;
      res.render("mealdetails", {
        head: `${ele.packagename} Meal`,
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

let y=[];
router.post("/checkout", (req, res) => {
  let quantity=req.body.quantity;
  database.mealsTable.findOne({
    packagename: req.body.name,
  })
  .exec()
  .then((meal)=>{
    if(meal){
      ele=meal;
      y.push({
        name: ele.packagename,
        meals:ele.meals,
        synopsis: ele.synopsis,
        price:ele.price,
        quantity:quantity,
        category:ele.category,
        total: quantity*ele.price,
    });
    const grand=()=>{
      let grand=0;
      y.forEach((ele)=>{
        grand+=parseInt(ele.quantity)*parseInt(ele.price);
      })
      return grand;
    }
    const quatotal=()=>{
      let grand=0;
      y.forEach((ele)=>{
        grand+=parseInt(ele.quantity);
      })
      return grand;
    }
    const nametotal=()=>{
      let grand="";
      y.forEach((ele)=>{
        grand+= ele.name + " * "+ele.quantity +" = $" + ele.total +"<br>" ;
      })
      return grand;
    }
      res.render("checkout", {
        head: `${ele.packagename} Meal`,
        // name: ele.packagename,
        // price: ele.price,
        // synopsis: ele.synopsis,
        // meals: ele.meals,
        // category: ele.category,
        // totall: quantity*ele.price,
        // quan:quantity
        yo:y,
        grand:grand(),
        nametotal:nametotal(),
        totalquantity:quatotal()
      });
  
    }
})
})


router.post("/shipping", (req, res) => {
  var usercheckout = new database.checkoutInfo({
    FirstName:  req.body.fname, 
    LastName: req.body.lname,
    Email: req.body.email,
    Address: req.body.address ,
    Zip: req.body.zip, 
    city: req.body.city ,
    prvince: req.body.province,
    country: req.body.country ,
    cardname: req.body.cardname ,
    cardnumber: req.body.cardnumber ,
    cardexpiry: req.body.cardexpiry ,
    cardcvv: req.body.cardcvv,
  })
  usercheckout.save((err) => {
    if(err) {
      console.log("There was an error in saving");
    } else {
     console.log("The usercheckout was saved to the HungerThief");
    }
 });
 const sgMail = require('@sendgrid/mail');
 sgMail.setApiKey(process.env.MY_API_ID);
 const msg = {
     to:  `${req.body.email}`,
     from: 'hungerthiefforyou@gmail.com',
     subject: 'Shipping Confirmation',
     html: `<b>Hello ${req.body.fname}, <br>
      This Email is a confirmation that your purchase of the following items is successfull." <br>
      Below are the details of your order. <br>
      Customer Name: ${req.body.fname} ${req.body.lname} <br>
      Items: ${req.body.packages} <br>
      Total: $${req.body.total} <br>
      Thank You, <br>
      Hunger Thief. <b>`,
 };
 sgMail.send(msg)
 .then(()=>{
   y=[];
     res.redirect("/shippingdashboard");
 })
 .catch(err=>{
     console.log(`error is ${err}`);
 })
})

router.get("/shippingdashboard",(req,res)=>{
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="../css/style.css">
  
      <script src="https://kit.fontawesome.com/347a9e55b8.js" crossorigin="anonymous"></script>
  </head>
  <style>
      body {
          background-color: rgb(252, 252, 252);
      }
      i {
          margin-top:10px;
          color: green;
          font-size: 25px;
          text-align: left;
      }
  </style>
  <body>
      <header>
  
      </header>
      <main>
          <div class="dash_main">
              <i class="fas fa-utensils"></i>
              <div id="dash_top">
              </div>
              <div id="eat_repeat">Eat and Repeat</div>
              <div id="dash_message">
                  <div id="thank">
                      <h1> Thank you!</h1>
                  </div>
                  <div id="dash_data">
                     Thank you for ordering with Hunger Thief. You will get a confirmation email shortly.
                  </div>
              </div>
          </div>
  
          <div id="dash_footer">
              Click <a href="/">here</a> to navigate yourself to the <span id="homepage"> [HUNGER <span
                      class="thief">THIEF]</span></span>
          </div>
      </main>
  </body>
  </html>`)
  })
module.exports = router;