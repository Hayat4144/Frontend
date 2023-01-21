import { CLEAR_STRIPE_CLIENT_SECRET_ID, STRIPE_CLIENT_SECRET_ID } from "./ActionType"

export const Stripe_PaymentId_Action = (payload) => {
    return {
        type: STRIPE_CLIENT_SECRET_ID,
        payload
    }
}

export const Clear_Stripe_PayementId_Action = ()=>{
    return {
        type:CLEAR_STRIPE_CLIENT_SECRET_ID
    }
}