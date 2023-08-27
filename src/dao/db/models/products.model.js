import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    }
})

export const productsModel = mongoose.model('Products', productsSchema)