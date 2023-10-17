import { Router } from "express";
import { usersManager } from "../dao/managers/users/UsersManager.js";
import { generateToken, compareData } from "../utils.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import passport from "passport";

const router = Router()

// Login sin passport
/* router.post('/login', async(req,res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'Some data is missin'})
        }
        const userDB = await usersManager.findUser(username)
        if (!userDB) {
            return res.status(400).json({ message: 'Signup first'})
        }
        const isPasswordValid = await compareData(password, userDB.password)
        if(!isPasswordValid) {
            return res.status(401).json({message: 'User or Password not valid'})
        }
        const token = generateToken(userDB)
        res.status(200).cookie('token', token).json({message:'Token generated', token})
    } catch (error) {
        res.status(500).json({message: error})
    }

}) */

router.post('/', passport.authenticate('local', {session: false, failureRedirect: '/login'},), (req, res) => {
    try {
        const token = generateToken(req.user)
        res.status(200).cookie('token', token).redirect('/')
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Deslogueado correctamente', success: true});
});

router.get('/validation', passport.authenticate('jwt', { session: false}) , (req, res) => {
    try {
        res.json({message: 'Prueba jwt passwport', cookies: req.cookies})
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/githubSignup', passport.authenticate('github', { session: false, scope: [ 'user:email'] }))

router.get('/github', passport.authenticate('github', {session: false,
    failureRedirect: '/login'
}), (req,res) => {
    res.send('Registrado exitosamente')
})

export default router