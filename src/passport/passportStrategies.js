import passport from 'passport';
import { usersModel } from '../dao/db/models/users.model.js'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as GitHubStrategy} from 'passport-github2'
import { usersManager } from '../dao/managers/users/UsersManager.js'
import { compareData } from '../utils.js'

passport.use('local', new LocalStrategy(
    async function( username, password, done){
        try {
                const userDB = await usersManager.findUser(username)
                if(!userDB){
                    return done(null, false)
                }
                const isPasswordValid = await compareData(password, userDB.password)
                if(!isPasswordValid)
                    return done(null, false)
                return done(null, userDB)
        } catch (error) {
            done(error)
        }
    }
))

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.c96410c580591937',
    clientSecret: 'a85cb2c7a53796b26c1bbace3bed4282be8b4db8',
    callbackURL: 'http://localhost:8080/api/sessions/github'
},
async function(accessToken, refreshToken, profile, done) {
    try {
        const userDB = await usersManager.findUser(profile.username)
        if(!userDB) {
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                username: profile.username,
                email: profile._json.email,
                password: ' '
            }
            result = await usersManager.create(newUser)
            return done(null, result)
        } else {
            return done(null, userDB)
        }

    } catch (error) {
        done(error)
    }
}))

// user => id
passport.serializeUser((user, done) => {
    done(null, user._id)
})

// id => user
passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersModel.findById(id)
      done(null, user)
    } catch (error) {
        done(error)
    }
})