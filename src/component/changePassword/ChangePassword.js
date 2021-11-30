import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, message } from "antd";
import { useSelector } from "react-redux";

import Notification from '../../component/notification/Notification'
import {changePassword} from '../../config/api/UserAuthAPI'

export default function ChangePassword(props) {
  const { onclick } = props;
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;


  const handlePassword = async (values) => {
    try {
      var res = await changePassword(authState.token , values);
      if(res.Message != " Success"){
        Notification(
          "Alert",
         res.Message,
          "Error"
        );
        return;
      }
      Notification(
        "Success",
       res.Message,
        "Success"
      );
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="col-lg-12 dashboardSections itempadding">
      <div
        className="col-lg-12 align-items-center align-self-center"
        style={{ display: "flex" }}
      >
        <h1>Change Password</h1>
      </div>
      <div className="col-lg-12 mt-4 " style={{ padding: 10 }}>
        <Form onFinish={handlePassword} initialValues={""}>
          <Form.Item
            name="oldpassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input
              type="password"
              className="FormInput"
              placeholder="Old Password"
              style={{ width: "100%", height: 35 }}
            />
          </Form.Item>

          <Form.Item
            name="newpassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <input
              type="password"
              className="FormInput"
              placeholder="New Password"
              style={{ width: "100%", height: 35 }}
            />
          </Form.Item>

          <Form.Item
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <input
              type="password"
              className="FormInput"
              placeholder="Confirm Password"
              style={{ width: "100%", height: 35 }}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "grid" }}>
              <button
                type="submit"
                className="btn btn-get-started"
                style={{ marginTop: 7 }}
              >
                Submit
              </button>
              <Link
                className="btn btn-get-started"
                style={{ marginTop: 8 }}
                onClick={onclick}
              >
                Back
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
