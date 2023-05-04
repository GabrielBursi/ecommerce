"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const services_1 = require("../../../shared/services");
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const create = async (user) => {
    try {
        const hashedPassword = await services_1.PasswordCrypto.hashPassword(user.password);
        const email = await models_1.User.findOne({ email: user.email }).exec();
        if (email) {
            return 'Esse e-mail já existe';
        }
        const deliveryOptions = [
            {
                name: "Entrega Padrão",
                rating: 4.5,
                price: 14.59,
                days: 7,
                selected: true
            },
            {
                name: "Entrega Expressa",
                rating: 4.9,
                price: 22.99,
                days: 3,
                selected: false
            },
            {
                name: "Entrega Prioritária",
                rating: 4.8,
                price: 30.15,
                days: 1,
                selected: false
            },
            {
                name: "Entrega Econômica",
                rating: 4.2,
                price: 11.99,
                days: 14,
                selected: false
            }
        ];
        const newUser = new models_1.User({
            ...user,
            uuid: (0, uuid_1.v4)(),
            password: hashedPassword,
            confirmPassword: hashedPassword,
            deliveryOptions
        });
        await newUser.save();
        return newUser;
    }
    catch (error) {
        return new Error('Erro ao criar registro: ' + error);
    }
};
exports.create = create;
