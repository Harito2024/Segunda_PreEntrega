const express = require('express')
const router = express.Router()
const messagesModel = require('../models/messages.model.js')
const productsModel = require('../models/products.model.js')



router.get('/', async (req, res)=>{
    const products = productsModel.find()
    return res.render('products', { products})
})

router.get('/chat', async (req, res)=>{
    return res.render('chat')
})


module.exports = router;