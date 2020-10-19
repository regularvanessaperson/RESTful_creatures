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

//CREATURE INDEX
app.get("/prehistoric_creatures", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    //take the text form dinosaurs.json and store it in a variable
    let creatureData = JSON.parse(creatures)
    console.log(creatureData)// convert string into an array

    // //handle a query string if there is one
    // console.log(req.query.imageFilter)
    // let imageFilter = req.query.imageFilter
    // if(imageFilter){// reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
    //     creatureData = creatureData.filter((creature)=>{
    //         return creature.name.toLowerCase()  === imageFilter.toLocaleLowerCase()
    //     })
    // }
    res.render("prehistoric_creatures/index.ejs", {creatures: creatureData})
})

//DINO INDEX ROUTE
app.get("/dinosaurs", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    //take the text form dinosaurs.json and store it in a variable
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)// convert string into an array

    //handle a query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){// reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase()  === nameFilter.toLocaleLowerCase()
        })
    }
    res.render("dinosaurs/index.ejs", {dinosaurs: dinoData})
})

//CREATURE NEW ROUTE
app.get("/prehistoric_creatures/new", (req,res)=>{
    res.render("new")
})

//DINO NEW ROUTE
app.get("/dinosaurs/new", (req,res)=>{
    res.render("new")
})
// DINO SHOW ROUTE
app.get("/dinosaurs/:idx", (req,res) =>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = req.params.idx

    console.log(dinoData[dinoIndex])
    res.render("show", {dino: dinoData[dinoIndex], dinoID: dinoIndex})
})

//DINO POST ROUTE
app.post("/dinosaurs", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)
    //save the new dinoData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    //rederect the GET dinosarurs route (index)
    res.redirect("/dinosaurs")
    console.log(req.body)
})

app.listen(8000, ()=>{
    console.log("you're listening ot port 8k")
})