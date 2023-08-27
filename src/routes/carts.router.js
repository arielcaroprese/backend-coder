import { Router } from "express"
import cartsMongo from '../dao/managers/carts/cartsMongo.js';

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsMongo.createOne()
        res.status(200).json({ message: 'Cart Created', newCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/:idCart/product/:idProduct', async (req, res) => {
    const {idCart, idProduct} = req.params
    try {
        const updatedCart = await cartsMongo.addToCart(idCart, idProduct)
        res.status(200).json({message: 'Product Added', updatedCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    try {
        const cartItems = await cartsMongo.getCartItems(idCart)
        res.status(200).json({ message: 'Cart products', cartItems})
    } catch (error) {
        res.status(500).json({error})
    }
})


export default router