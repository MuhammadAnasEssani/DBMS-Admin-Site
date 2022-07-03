import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

import AdminDashboard from "./AdminDashboard";
import WriterDashboard from "./WriterDashboard";

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
  }, [auth.authenticate]);
  return (
    <>
    {/* <StudentDashboard /> */}
    {/* <StaffDashboard /> */}
    {/* <AdminDashboard /> */}
    {/* <WriterDashboard /> */}
      {auth.user.role == 20 ? (
        <WriterDashboard />
      ) : auth.user.role == 30 ? (
        <AdminDashboard />
      ) : null }
    </>
  );
}
