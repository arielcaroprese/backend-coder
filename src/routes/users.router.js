import { Router, response } from 'express';
import { usersManager } from '../dao/managers/users/UsersManager.js';
import { hashData, compareData } from '../utils.js';
import passport from 'passport'


const router = Router()

router.post('/signup', async(req, res) => {
    const {first_name, last_name, username, password} = req.body
    if(!first_name || !last_name || !username || !password){
        return res.status().json({message: 'Some data is missing'})
    }
    const userDB = await usersManager.findUser(username)
    if(userDB) {
        return res.status(400).json({message: 'Username already used'})
    }
    const hashPassword = await hashData(password)
    const newUser = await usersManager.create({...req.body, password:hashPassword})
    res.status(200).json({message: 'User Created', user:newUser})
})

router.post('/login', async(req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status().json({message: 'Some data is missing'})
    }
    const user = await usersManager.findUser(username)
    if(!user) {
        return res.status(400).json({message: 'Signup first'})
    }
    const isPasswordValid = await compareData(password, user.password)
    if(!isPasswordValid){
        return res.status(401).json({message: 'Invalid username or pasword'})
    }
    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role
    }
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error)
            return res.status(500).send({status:"error", error:"No se pudo cerrar la sesión"})
        }
        res.redirect('/login')
    })
})

router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email'] }))

router.get('/github', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req,res) => {
    console.log(req.user)
    req.session['username'] = req.user.username
    req.session['role'] = req.user.role
    res.send('Todo joia')
})

export default router