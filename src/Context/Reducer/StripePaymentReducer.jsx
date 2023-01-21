import { CLEAR_STRIPE_CLIENT_SECRET_ID, STRIPE_CLIENT_SECRET_ID } from "../Actions/ActionType";

const initialState ={
    id:null
}

const StripePaymentReducer = (state=initialState,action)=>{
    switch (action.type) {
        case STRIPE_CLIENT_SECRET_ID:
            return {
                ...state, id:action.payload
            }
        case CLEAR_STRIPE_CLIENT_SECRET_ID:
            return {
                ...state ,id :null
            }
        default:
            return state ;
    }
}

export default StripePaymentReducer ;