import {Router} from 'express';
import productsMongo from '../dao/managers/products/productsMongo.js';

const router = Router();

const publicAccess = (req, res, next) => {
    if(req.session) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {
    console.log(req.session)
    if(!req.session) return res.redirect('/login');
    next();
}

/*
router.get('', async (req,res) => {
    try {
        const products = await productsManager.getProducts()
        res.render('home', {products})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/', (req,res) => {
    res.render('socket')
})
*/

router.get('', publicAccess, async (req,res) => {
    try {
        const products = await productsMongo.findAll()
        res.render('products/products', {products})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/product/:id', async (req, res) => {
    const {id} = req.params

    try {
        const product = await productsMongo.findById(id)
        res.render('products/productDetail', {product})
    } catch (error) {
        res.status(500).json({error})
    }
}) 

router.get('/login', publicAccess, (req,res) => {
    res.render('users/login')
})


router.get('/signup', publicAccess, (req,res) => {
        res.render('users/signup')
})

router.get('/profile', privateAccess, (req,res) => {
    res.render('users/profile', {
        user: req.session.user
    })
})

export default router;