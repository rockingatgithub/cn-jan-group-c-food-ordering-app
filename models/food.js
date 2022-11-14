const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: String,
        enum: ['1', '2', '3', '4', '5']
    }

})


const Food = mongoose.model('Food', FoodSchema)
module.exports = Food;