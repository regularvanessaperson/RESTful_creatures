const express = require("express")
const router = express.Router()
const ejsLayouts = require("express-ejs-layouts")
const fs = require("fs")
const { Recoverable } = require("repl")
const methodOverride = require("method-override")

router.use(methodOverride("_method"))

router.get("/dinosaurs", (req,res)=>{
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

router.get("/dinosaurs/new", (req,res)=>{
    res.render("dinosaurs/new")
})

router.get("/dinosaurs/:idx", (req,res) =>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = req.params.idx

    console.log(dinoData[dinoIndex])
    res.render("dinosaurs/show", {dino: dinoData[dinoIndex], dinoID: dinoIndex})
})

router.post("/dinosaurs", (req,res)=>{
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

//DINO GET EDIT ROUTE
router.get("/dinosaurs/edit/:idx", (req,res)=>{
    // res.send(`you've hit the GET edit route for the # dino # ${req.params.idx}`)
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    res.render("dinosaurs/edit", {dino: dinoData[req.params.idx], dinoId: req.params.idx})
})

router.put("/:idx", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // console.log("new dinoData:", dinoData)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

router.delete("/:idx", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
    //save the new dinosaurs to the json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

module.exports = router;