const express = require('express')
const mongoose = require("mongoose");
const router = express.Router();

// Connect to MongoDB database

mongoose.connect('mongodb://localhost:27017/Client', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Define a schema for items

const itemsSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});


// Create a Mongoose model based on the schema

const Item = mongoose.model('Item', itemsSchema);


const items = [{ id: '1', name: 'Apple', quantity: 0}]

router.get('/', async(req, res) => {

    // Fetch items from the database

    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async(req, res) => {
    // Extract data from the request body
    const {name, quantity} = req.body;

    // Validate input (ensure name and quantity are provided)
    if (!name || !quantity ) {
        return res.status(400).json({error: 'Name and quantity are required'});
    }

    // Create a new item using the Mongoose model

    const newItem = new Item({name, quantity});

    // Save the new item to the database

    try{
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }

});

module.exports = router;