const express = require("express");
let cors = require('cors')
let app = express();

let bodyParser = require('body-parser');
const path = require('path');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// Add LovelyDb To Your Project
let lovelyDb = require("../lovely-db");


// Get All Data
app.get("/", async (req, res) => {
    let data = await lovelyDb.get("posts");
    res.json(data);
});


// Get Data With Query
app.get("/query", async (req, res) => {
    // http://localhost/query?id=2&username=Antonette
    let data = await lovelyDb.get("users", x => x.id == req.query.id && x.username == req.query.username);
    res.json(data);
});


// Add New Record
app.post("/", async (req, res) => {
    let data = await lovelyDb.add("posts", {
        title: req.body.title,
        description: req.body.description,
        readCount: 0
    });
    res.json(data);
});


// Update a Record
app.put("/", async (req, res) => {
    let data1 = await lovelyDb.update("posts",
        x => x.id == req.body.id,
        {
            title: req.body.title,
            description: req.body.description,
            readCount: 0
        }
    );
    res.json(data1);
});


// Delete a Record
app.delete("/", async (req, res) => {
    let data1 = await lovelyDb.delete("posts", x => x.id == req.body.id);
    res.json(data1);
});


// App start with port 80
app.listen(process.env.PORT || 80, () => {
    console.log("App Started On Port : 80");
});

module.exports = app;