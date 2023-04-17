import { Schema, model } from "mongoose";
import { IProducts, NewAddress } from "../../types";
import { addressSchema } from "./Address";
export interface CartSchema {
    userId: string;
    products: IProducts[] | [];
}

export interface MyOrdersSchema {
    products: IProducts[];
    number: string,
    status: boolean,
    date: string,
    payment: string,
    address: NewAddress
}

const productsSchema = new Schema<IProducts>({
    uuid: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, required: true },
    quant: { type: Number, required: false, default: 0 },
})

export const favoritesSchema = new Schema({
    products: {type: [productsSchema], required: true},
});

export const cartSchema = new Schema({
    products: {type: [productsSchema], required: true},
});

export const myOrders = new Schema({
    products: {type: [productsSchema], required: true},
    number: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
    date: { type: String, required: false, default: new Date().toLocaleString().split(',')[0] },
    payment: { type: String, required: true },
    address: {type: addressSchema, required: true}
});

export const Products = model<IProducts>('Products', productsSchema)
export const FavoritesProducts = model<CartSchema>('FavoritesProducts', favoritesSchema)
export const ProductsInCart = model<CartSchema>('ProductsInCart', cartSchema)
export const MyOrders = model<MyOrdersSchema>('MyOrders', myOrders)