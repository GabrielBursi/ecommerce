import { PasswordCrypto } from "../../../shared/services"
import { IDelivery, NewUser } from "../../../types"
import { User } from "../../models"
import { v4 as uuidv4 } from 'uuid';

export const create = async (user: NewUser): Promise<NewUser | Error | string> => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(user.password)

        const email = await User.findOne({email: user.email}).exec()

        if(email){
            return 'Esse e-mail já existe'
        }

        const deliveryOptions: IDelivery[] = [
            {
                name: "Entrega Padrão",
                rating: 4.5,
                price: 10.59,
                days: 7,
                selected: true
            },
            {
                name: "Entrega Expressa",
                rating: 4.9,
                price: 20.99,
                days: 3,
                selected: false
            },
            {
                name: "Entrega Prioritária",
                rating: 4.8,
                price: 30.15,
                days: 1,
                selected: false
            },
            {
                name: "Entrega Econômica",
                rating: 4.2,
                price: 7.89,
                days: 14,
                selected: false
            }
        ]

        const newUser = new User({
            ...user,
            uuid: uuidv4(), 
            password: hashedPassword,
            confirmPassword: hashedPassword,
            deliveryOptions
        })

        await newUser.save()

        return newUser

    } catch (error) {
        return new Error('Erro ao criar registro: ' + error)
    }
}