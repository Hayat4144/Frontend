import { USERINFO } from "../Actions/ActionType";

const initialState = {
    user_data: []
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERINFO:
            return {
                ...state, user_data: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;