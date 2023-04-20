import { MyOrdersSchema, User } from "../../models";

export const createMyOrder = async (userId: string, order: Omit<MyOrdersSchema, 'products'>) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec();

        if(!user){
            return 'Usuário não encontrado id'
        }

        if (user.cart.length === 0) {
            return 'O carrinho está vazio.'
        }

        const productIsAlreadyOrder = user.myOrders.find((product) => product.number === order.number)
        if (user.myOrders.length === 0) { //*QUANDO O CARRINHO ESTÁ VAZIO (NULL)
            const newOrder: MyOrdersSchema[] = [
                {
                    address: {
                        cep: order.address.cep,
                        identification: order.address.identification,
                        neighborhood: order.address.neighborhood,
                        number: order.address.number,
                        street: order.address.street,
                        city: order.address.city,
                        complement: order.address.complement,
                        isSelected: false,
                        ref: order.address.ref,
                        state: order.address.state,
                    },
                    date: order.date,
                    number: order.number,
                    payment: order.payment,
                    products: user.cart,
                    status: true,
                }
            ];
            user.myOrders = newOrder;
        } else if (user.myOrders.length > 0 && !productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newOrder: MyOrdersSchema[] = [
                ...user.myOrders,
                {
                    address: {
                        cep: order.address.cep,
                        identification: order.address.identification,
                        neighborhood: order.address.neighborhood,
                        number: order.address.number,
                        street: order.address.street,
                        city: order.address.city,
                        isSelected: false,
                        ref: order.address.ref,
                        state: order.address.state,
                    },
                    date: order.date,
                    number: order.number,
                    payment: order.payment,
                    products: user.cart,
                    status: true,
                }
            ];
            user.myOrders = newOrder;
        } else if (user.myOrders.length > 0 && productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return 'O numero de pedido já existe.'
        }

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { myOrders: user.myOrders, cart: [] }, { new: true }).populate('myOrders.orders').exec();
        return updatedUser?.myOrders;

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
};