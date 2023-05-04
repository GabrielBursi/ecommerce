"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = void 0;
const models_1 = require("../../models");
const select = async (userId, cep) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado';
        }
        const selectedAddress = user.address.find(address => address.cep === cep);
        if (!selectedAddress) {
            return 'Usuário não possui esse CEP cadastrado';
        }
        const newArrayAddress = user.address.map(ads => {
            if (ads.cep !== cep) {
                return { ...ads, isSelected: false };
            }
            return { ...selectedAddress, isSelected: true };
        });
        const addressUpdated = await models_1.User.findOneAndUpdate({ uuid: userId }, { address: newArrayAddress }, { new: true }).exec();
        return addressUpdated?.address;
    }
    catch (error) {
        return new Error('Erro ao consultar o endereço');
    }
};
exports.select = select;
