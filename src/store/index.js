import { createStore} from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import RootReducer from "./RootReducers";

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies, {}),
};

const persistedReducer = persistCombineReducers(persistConfig, RootReducer);

const store = createStore(
  persistedReducer,
//   applyMiddleware(thunkMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store, {});

export { store, persistor };
