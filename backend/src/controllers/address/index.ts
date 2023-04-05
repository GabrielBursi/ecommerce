import * as createAddress from './CreateNewAddress'
import * as selectAddress from './SelectAddress'

export const AddressController = {
    ...createAddress,
    ...selectAddress,
}