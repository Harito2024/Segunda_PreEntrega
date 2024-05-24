const express = require('express')
const router = express.Router()
//const ProductManager = require('../controllers/product-manager.js')
//const manager = new ProductManager('../data/carritos.json')
const cartModel = require('../dao/models/carts.model.js')


router.get('/carts', async (req, res)=>{
    try {
         let result = await cartModel.find()
         res.send({ result: 'success', payload: result })
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res)=>{
    try {
         let {cid} = req.params
         if(!cid){
            res.send({ status: 'error', error: 'Debe buscar por ID del Carrito'})
         }
         let cart = await cartModel.findById({_id: cid})
         res.send({ result: 'success', payload: cart })

    } catch (error) {
        console.log(error)
    }
})

router.post('/carts', async (req, res)=>{
    try {
        const result = await cartModel.create({})
        res.send({ result: 'success', payload: result })
    } catch (error) {
        console.log(error)
    }
})

router.put('/carts/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params
        let result = await cartModel.find(cid)
        if(!result){
            res.send({status: 'error', error: 'El numero de carrito no existe'})
        }
        const productInCart = result.products.find(item=>item.id === pid)
        if(!productInCart){
            result.products.push({id:pid, quantity:1})
        }else{
            productInCart.quantity++
        }
        result = await cartModel.updateOne({id:uid})
    } catch (error) {
        console.log(error)
    }
})





module.exports = router