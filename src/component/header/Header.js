import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../../component/notification/Notification";
import { Drawer } from "antd";


import $ from "jquery";

// imports
import AdminNav from "../menus/AdminNav";
import StaffNav from "../menus/StaffNav";
import WriterNav from "../menus/WriterNav";
import StudentNav from "../menus/StudentNav";
import { setDrawerState, unSetDrawerState } from "../../store/actions/DrawerState";
import { authConstants } from "../../store/actions/contants";

export default function Header() {
  var title = "Admin";
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(true);

  const removeStyle = () => {
    setTimeout(() => {
      $(".body").removeAttr("Style");
    });
  };
  const showDrawer = () => {
    setVisible(true);
    dispatch(setDrawerState())
    removeStyle();
  };
  const onClose = () => {
    setVisible(false);
    dispatch(unSetDrawerState())
    removeStyle();
  };
  const handleLogout = () => {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      Notification("Logout", "Logout Successfully", "Success");
    // dispatch(unSetUser());
    // history.push("/");
  };

  useEffect(() => {
    $(".nav-link").click(function () {
      $(".bi-x").click();
    });
    removeStyle();
  }, [removeStyle()]);

  return (
    <>
      {/* {authState.token != null ? ( */}
        <header id="header" className="header fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <i className="bi bi-list drawerbtn" onClick={showDrawer}></i>
              <span>Papersmates</span>
            </div>

            <Drawer
              title={`Welcome ${auth.user.fullName}`}
              placement="left"
              closable={true}
              onClose={onClose}
              visible={visible}
              footer={"Multivendor.com"}
            >
              {/* <StudentNav /> */}
              <WriterNav />
              {/* <StaffNav /> */}
              {/* <AdminNav /> */}
              {/* {authState.role == "Administration" ? (
                <AdminNav />
              ) : authState.role == "Staff" ? (
                <StaffNav />
              ) : authState.role == "Writer" ? (
                <WriterNav />
              ) : (
                <StudentNav />
              )} */}
            </Drawer>

            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link to="/my-profile" className="nav-link" style={{ display: "inline" }}>
                    <span
                      className="bi bi-person"
                      style={{ fontSize: 18, marginRight: 5 }}
                    ></span>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link"
                    style={{ display: "inline" }}
                    onClick={handleLogout}
                  >
                    <span
                      className="bi bi-power"
                      style={{ fontSize: 18, marginRight: 5 }}
                    ></span>
                    Logout
                  </Link>
                </li>
              </ul>
              <i
                className="bi bi-power mobile-nav-toggle"
                onClick={handleLogout}
              ></i>
            </nav>
          </div>
        </header>
      {/* ) : null} */}
    </>
  );
}
