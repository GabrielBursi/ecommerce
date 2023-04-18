import { User } from "../../models"

export const excludeProductFavorite = async (userId: string | undefined, productId: string | undefined) => {
    try {
        if (!userId || !productId) {
            return new Error("ID do usuário ou ID do produto não encontrados.")
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error("Usuário não encontrado.")
        }

        const indexDeleted = user.favorites.products.findIndex(product => product.uuid === productId)
        if(indexDeleted === -1) {
            return new Error("Produto não encontrado nos favoritos.")
        }
        user.favorites.products.splice(indexDeleted, 1)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).exec();
        return updatedUser?.favorites.products;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
    
}