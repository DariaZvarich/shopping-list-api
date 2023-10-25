const express = require('express')

const router = express.Router();

const items = [{ id: '1', name: 'Apple', quantity: 0}]

router.get('/', (req, res) => {
    res.json({
        items,
    });
    
});

module.exports = router;