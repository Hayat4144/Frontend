import { FETCHCATEGORY } from "./ActionType"

export const FETCHCATEGORYACTION = (payload) => {
    return {
        type: FETCHCATEGORY,
        data: payload
    }
}