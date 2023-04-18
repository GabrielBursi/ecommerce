import { Schema } from "mongoose";
import { NewAddress } from "../../types";

export interface UserAddressSchema{
    address: NewAddress[]
}

export const addressSchema = new Schema<NewAddress>({
    complement: { type: String, required: false },
    ref: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    number: { type: String, required: true },
    cep: { type: String, required: true },
    identification: { type: String, required: true },
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
});

export const userAddressSchema = new Schema({
    address: { type: addressSchema, required: true },
});