import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage"
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import authReducer from "./reducers/auth.reducer";
import DrawerReducer from "./reducers/DrawerReducer";


const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies, {}),
//   storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    DrawerReducer: DrawerReducer
})

export default persistReducer(persistConfig, rootReducer)
