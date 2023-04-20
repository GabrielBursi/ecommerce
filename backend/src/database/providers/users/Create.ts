import { PasswordCrypto } from "../../../shared/services"
import { NewUser } from "../../../types"
import { User } from "../../models"
import { v4 as uuidv4 } from 'uuid';

export const create = async (user: NewUser): Promise<NewUser | Error | string> => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(user.password)

        const email = await User.findOne({email: user.email}).exec()

        if(email){
            return 'Esse e-mail já existe'
        }

        const newUser = new User({
            ...user,
            uuid: uuidv4(), 
            password: hashedPassword,
            confirmPassword: hashedPassword,
        })

        await newUser.save()

        return newUser

    } catch (error) {
        return new Error('Erro ao criar registro: ' + error)
    }
}