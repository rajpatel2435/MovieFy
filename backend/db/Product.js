const mongoose = require('mongoose')
// create product schema here
// define the property and value
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    userId: String
})

const productModel = mongoose.model('products', productSchema, 'products')

module.exports = productModel
