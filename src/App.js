import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";

import "antd/dist/antd.css";
import "./App.css";
import Routers from "./config/routers/Routers";
import { persistor, store } from "../src/store/index";
import Header from "../src/component/header/Header";
import Footer from "../src/component/footer/Footer";
import ThemeProvider from "./theme";
import { ChartStyle } from "./components/chart";
import { ProgressBarStyle } from "./components/ProgressBar";
import ThemeColorPresets from "./components/ThemeColorPresets";
import ThemeLocalization from "./components/ThemeLocalization";
import RtlLayout from "./components/RtlLayout";

// components
function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
            
              {auth.authenticate && <Header />}
              <ProgressBarStyle />
              <ChartStyle />
              <Routers />
              {auth.authenticate && <Footer />}
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>
    </>
  );
}

export default App;
