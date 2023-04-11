import { Schema, Types, model } from "mongoose";
import { IProducts } from "../../types";

const productsSchema = new Schema<IProducts>({
    id: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
})

const favoritesSchema = new Schema({
    userId: Types.ObjectId,
    productId: Types.ObjectId,
});

const productInCartSchema = new Schema({
    productId: Types.ObjectId,
    quant: Number,
});

const cartSchema = new Schema({
    userId: Types.ObjectId,
    products: [productInCartSchema],
});

export const Products = model<IProducts>('Products', productsSchema)
export const FavoritesProducts = model<IProducts>('FavoritesProducts', favoritesSchema)
export const ProductsInCart = model<IProducts>('ProductsInCart', cartSchema)