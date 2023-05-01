import { Schema, model } from "mongoose";
import { IProducts, NewAddress } from "../../types";

export interface MyOrdersSchema {
    products: IProducts[];
    total: number;
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
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    quant: { type: Number, required: false, default: 0 },
})

export const Products = model<IProducts>('Products', productsSchema)