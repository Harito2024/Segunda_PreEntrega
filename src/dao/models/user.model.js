const mongoose = require('mongoose')

const userColletion = 'User'

const userSchema = new mongoose.Schema({
    name:{type: String, required: true, max:20},
    lastName:{type: String, required: true, max:20},
    email:{type: String, required: true, max:100},
})


const userModel=mongoose.model(userColletion, userSchema)

module.exports = userModel