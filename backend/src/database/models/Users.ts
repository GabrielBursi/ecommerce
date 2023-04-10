import { Schema, model } from "mongoose";
import { NewUser } from "../../types";

const userSchema = new Schema<NewUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    cpf: { type: String, required: true },
});

export const User = model<NewUser>('User', userSchema);