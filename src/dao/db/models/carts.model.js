import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

export const cartsModel = mongoose.model('Carts', cartsSchema)