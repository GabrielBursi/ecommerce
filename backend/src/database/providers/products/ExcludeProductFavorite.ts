import { User } from "../../models"

export const excludeProductFavorite = async (userId: string, productId: string | undefined) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado'
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return "Usuário não encontrado."
        }

        const indexDeleted = user.favorites.findIndex(product => product.uuid === productId)
        if(indexDeleted === -1) {
            return "Produto não encontrado nos favoritos."
        }
        user.favorites.splice(indexDeleted, 1)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).exec();
        return updatedUser?.favorites;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
    
}