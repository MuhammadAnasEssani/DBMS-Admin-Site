import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import ChangePassword from "../../component/changePassword/ChangePassword";
import IntroCard from "../../component/introCard/IntroCard";

export default function MyProfile() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const [changePassword, setChangePassword] = useState(false);

  const model = {
    name: "Doe",
    type: "Essay",
    topic: "Artificial",
    level: "Masters",
    pages: "10",
    deadline: "12/3/2021",
    status: "Not Assign",
    price: "23$",
  };
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-person-square"}
            title={"My Profile"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Info"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4" style={{ marginLeft: 10 }}>
                Personal Information
              </h1>
              <div className="row">
                <div className="col-lg-5 formSection">
                  <div
                    className="col-lg-12 align-items-center align-self-center offset-xl-1 mb-2"
                    style={{ display: "flex" }}
                  >
                    <img src="assets/img/user.jpg" className="DashboardImage" style={{borderColor:"#fff"}} />
                    <div className="justify-content-center align-content-center align-self-center">
                      <h1 style={{ fontSize: 24, marginTop: 15 }}>
                        Mr. {authState.name}
                      </h1>{" "}
                      <p>{authState.role}</p>
                    </div>
                  </div>
                  <table className="table table-borderless offset-xl-1">
                    <tbody>
                      <tr>
                        <th>Name :</th>
                        <td>{model.name}</td>
                      </tr>
                      <tr>
                        <th>Email: </th>
                        <td>{model.type}</td>
                      </tr>
                      <tr>
                        <th>Phone :</th>
                        <td>{model.topic}</td>
                      </tr>
                      <tr>
                        <th>Academic Level :</th>
                        <td>{model.level}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="col-lg-10 offset-xl-1"
                    style={{ display: "grid" }}
                  >
                    <Link
                      to={`edit-profile`}
                      className="btn btn-get-started"
                      style={{ padding: "25px 20px" }}
                    >
                      Edit Profile
                    </Link>

                    <Link
                      onClick={()=> setChangePassword(true)}
                      className="btn btn-get-started"
                      style={{ padding: "25px 20px" }}
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5 offset-xl-1">
                    {changePassword ? 
                    <ChangePassword onclick={()=>setChangePassword(false)}/>  : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
