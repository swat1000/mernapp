const express = require('express');
const router = express.Router();

router.post('/fooditems', (req, res) => {
    try {
        res.send([global.fooditems, global.foodCategory])
        
    } catch (error) {
        console.log(error.message)
        res.send("server error")
    }
})

module.exports = router;