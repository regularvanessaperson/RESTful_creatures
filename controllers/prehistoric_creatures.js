const express = require("express")
const router = express.Router()
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")
const methodOverride = require("method-override")

router.use(methodOverride("_method"))

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
    res.render("prehistoric_creatures/show", {creature: creatureData[creatureIndex], creatureId: creatureIndex})
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


//DINO GET EDIT ROUTE
router.get("/prehistoric_creatures/edit/:idx", (req,res)=>{
    // res.send(`you've hit the GET edit route for the # dino # ${req.params.idx}`)
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    res.render("prehistoric_creatures/edit", {creature: creatureData[req.params.idx], creatureId: req.params.idx})
})

router.put("/:idx", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    creatureData[req.params.idx].img_url = req.body.img_url
    creatureData[req.params.idx].type = req.body.type
    // console.log("new dinoData:", dinoData)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    res.redirect("/prehistoric_creatures")
})

router.delete("/:idx", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creatureData = JSON.parse(creatures)
    //remove the deleted dinosaur from the dinosaurs array
    creatureData.splice(req.params.idx, 1)
    //save the new dinosaurs to the json file
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    res.redirect("/prehistoric_creatures")
})

module.exports = router;