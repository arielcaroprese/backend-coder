import express from 'express';
import productsManager from './productsManager.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// rutas

app.get('/api/products', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productsManager.getProducts()
        if (!limit) {
            res.status(200).json({ message: 'Products', products})
        } else {
            const limitedProducts = products.slice(0,limit)
            res.status(200).json({ message: 'Products', limitedProducts})
        }
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
})

app.get('/api/products/:idProduct', async (req, res) => {
    try {
        const {idProduct} = req.params
        const product = await productsManager.getProductsById(+idProduct)
        res.status(200).json({ message: 'Products', product})
    } catch (error) {
        res.status(500).json({error})
    }
}) 

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})