import { FETCHCATEGORY } from "../Actions/ActionType";

const initailstate = {
    data: []
}

const CategoryReducer = (state = initailstate, action) => {
    switch (action.type) {
        case FETCHCATEGORY:
            return {
                ...state, data: action.payload
            }
        default:
            return state;
    }
}

export default CategoryReducer;