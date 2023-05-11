const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ItemSchema = require("./modals/Skins");
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skinFilter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("connected to mongodb!!")).catch(err=>console.log(err));

app.get("/search", async (req, res) => {
    const {name} = req.query;
    const {minPrice} = req.query;
    const {maxPrice} = req.query;
    const {minFloat} = req.query;
    const {maxFloat} = req.query;
    const {sortBy} = req.query;
    let {rarity} = req.query;

    console.log(sortBy);
    console.log(minPrice)
    console.log(maxPrice)
    console.log(minFloat)
    console.log(maxFloat)
    let sortParam = {price: 1};
    if(sortBy === "priceLow"){
        sortParam = {price: 1};
    }else if(sortBy === "priceHigh"){
        sortParam = {price: -1};
    }else if(sortBy === "floatLow"){
        sortParam = {float: 1};
    }else if(sortBy === "floatHigh"){
        sortParam = {float: -1};
    }else{
        sortParam = {price: 1};
    }
  
   try{

    if(rarity === "any"){
        rarity = undefined;
    }
    let query = {
        name: { $regex: name, $options: "i" },
        price: { $lte: maxPrice, $gte: minPrice },
        float: { $lte: maxFloat, $gte: minFloat },
    }
    if (rarity !== undefined) {
        query.rarity = rarity;
    }

    const data = await ItemSchema.find(query).sort(sortParam)
    .skip(0)
    .lean();
    
    return res.status(200).send(data);
   }
   catch(err){
    return res.status(500).send(err)
   }
})

app.get('/dummyData', async (req, res) => {
    const items = await ItemSchema.find({});
    res.send(items);
});

app.get('/', async (req, res) => {
    res.send("hello tester")
});

// Start the server
const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));