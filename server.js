// create an express app
const express = require("express")
const app = express()

const path = require("path")
const fs = require('fs')
const bodyParser = require('body-parser')
let jdata = JSON.parse(fs.readFileSync('public/project.json'));
//jdata.data.push("Hello World"); // to see change

// use the express-static middleware
app.use(bodyParser.json())
app.use(express.static("public"))

// define the first route
app.get("/hello", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})


app.get('/',function(req, res){
    res.sendFile("index.html", {root: path})
})
// start the server listening for requests
let listener = app.listen(process.env.PORT || 3000, 
	() => console.log(`Server is running...${listener.address().port}`));
