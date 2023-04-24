import * as createAddress from './CreateNewAddress'
import * as selectAddress from './SelectAddress'
import * as editAddress from './EditAddress'

export const AddressController = {
    ...createAddress,
    ...selectAddress,
    ...editAddress
}