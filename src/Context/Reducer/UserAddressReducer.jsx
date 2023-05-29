import { CREATEADDRESS, REMOVE_ADDRESS } from "../Actions/ActionType";

const initialstate = {
    user_address: []
}

const address_reducer = (state = initialstate, action) => {
    switch (action.type) {
        case CREATEADDRESS:
            return {
                ...state, user_address: action.payload
            }
        case REMOVE_ADDRESS:
            return {
                ...state, user_address: []
            }
        default:
            return state;
    }
}

export default address_reducer;