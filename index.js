const { Router } = require("express")
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")


app.set("view engine", "ejs")
app.use(ejsLayouts)
//body-parser middleware

app.use(express.urlencoded({extended: false}))

app.get("/", (req,res)=>{
    res.render("home")
})

const dinoController = require("./controllers/dinosaurs")
const creatureController = require("./controllers/prehistoric_creatures")

//CREATURE INDEX
app.get("/prehistoric_creatures", creatureController)

//DINO INDEX ROUTE
app.get("/dinosaurs", dinoController)


//CREATURE NEW ROUTE
app.get("/prehistoric_creatures/new", creatureController)

//DINO NEW ROUTE
app.get("/dinosaurs/new", dinoController)

//CREATURE SHOW ROUTE
app.get("/prehistoric_creatures/:idx", creatureController)

// DINO SHOW ROUTE

app.get("/dinosaurs/:idx", dinoController)

//PREHISTORIC CREATURE POST ROUTE
app.post("/prehistoric_creatures", creatureController)

//DINO POST ROUTE
app.post("/dinosaurs", dinoController)

app.listen(8000, ()=>{
    console.log("you're listening ot port 8k")
})