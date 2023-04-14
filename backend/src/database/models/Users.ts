import { Schema, model } from "mongoose";
import { NewUser } from "../../types";
import { UserAddressSchema, userAddressSchema } from "./Address";
import { CartSchema, MyOrdersSchema, cartSchema, favoritesSchema, myOrders } from "./Products";

export interface UserSchema extends NewUser {
    address: UserAddressSchema | null,
    favorites: CartSchema | null,
    cart: CartSchema | null,
    myOrders: MyOrdersSchema | null,
}

const userSchema = new Schema<UserSchema>({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    cpf: { type: String, required: true },
    address: userAddressSchema,
    favorites: favoritesSchema,
    cart: cartSchema,
    myOrders: myOrders,
});

export const User = model<UserSchema>('User', userSchema);