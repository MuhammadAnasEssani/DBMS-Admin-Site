import React from "react";
import {useSelector} from "react-redux";

import "antd/dist/antd.css";
import "./App.css";
import Routers from "./config/routers/Routers";
import Header from "../src/component/header/Header";
import Footer from "../src/component/footer/Footer";

// components
function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {/*<ThemeProvider>*/}
      {/*  <ThemeColorPresets>*/}
      {/*    <ThemeLocalization>*/}
      {/*      <RtlLayout>*/}
            
              {auth.authenticate && <Header />}
      {/*<ProgressBarStyle />*/}
      {/*<ChartStyle />*/}
              <Routers />
              {auth.authenticate && <Footer />}
      {/*      </RtlLayout>*/}
      {/*    </ThemeLocalization>*/}
      {/*  </ThemeColorPresets>*/}
      {/*</ThemeProvider>*/}
    </>
  );
}

export default App;
