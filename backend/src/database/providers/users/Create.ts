import { PasswordCrypto } from "../../../shared/services"
import { NewUser } from "../../../types"
import { User } from "../../models"

export const create = async (user: NewUser): Promise<NewUser | Error | string> => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(user.password)

        const newUser = new User({
            ...user,
            password: hashedPassword,
            confirmPassword: hashedPassword
        })

        const email = await User.findOne({email: user.email}).exec()

        if(email){
            return 'Esse e-mail já existe.'
        }

        await newUser.save()

        return newUser

    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro: ' + error)
    }
}