import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import 'antd/dist/antd.css';
import "./App.css";
import Routers from "./config/routers/Routers";
import { persistor, store } from "../src/store/index";
import Header from "../src/component/header/Header";
import Footer from "../src/component/footer/Footer";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Routers />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
