var mongoose = require("mongoose");
const Schema = mongoose.Schema
const productSchema = new Schema({
    Name: {
        type: String
    },
    Date: {
        type:Date,
        default:Date.now
    },
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;