# LovelyDb
LovelyDb is simple and easy json database 🚀 You can save your data quickly by writing less code. We support 4 operations right now.

## Installation

```bash 
  npm install lovely-db
```

## Usage

```javascript

// Add LovelyDb To Your Project
let lovelyDb = require("lovely-db");

// Get All Data
let data = await lovelyDb.get("users");
res.json(data);

// Get Data With Query
let data = await lovelyDb.get("users", x => x.id == req.query.id);
res.json(data);

// Add New Record
await lovelyDb.add("users", {
    name: req.body.title,
    description: req.body.description,
    age: 18
});

// Update a Record
await lovelyDb.update("users",
    x => x.id == req.body.id,
    {
        name: req.body.title,
        description: req.body.description,
        age: req.body.age
    }
);

// Delete a Record
await lovelyDb.delete("users", x => x.id == req.body.id);

```

## Contact
Berke Kurnaz <br/>
https://github.com/berkekurnaz