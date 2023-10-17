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
import passport from 'passport'
import './passport/passportStrategies.js'
import jwtRouter from './routes/jwt.router.js'

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

// passport
app.use(passport.initialize())

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', usersRouter)
app.use('/api/jwt', jwtRouter)
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
