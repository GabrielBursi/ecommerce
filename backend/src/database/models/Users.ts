import { Schema, model } from "mongoose";
import { NewUser } from "../../types";
import { UserAddressSchema } from "./Address";
import { CartSchema, MyOrdersSchema } from "./Products";

export interface UserSchema extends NewUser {
    address: UserAddressSchema,
    favorites: CartSchema,
    cart: CartSchema,
    myOrders: MyOrdersSchema[],
}

const userSchema = new Schema<UserSchema>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    cpf: { type: String, required: true },
    address: { type: Schema.Types.Mixed, default: {address: []} },
    favorites: { type: Schema.Types.Mixed, default: {products: []} },
    cart: { type: Schema.Types.Mixed, default: {products: []} },
    myOrders: { type: Schema.Types.Mixed, default: {orders: []} },
});

export const User = model<UserSchema>('User', userSchema);