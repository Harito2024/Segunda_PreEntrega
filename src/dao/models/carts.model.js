const mongoose = require('mongoose')



const cartColletion = 'Cart'

const cartSchema = new mongoose.Schema({
    products:[{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Products'
        },
        quantity:{
            type: Number,
            required: [true]
        },
        product:{type:Object}

    }]
})


const cartModel=mongoose.model(cartColletion, cartSchema)

module.exports = cartModel