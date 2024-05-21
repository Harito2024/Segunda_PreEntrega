const express = require('express')
const router = express.Router()
const messagesModel = require('../dao/models/messages.model.js')
const productsModel = require('../dao/models/products.model.js')



router.get('/', async (req, res)=>{
    let products = await productsModel.find().lean()
    return res.render('home', {products})
})

router.get('/realTimeProducts', async (req, res)=>{
    return res.render('realTimeProducts')
})

router.get('/chat', async (req, res)=>{
    let messages = await messagesModel.find()
    return res.render('chat', {messages})
})


module.exports = router