import { usersModel } from "../../db/models/users.model.js";

class UsersManager {
    
    async create(user){
        try {
            const newUser = usersModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    }

    async findUser(username){
        try {
            const user = usersModel.findOne({username})
            return user
        } catch(error) {
            return error
        }
    }
}

export const usersManager = new UsersManager()