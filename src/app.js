import express from 'express';
import {__dirname} from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import productsManager from './productsManager.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)

// Home

app.get('', async (req,res) => {
    try {
        const products = await productsManager.getProducts()
        res.render('home', {products})
    } catch (error) {
        res.status(500).json({error})
    }
})

// RealTimeProducts

app.get('/realtimeproducts', (req,res) => {
    res.render('socket')
})

// PORT

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('Cliente conectado', socket.id);
    const products = await productsManager.getProducts()
    socketServer.emit('productsUpdate',products)
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

    socket.on('productAdd', async (newProduct) => {
        await productsManager.addProduct(newProduct)
        const products = await productsManager.getProducts()
        socketServer.emit('productsUpdate',products)
    })
})
