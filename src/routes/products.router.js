import { Router } from "express"
import productsMongo from '../dao/managers/products/productsMongo.js';

const router = Router()

router.get('/', async (req, res) => {
    const {limit, page, sortByPrice, ...query} = req.query
    try {
        const products = await productsMongo.findAll(limit, page, sortByPrice, query)
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const product = await productsMongo.findById(id)
        if (!product) {
            res.status(400).json({ message: 'Invalid ID'})
        } else {
            res.status(200).json({ message: 'Products', product})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}) 

router.post('/', async (req, res) => {
    const newProduct = req.body
    try {
        const addedProduct = await productsMongo.createOne(newProduct)
        res.status(200).json({ message: 'Product added', addedProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const updatedInfo = req.body
    try {
        const updatedProduct = await productsMongo.updateOne(id, updatedInfo)
        res.status(200).json({ message: 'Product updated', updatedProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        await productsMongo.deleteOne(id)
        res.status(200).json({ message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router