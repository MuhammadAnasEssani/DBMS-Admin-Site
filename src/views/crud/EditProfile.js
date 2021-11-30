import React from "react";
import { useSelector } from "react-redux";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import AdminForm from "../../component/forms/AdminForm";
import StudentForm from '../../component/forms/StudentForm';
import WriterForm from '../../component/forms/WriterForm';
import {updateProfile} from '../../config/api/UserAuthAPI'
import Notification from '../../component/notification/Notification'

export default function EditProfile() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const role  = authState.role;

  const handleEditProfile = async (values) => {
    try {
      var res = await updateProfile(authState.token , values)
      if(res.Message != "Success"){
        Notification("Alert", res.Message , "Error")
        return;
      }
      Notification("Success", res.Message , "Success")
    } catch (error) {
      console.log(error)
    }
    console.log(values);
  };
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-person-square"}
            title={"Profile"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Edit"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Personal Information</h1>
              <StudentForm onFinish={handleEditProfile} />
              {/* {role.toLowerCase() == "student" ? (
                <StudentForm onFinish={handleEditProfile} />
               
              ) : role.toLowerCase() == "writer" ? (
                <WriterForm onFinish={handleEditProfile}/>
              ) : (
                <AdminForm onFinish={handleEditProfile} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
