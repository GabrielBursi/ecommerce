"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInCart = void 0;
const utils_1 = require("../../../utils");
const models_1 = require("../../models");
const addInCart = async (userId, productId) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado';
        }
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        const product = await models_1.Products.findOne({ uuid: productId }).exec();
        if (!product) {
            return 'Produto não encontrado id';
        }
        if (!user) {
            return 'Usuário não encontrado id';
        }
        const productIsAlreadyCart = user.cart.products.find((product) => product.uuid === productId);
        if (user.cart.products.length === 0) { //*QUANDO O CARRINHO ESTÁ VAZIO (NULL)
            const newCart = [
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1,
                }
            ];
            user.cart.products = newCart;
        }
        else if (user.cart.products.length > 0 && !productIsAlreadyCart) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newCart = [
                ...user.cart.products,
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1,
                }
            ];
            user.cart.products = newCart;
        }
        else if (user.cart.products.length > 0 && productIsAlreadyCart) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            const existingProductIndex = user.cart.products.findIndex(p => p.uuid === productId);
            user.cart.products[existingProductIndex].quant++;
        }
        const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true);
        const total = (0, utils_1.somePrice)(user.cart.products, optionDeliverySelected[0]);
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { cart: { total, products: user.cart.products } }, { new: true }).populate('cart.products').exec();
        return updatedUser?.cart;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.addInCart = addInCart;
