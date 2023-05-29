import { REMOVE_USERINFO, USERINFO } from "../Actions/ActionType";

const initialState = {
    user_data: []
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERINFO:
            return {
                ...state, user_data: action.payload
            }
        case REMOVE_USERINFO:
            return {
                ...state, user_data:[]
            }
        default:
            return state;
    }
}

export default UserReducer;