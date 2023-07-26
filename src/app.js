import express from 'express';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// rutas

app.get('/api/products', async (req, res) => {
    try {
        const products = await productsManager.getUsers()
        res.status(200).json({ message: 'Users', users})
    } catch (error) {
        res.status(500).json({error})
    }
}

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})