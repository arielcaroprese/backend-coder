import express from 'express';
import {__dirname} from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import productsManager from './dao/managers/products/productsManagerFile.js';

import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'

import './dao/db/dbConfig.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Public
app.use(express.static(__dirname+'/public'))

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

// Cookies
app.use(cookieParser('secretKeyCookies'))


// Sessions
app.use(session({
    store: new mongoStore({
        mongoUrl: 'mongodb+srv://arielcaroprese:Icosaedro27@cluster0.vdrhniv.mongodb.net/backend-coder?retryWrites=true&w=majority',
        ttl: 180,
    }),
    secret: 'secretSession',
    cookie: {maxAge: 180000},
    resave: false,
    saveUninitialized: false
}))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', usersRouter)
app.use('', viewsRouter)


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
