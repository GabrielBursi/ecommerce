"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = void 0;
const models_1 = require("../../models");
const edit = async (userId, cep, newAddressInfo) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado';
        }
        const selectedAddress = user.address.find(address => address.cep === cep);
        if (!selectedAddress) {
            return 'Usuário não possui esse CEP cadastrado';
        }
        const editedSelectedAddress = {
            ...selectedAddress,
            ...newAddressInfo
        };
        const newArrayAddress = user.address.map(ads => {
            if (ads.cep !== cep) {
                return { ...ads };
            }
            return { ...editedSelectedAddress };
        });
        const addressUpdated = await models_1.User.findOneAndUpdate({ uuid: userId }, { address: newArrayAddress }, { new: true }).exec();
        return addressUpdated?.address;
    }
    catch (error) {
        return new Error('Erro ao consultar o endereço');
    }
};
exports.edit = edit;
