import { somePrice } from "../../../utils";
import { MyOrdersSchema, User } from "../../models";

export const createMyOrder = async (userId: string, order: Pick<MyOrdersSchema, 'info'>) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec();

        if(!user){
            return 'Usuário não encontrado id'
        }

        if (user.cart.products.length === 0) {
            return 'O carrinho está vazio.'
        }

        const address = user.address.find(ads => ads.isSelected === true)

        if (!address) {
            return 'Endereço selecionado não encontrado.'
        }

        const productIsAlreadyOrder = user.myOrders.find((product) => product.info.number === order.info.number)
        if (user.myOrders.length === 0) { //*QUANDO O CARRINHO ESTÁ VAZIO (NULL)

            const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true)
            const total = somePrice(user.cart.products, optionDeliverySelected[0])

            const newOrder: MyOrdersSchema[] = [
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
        } else if (user.myOrders.length > 0 && !productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO

            const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true)
            const total = somePrice(user.cart.products, optionDeliverySelected[0])

            const newOrder: MyOrdersSchema[] = [
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
        } else if (user.myOrders.length > 0 && productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return 'O numero de pedido já existe.'
        }

        const optionDeliverySelected = user.deliveryOptions.find(opt => opt.selected === true)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { myOrders: user.myOrders, cart: { total: optionDeliverySelected?.price, products: [] } }, { new: true }).populate('myOrders.orders').exec();
        return updatedUser?.myOrders;

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
};