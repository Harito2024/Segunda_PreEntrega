const express = require('express')
const router = express.Router()
//const ProductManager = require('../controllers/product-manager.js')
const productsModel = require('../models/products.model.js')
//const manager = new ProductManager('../data/products.json')


router.get('/products', async (req, res) => {
    try {
        let products = await productsModel.find()
        res.send({ result: 'success', payload: products })
    } catch (error) {
        console.log(error)
    }
})

router.get('/products/:uid', async (req, res) => {
    let { uid } = req.params
    if (!uid) {
        res.send({ status: 'error', error: 'Debe buscar por ID del producto' })
    }

    let result = await productsModel.find({ _id: uid })
    res.send({ result: 'success', payload: result })

})

router.post('/products', async (req, res) => {
    let { title, description, code, price, status, stock, thumbnail, category  } = req.body
    if (!title || !description || !code || !price || !status || !stock || !thumbnail || !category) {
        res.send({ status: 'error', error: 'Faltan Parametros' })
    }
    let result = await productsModel.create({ title, description, code, price, status, stock, thumbnail, category })


    res.send({ result: 'success', payload: result })
})

router.put('/products/:uid', async (req, res) => {
    let { uid } = req.params
    let productToReplace = req.body
    
    if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock) {
        res.send({ status: 'error', error: 'Faltan Parametros' })
    }
    let result = await productsModel.updateOne({ _id: uid }, productToReplace)
    res.send({ result: 'success', payload: result })
})

router.delete('/products/:uid', async (req, res) => {
    let { uid } = req.params

    let result = await productsModel.deleteOne({ _id: uid })

    res.send({ result: 'success', payload: result })
})





module.exports = router