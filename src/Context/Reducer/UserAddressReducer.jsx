const initialstate = {
    user_address: []
}

const address_reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'CREATEADDRESS':
            return {
                ...state, user_address: action.payload
            }
        default:
            return state;
    }
}

export default address_reducer;