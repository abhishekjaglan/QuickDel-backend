const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders')

router.post('/myOrdersData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;