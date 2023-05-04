"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMyOrder = void 0;
const utils_1 = require("../../../utils");
const models_1 = require("../../models");
const createMyOrder = async (userId, order) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado id';
        }
        if (user.cart.products.length === 0) {
            return 'O carrinho está vazio.';
        }
        const address = user.address.find(ads => ads.isSelected === true);
        if (!address) {
            return 'Endereço selecionado não encontrado.';
        }
        const productIsAlreadyOrder = user.myOrders.find((product) => product.info.number === order.info.number);
        if (user.myOrders.length === 0) { //*QUANDO O CARRINHO ESTÁ VAZIO (NULL)
            const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true);
            const total = (0, utils_1.somePrice)(user.cart.products, optionDeliverySelected[0]);
            const newOrder = [
                {
                    address,
                    info: {
                        date: order.info.date,
                        number: order.info.number,
                        payment: order.info.payment,
                        status: true,
                    },
                    products: {
                        products: user.cart.products,
                        total
                    }
                }
            ];
            user.myOrders = newOrder;
        }
        else if (user.myOrders.length > 0 && !productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true);
            const total = (0, utils_1.somePrice)(user.cart.products, optionDeliverySelected[0]);
            const newOrder = [
                ...user.myOrders,
                {
                    address,
                    info: {
                        date: order.info.date,
                        number: order.info.number,
                        payment: order.info.payment,
                        status: true,
                    },
                    products: {
                        products: user.cart.products,
                        total
                    }
                }
            ];
            user.myOrders = newOrder;
        }
        else if (user.myOrders.length > 0 && productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return 'O numero de pedido já existe.';
        }
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { myOrders: user.myOrders, cart: { total: 0, products: [] } }, { new: true }).populate('myOrders.orders').exec();
        return updatedUser?.myOrders;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.createMyOrder = createMyOrder;
