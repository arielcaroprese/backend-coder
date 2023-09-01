import { cartsModel } from "../../db/models/carts.model.js";

class CartsMongo {

    async findAll(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const carts = await cartsModel.findById(id)
            return carts
        } catch (error) {
            return error
        }
    }

    async createOne(){
        try {
            const newCart = await cartsModel.create({products: []})
            return newCart
        } catch (error) {
            return error
        }
    }

    async addToCart(idCart, idProduct){
        try {
            const exists = cart.products.some(item => item.product == idProduct)
            if(exists) {
                const cartUpdate = await cartsModel.updateOne({ _id: idCart, "products.product": idProduct}, 
                {$inc: {
                    "products.$.quantity": 1 
                }})
            } else {     
                const cartUpdate = await cartsModel.updateOne(
                    { _id: idCart }, 
                    { $push: { 
                        products: {
                            product: idProduct,
                            quantity: 1
                        }}
                    })
            }
            return cartUpdate
        } catch (error) {
            return error
        }
    }

    async updateCart(idCart, productsArray){
        console.log(productsArray);
        try {
            const cartUpdate = await cartsModel.updateOne(
                { _id: idCart }, 
                { $set: {products: productsArray}}
            )
            return cartUpdate
        } catch (error) {
            return error
        }
    }

    async updateQuantity(idCart, idProduct, quantity){
        try {
            const cart = await cartsModel.findById(idCart)
            const cartUpdate = await cartsModel.updateOne({ _id: idCart, "products.product": idProduct},
            {$set: {
                "products.$.quantity": quantity 
            }})
            return cartUpdate
        } catch (error) {
            return error
        }
    }

    async deleteCartItems(idCart, idProduct){
        try {
            const productDelete = await cartsModel.updateOne(
                { _id: idCart }, 
                { $pull: { products: {product: idProduct}}}
            )
            return productDelete
        } catch (error) {
            return error
        }
    }

    async deleteAllCartItems(idCart){
        try {
            const productDelete = await cartsModel.updateOne(
                { _id: idCart }, 
                { $set: {products: []}}
            )
            return productDelete
        } catch (error) {
            return error
        }
    }

    async getCartItems(idCart){
        try {
            const cart = await cartsModel.find({_id : idCart}, {'products': 1, '_id': 0}).populate('products.product')
            return cart
        } catch (error) {
            return error
        }
    }

}

const cartsMongo = new CartsMongo()

export default cartsMongo