import { Schema, Types, model } from "mongoose";
import { AddressFormData } from "../../types";

const addressSchema = new Schema<AddressFormData>({
    complement: { type: String, required: false },
    ref: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    number: { type: String, required: true },
    cep: { type: String, required: true },
    identification: { type: String, required: true },
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
});

const userAddressSchema = new Schema({
    userId: Types.ObjectId,
    address: [addressSchema],
});

export const Address = model<AddressFormData>('Address', addressSchema);
export const UserAddress = model<AddressFormData>('UserAddress', userAddressSchema);