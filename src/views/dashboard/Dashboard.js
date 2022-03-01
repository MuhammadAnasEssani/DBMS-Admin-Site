import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import WriterDashboard from "./WriterDashboard";
import StudentDashboard from "./StudentDashboard";
import Header from "../../component/header/Header";
import Footer from "../../component/header/Header";
export default function Dashboard() {
  // const state = useSelector((state) => state);
  // const authState = state.AuthReducer.user;
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, []);
  return (
    <>
    {/* <StudentDashboard /> */}
    {/* <StaffDashboard /> */}
    {/* <AdminDashboard /> */}
    <WriterDashboard />
      {/* {authState.role === "Administration" ? (
        <AdminDashboard />
      ) : authState.role === "Staff" ? (
        <StaffDashboard />
      ) : authState.role === "Writer" ? (
        <WriterDashboard />
      ) : (
        <StudentDashboard />
      )} */}
    </>
  );
}
