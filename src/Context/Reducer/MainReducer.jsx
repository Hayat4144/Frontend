import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import SigninReducer from "./SigninReducer";
import address_reducer from "./UserAddressReducer";
import CategoryReducer from "./CategoryReducer";
import UserReducer from "./UserReducer";



const MainReducer = combineReducers({
    Signin: SigninReducer,
    Address: address_reducer,
    Category: CategoryReducer,
    User: UserReducer

})

const persistConfig = {
    key: 'Ecommerce',
    storage,
};


const PersistReducer = persistReducer(persistConfig, MainReducer);
export default PersistReducer;