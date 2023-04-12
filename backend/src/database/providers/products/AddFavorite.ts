import { Products, FavoritesProducts } from "../../models";

export const addInFavorite = async (userId: string, productId: string) => {
    try {
        const favorite = await FavoritesProducts.findOne({ userId }).exec();
        const product = await Products.findById({ _id: productId }).exec()

        if (product) {
            if (!favorite) {
                const newProduct = new FavoritesProducts({
                    userId,
                    products: [product]
                })
                await newProduct.save();
                return newProduct
            } else {
                const favoriteWithNewProduct = await FavoritesProducts.findOneAndUpdate({ userId }, { $push: { products: product } }).exec();
                if (favoriteWithNewProduct) {
                    return favoriteWithNewProduct
                }
            }
        }

        return new Error('Produto não encontrado id: ' + productId)

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}