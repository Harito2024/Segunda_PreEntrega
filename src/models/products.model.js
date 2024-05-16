const mongoose = require('mongoose')

const productsColletion = 'Products'

const productsSchema = new mongoose.Schema({
    title:{type: String, required: true, max:100},
    description:{type: String, required: true, max:400},
    code: {type: String, required: true, unique: true, max:100},
    price:{type: Number, required: true},
    status: {type: Boolean, default: true},
    stock: {type: Number, required: true},
    thumbnail:{type: String, required: true},
    category: {type: String, required: true, max:100},
    code: {type: String, required: true},
})


const productsModel=mongoose.model(productsColletion, productsSchema)

module.exports = productsModel