import { MyOrders, MyOrdersSchema, ProductsInCart } from "../../models";

export const createMyOrder = async (userId: string, order: MyOrdersSchema) => {

    try {
        const cart = await ProductsInCart.findOne({ userId }).exec();

        if(cart){
            const newOrder = new MyOrders({
                userId,
                products: order.products,
                address: order.address,
                date: order.date,
                number: order.number,
                payment: order.payment,
                status: order.status,
            })

            await newOrder.save();

            await ProductsInCart.updateOne({ userId }, { products: [] }).exec();

            return newOrder
        }

        return new Error('Esse usuario não possui carrinho. ' + userId)

    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
};