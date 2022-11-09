const mongoose = require('mongoose')



const RestaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})


const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant