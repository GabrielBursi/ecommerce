import { Schema, model } from "mongoose";
import { IDepartment } from "../../types";

const departmentsSchema = new Schema<IDepartment>({
    uuid: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    to: { type: String, required: true }
})

export const Departments = model<IDepartment>('departments', departmentsSchema)