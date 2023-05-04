"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const models_1 = require("../../models");
const create = async (userId, address) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado';
        }
        const alreadyInAddress = user.address.find(ads => ads.cep === address.cep);
        if (alreadyInAddress) {
            return 'Já existe endereço com esse CEP';
        }
        const newAddress = {
            ...address, isSelected: true
        };
        user.address.push(newAddress);
        const addressSelected = user.address.map(ads => {
            if (ads.cep !== address.cep) {
                return { ...ads, isSelected: false };
            }
            return newAddress;
        });
        const addressUpdated = await models_1.User.findOneAndUpdate({ uuid: userId }, { address: addressSelected }, { new: true }).exec();
        if (!addressUpdated) {
            return 'Usuário não encontrado';
        }
        return addressUpdated.address;
    }
    catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
exports.create = create;
