import { USERINFO } from "./ActionType"

export const UserInfoAction = (payload) => {
    return {
        type: USERINFO,
        data: payload
    }
}