import { Router } from "express"
import cartsManager from '../cartsManager.js';

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.createCart()
        res.status(200).json({ message: 'Cart Created', newCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/:idCart/product/:idProduct', async (req, res) => {
    const {idCart, idProduct} = req.params
    try {
        const updatedCart = await cartsManager.addToCart(+idCart, +idProduct)
        res.status(200).json({message: 'Product Added', updatedCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    try {
        const cartProducts = await cartsManager.getCartItems(+idCart)
        res.status(200).json({ message: 'Cart products', cartProducts})
    } catch (error) {
        res.status(500).json({error})
    }
})


export default router