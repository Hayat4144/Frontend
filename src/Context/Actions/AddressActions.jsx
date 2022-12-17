import { CREATEADDRESS } from "./ActionType"
export const AddressAction = (payload) => {
    return {
        type: CREATEADDRESS,
        payload
    }
}