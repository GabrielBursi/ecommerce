import { Products, ProductsInCart } from "../../models"

export const addInCart = async (userId: string, productId: string) => {
    try {
        const cart = await ProductsInCart.findOne({ userId }).exec();
        const product = await Products.findOne({_id: productId}).exec()

        if(product){
            if (!cart) {
                const newProduct = new ProductsInCart({
                    userId, 
                    products: [product]
                })
                await newProduct.save();
                return newProduct
            } else {
                const cartWithNewProduct = await ProductsInCart.findOneAndUpdate({ userId },{ $push: { products: product } }).exec();
                if (cartWithNewProduct) {
                    return cartWithNewProduct
                }
            }
        }

        return new Error('Produto não encontrado id: ' + productId)

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}