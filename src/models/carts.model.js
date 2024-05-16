const mongoose = require('mongoose')

const cartColletion = 'Cart'

const cartSchema = new mongoose.Schema({
    products:[{
        id:{
            type: String
        },
        quantuty:{
            type: Number, required: true
        }
    }]
})


const cartModel=mongoose.model(cartColletion, cartSchema)

module.exports = cartModel