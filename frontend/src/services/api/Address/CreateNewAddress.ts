import { MyApi } from "../../config"

export const create = async () => {
    try {
        const { data } = await MyApi.post('/address/new')
    } catch (error) {
        return new Error('Não foi possível se conectar com a API: ' + error)
    }
}