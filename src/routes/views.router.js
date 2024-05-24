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

router.get('/chat',(req, res)=>{
    return res.render('chat')
})



router.get('/products',async (req, res)=>{
    let page = req.query.page;
    let limit = parseInt(req.query.limit) || 10;
    let filter = 'Calzado'
    console.log(filter)

    let result  = await productsModel.paginate({category:filter}, {limit:2, page, lean:true})
    console.log(result)
    if(!page) page = 1
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products/?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products/?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('products',result)
    
})


module.exports = router


/* let productsFiltrados = await productsModel.paginate({category:'Calzado'}, {limit:2, page:1})
console.log(productsFiltrados) */