import { MyOrdersSchema, User } from "../../models";

export const createMyOrder = async (userId: string, order: Omit<MyOrdersSchema, 'products'>) => {

    try {
        const user = await User.findOne({ uuid: userId }).exec();

        if(!user){
            return new Error('Usuário não encontrado id: ' + userId);
        }

        if (user.cart.products.length === 0) {
            return new Error('O carrinho está vazio.');
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
                    products: user.cart.products,
                    status: true,
                }
            ];
            user.myOrders = newOrder;
        } else if (user.myOrders.length > 0 && !productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newCart: MyOrdersSchema[] = [
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
                    products: user.cart.products,
                    status: true,
                }
            ];
            user.myOrders = newCart;
        } else if (user.myOrders.length > 0 && productIsAlreadyOrder) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return new Error('O numero de pedido já existe.');
        }

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { myOrders: user.myOrders, cart: {products: []} }, { new: true }).populate('myOrders.orders').exec();
        return updatedUser?.myOrders;

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
};