import { Schema, Types, model } from "mongoose";
import { IProducts, NewAddress } from "../../types";
import { addressSchema } from "./Address";
export interface CartSchema {
    userId: string;
    products: IProducts[];
}

export interface MyOrdersSchema {
    userId: string;
    products: IProducts[];
    number: string,
    status: boolean,
    date: string,
    payment: string,
    address: NewAddress | undefined
}

const productsSchema = new Schema<IProducts>({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, required: true },
    quant: { type: Number, required: false, default: 0 },
})

const favoritesSchema = new Schema({
    userId: Types.ObjectId,
    products: [productsSchema],
});

const cartSchema = new Schema({
    userId: Types.ObjectId,
    products: [productsSchema],
});

const myOrders = new Schema({
    userId: Types.ObjectId,
    products: [productsSchema],
    number: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
    date: { type: String, required: true },
    payment: { type: String, required: true },
    address: addressSchema
});

export const Products = model<IProducts>('Products', productsSchema)
export const FavoritesProducts = model<CartSchema>('FavoritesProducts', favoritesSchema)
export const ProductsInCart = model<CartSchema>('ProductsInCart', cartSchema)
export const MyOrders = model<MyOrdersSchema>('MyOrders', myOrders)