import { User } from "../../models"

export const select = async (userId: string, cep: string) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error('Usuário não existe');
        }

        const selectedAddress = user.address?.address.find(address => address.cep === cep);

        return selectedAddress || new Error('Não existe nenhum endereço cadastrado com esse CEP.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o endereço');
    }
}