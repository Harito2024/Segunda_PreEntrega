const express = require('express')
const router = express.Router()
//const ProductManager = require('../controllers/product-manager.js')
//const manager = new ProductManager('../data/carritos.json')
const cartModel = require('../models/carts.model.js')


router.get('/carts/:cid', async (req, res)=>{
    try {
         let {cid} = req.params
         if(!cid){
            res.send({ status: 'error', error: 'Debe buscar por ID del producto' })
         }
         let result = await cartModel.findById({_id: cid})
         res.send({ result: 'success', payload: result })

    } catch (error) {
        console.log(error)
    }
})

router.post('/carts', async (req, res)=>{
    try {
        let {cid} = req.params
         if(!cid){
            res.send({ status: 'error', error: 'Debe buscar por ID del Carrito' })
         }
         let result = await cartModel.findById({_id: cid})
         res.send({ result: 'success', payload: result })
    } catch (error) {
        console.log(error)
    }
})

router.put('/carts/:cid', async (req, res)=>{
    try {
        const {cid} = req.params
        const cart = await cartModel.find
    } catch (error) {
        console.log(error)
    }
})





module.exports = router