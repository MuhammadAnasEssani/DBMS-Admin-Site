import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IntroCard(props) {
  const { model, editURl, changeURL, onclick } = props;
  const auth = useSelector((state) => state.auth);
  return (
    <div className="col-lg-12 dashboardSections itempadding">
      <div
        className="col-lg-12 align-items-center align-self-center"
        style={{ display: "flex" }}
      >
        <img src="assets/img/user.jpg" className="DashboardImage" />
        <div className="justify-content-center align-content-center align-self-center">
          <h1 style={{ fontSize: 24, marginTop: 10 }}>Mr. {auth.user.fullName}</h1>{" "}
          <p>{auth.user.role}</p>
        </div>
      </div>
      <div className="col-lg-12 mt-4 " style={{ padding: 10 }}>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th>Email:</th>
              <td>{auth.user.email}</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>03353507699</td>
            </tr>
            {/* {authState.academiclevel != null ? (
              <>
                <tr>
                  <th>Academic level :</th>
                  <td>{authState.academiclevel}</td>
                </tr>
                <tr>
                  <th>Specialization :</th>
                  <td>{authState.academiclevel}</td>
                </tr>
              </>
            ) : null} */}
          </tbody>
        </table>
      </div>
      <div className="col-lg-12" style={{ display: "grid" }}>
        <Link
          to={editURl}
          className="btn btn-get-started"
          
        >
          View Profile
        </Link>
        <Link
          to={changeURL}
          onClick={onclick}
          className="btn btn-get-started"
         
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
