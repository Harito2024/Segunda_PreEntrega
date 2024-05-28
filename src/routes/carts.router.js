const express = require('express')
const router = express.Router()
//const ProductManager = require('../controllers/product-manager.js')
//const manager = new ProductManager('../data/carritos.json')
const cartModel = require('../dao/models/carts.model.js')
const productModel = require('../dao/models/products.model.js')
const { CURSOR_FLAGS } = require('mongodb')


router.get('/carts', async (req, res)=>{
    try {
         let carts = await cartModel.find()
         res.send({ result: 'success', payload: carts })
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res)=>{
    try {
         const {cid} = req.params
         const cart = await cartModel.findById({_id: cid})

         if(!cart){
            res.send({ status: 'error', error: 'El carrito buscado no existe'})
         }
         res.send({ result: 'success', payload: cart })

    } catch (error) {
        console.log(error)
    }
})

router.post('/carts', async (req, res)=>{
    try {
        const cart = await cartModel.create({})
        res.send({ result: 'success', payload: cart })
    } catch (error) {
        console.log(error)
    }
})



router.put('/carts/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params
        let result = await cartModel.findById({_id: cid})
        let product
        if(!result){
            return res.send({status: 'error', error: 'El numero de carrito no existe'})
        }
        const productInCart = result.products.find(item=>item.id.toString() === pid)
        
        if(!productInCart){
            product = await productModel.findById({_id:pid})
            result.products.push({id:pid, quantity:1, product})
        }else{
            productInCart.quantity++
        }
        result = await cartModel.updateOne({_id:cid}, result)
        res.send({ result: 'success', payload: result })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/carts/:cid/product/:pid', async (req, res)=>{
    try {
        let {cid, pid} = req.params

        let result = await cartModel.findById({_id: cid})
        product = result.products.find(id=>id.id==pid)
         

        if(product){
            if(product.quantity=1){
                result = result.products.filter(id=>id.id!=pid)
                console.log(result)
            }
        }else{
            product.quantity = product.quantity -1
        }
        result = await cartModel.updateOne({_id:cid}, result)


        res.send({ result: 'success', payload: result })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/carts/:cid', async (req, res)=>{
    try {
        let {cid} = req.params

        let result = await cartModel.findById({_id: cid})
        
        if(result){
            result = await cartModel.deleteOne({_id:cid})
            res.send({ result: 'success', payload: result })
        }else{
            return res.send('Carrito no encontrado')
        }

    } catch (error) {
        console.log(error)
    }
})






module.exports = router