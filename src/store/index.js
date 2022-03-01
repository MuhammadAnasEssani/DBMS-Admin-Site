import { applyMiddleware, createStore } from "redux";
// import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistCombineReducers } from "redux-persist";
// import { CookieStorage } from "redux-persist-cookie-storage";
// import Cookies from "cookies-js";
import thunk from "redux-thunk";
import RootReducers from "./RootReducers";

// const persistConfig = {
//   key: "root",
//   storage: new CookieStorage(Cookies, {}),
//   whitelist: ['cart']
// };

// const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = createStore( RootReducers, composeWithDevTools(
    applyMiddleware(thunk)
));
const persistor = persistStore(store)
// const store = createStore(
//   persistedReducer,
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const persistor = persistStore(store, {});

export { store, persistor };
