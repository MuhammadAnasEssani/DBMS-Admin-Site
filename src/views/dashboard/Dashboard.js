import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import WriterDashboard from "./WriterDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;

  const history = useHistory();

  // useEffect(() => {
  //   if (authState.token == null) {
  //     history.push("/");
  //   }
  // }, []);
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
