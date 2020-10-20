const express = require("express")
const router = express.Router()
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")


router.get("/prehistoric_creatures", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    //take the text form dinosaurs.json and store it in a variable
    let creatureData = JSON.parse(creatures)
    console.log(creatureData)// convert string into an array

    //handle a query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){// reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        creatureData = creatureData.filter((creature)=>{
            return creature.type.toLowerCase()  === nameFilter.toLocaleLowerCase()
        })
    }
    res.render("prehistoric_creatures/index.ejs", {creatures: creatureData})
})

router.get("/prehistoric_creatures/new", (req,res)=>{
    res.render("prehistoric_creatures/new")
})

router.get("/prehistoric_creatures/:idx", (req,res) =>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    //get array index from url parameter
    let creatureIndex = req.params.idx

    console.log(creatureData[creatureIndex])
    res.render("prehistoric_creatures/show", {creature: creatureData[creatureIndex], creatureID: creatureIndex})
})

router.post("/prehistoric_creatures", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body)
    //save the new creatureData array to the prehistoric_creatures.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    //rederect the GET dinosarurs route (index)
    res.redirect("/prehistoric_creatures")
    console.log(req.body)
})

module.exports = router;