import { productsModel } from "../../db/models/products.model.js";

class ProductsMongo {

    async findAll(limit){
        try {
            const products = await productsModel.find({}).limit(limit)
            return products
        } catch (error) {
            return error
        }
    }

    async createOne(obj){
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj){
        try {
            const response = await productsModel.findByIdAndUpdate(id,obj)
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id){
        try {
            const product = await productsModel.findByIdAndDelete(id)
            return product
        } catch (error) {
            return error
        }
    }

}

const productsMongo = new ProductsMongo()

export default productsMongo