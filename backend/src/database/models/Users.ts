import { Schema, model } from "mongoose";
import { IProducts, NewAddress, NewUser } from "../../types";
import { MyOrdersSchema } from "./Products";

export interface UserSchema extends NewUser {
    address: NewAddress[],
    favorites: IProducts[] | [],
    cart: IProducts[] | [],
    myOrders: MyOrdersSchema[],
}

const userSchema = new Schema<UserSchema>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    cpf: { type: String, required: true },
    address: { type: Schema.Types.Mixed, default: [] },
    favorites: { type: Schema.Types.Mixed, default: [] },
    cart: { type: Schema.Types.Mixed, default: [] },
    myOrders: { type: Schema.Types.Mixed, default: [] },
});

export const User = model<UserSchema>('User', userSchema);