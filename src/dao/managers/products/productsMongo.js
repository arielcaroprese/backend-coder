import { productsModel } from "../../db/models/products.model.js";

class ProductsMongo {

    async findAll(limit=10, page=1, sortByPrice="ASC", query=""){
        console.log(`limit = ${limit}, page = ${page}, sortBtPrice = ${sortByPrice}, query = ${query}`);
        try {
            const result = await productsModel.paginate(query, {limit, page, sort:{price: sortByPrice}})
            const productsData = {
                status: "Success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `http://localhost:8080/api/products/?page=${result.prevPage}`: null,
                nextLink: result.hasNextPage ? `http://localhost:8080/api/products/?page=${result.nextPage}`: null
            }
            return productsData
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