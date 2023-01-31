import { LOGOUT, SIGNIN } from "./ActionType"

export const SigninAction = () => {
    return {
        type: SIGNIN
    }
}

export const LogoutAction = ()=>{
    return {
        type:LOGOUT
    }
}