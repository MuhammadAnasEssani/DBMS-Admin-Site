import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

// imports
import routes from "./index";

function setTitle(path, routeArray) {
  var pageTitle;
  for (var i = 0; i < routeArray.length; i++) {
    if (routeArray[i].path === path) {
      pageTitle = "Papers Mates | " + routeArray[i].title;
    }
  }
  document.title = pageTitle ? pageTitle : "Papers Mates";
}

const RenderRoute = (route) => {
  const state = useSelector((state) => state);
  //   const authState = state.authReducer.user;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  setTitle(route.path, routes);

  //   if (route.isLoginRequired) {
  //     return (
  //     //   <ProtectedRoute
  //     //     path={route.path}
  //     //     exact={route.exact}
  //     //     component={route.component}
  //     //   ></ProtectedRoute>
  //     );
  //   }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
    ></Route>
  );
};

export default function Routers() {
  const history = useHistory();

  useEffect(() => {
    setTitle(history.location.pathname, routes);
  }, []);

  return (
    <>
      <Switch>
        {routes.map((route, index) => {
          return <RenderRoute {...route} key={index} />;
        })}
      </Switch>
    </>
  );
}
