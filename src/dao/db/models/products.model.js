import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

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
    category: {
        type: String
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

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema)