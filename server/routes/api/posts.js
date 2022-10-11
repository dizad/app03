//imports
    let express = require('express');
    let router = express.Router();
    require('dotenv').config(); //environment variables
    let fishData = require('./fish-data.json');

//api
    router.post('/gofish', async (req, res) => {
        if (req.body.key === process.env.API_KEY) {
            res.send(fishData);
        } else {
            res.status(401).end();
        }
    });

//export
    module.exports = router;