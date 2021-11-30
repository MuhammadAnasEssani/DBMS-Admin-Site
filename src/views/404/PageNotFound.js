import React from "react";
import { useSelector } from "react-redux";

export default function PageNotFound() {
  const state = useSelector((state) => state);
  const drawerState = state.DrawerReducer.State;
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div
          className={
            drawerState.Drawer
              ? "row dashboardSections offset-xl-2"
              : "row sectionShadow offset-xl-1"
          }
        >
          <div className="col-lg-12 align-items-center justify-content-center align-self-center">
            <center>
              <img
                src="assets/img/404.png"
                style={{ height: 500, padding: "50px 0px" }}
                className="img-fluid"
              />
            </center>
          </div>
        </div>
      </div>
    </section>
  );
}
