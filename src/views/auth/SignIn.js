import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions/AuthAction";

import Notification from "../../component/notification/Notification";
import { userSigIn } from "../../config/api/UserAuthAPI";

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;

  const handleSignin = async (values) => {
    try {
      var res = await userSigIn(values);
      if (res.Message != "Success") {
        console.log(res.Message);
        Notification("Alert", res.Message, "Error");
        var userdetails = {
          token: "smkkldaj",
         
          role: "Administration",
          
        };
        dispatch(setUser(userdetails));
        return;
      }
      var resModel = res.Data.User;
      console.log(resModel);
      var userdetails = {
        token: res.Data.Token,
        userid: resModel.UserId,
        name: resModel.username,
        role: "Administration",
        email: resModel.userEmail,
        phone: resModel.UserPhone,
        academiclevel: resModel.AcademicLevel,
        image: `${resModel.UserImage}`,
      };
      dispatch(setUser(userdetails));
      history.push("/dashboard");
      Notification("Success", "Successfully Login", "Success");
    } catch (error) {
      console.log(error);
    }
    // if (values.email.toLowerCase() === "admin@app.com") {
    //   const userDetail = {
    //     name: "Admin",
    //     role: "Administration",
    //     email: values.email,
    //     token: values.password,
    //   };
    //   dispatch(setUser(userDetail));
    // } else if (values.email.toLowerCase() === "staff@app.com") {
    //   const userDetail = {
    //     name: "Staff",
    //     role: "Staff",
    //     email: values.email,
    //     token: values.password,
    //   };
    //   dispatch(setUser(userDetail));
    // } else if (values.email.toLowerCase() === "writer@app.com") {
    //   const userDetail = {
    //     name: "Writer",
    //     role: "Writer",
    //     email: values.email,
    //     token: values.password,
    //   };
    //   dispatch(setUser(userDetail));
    // } else {
    //   const userDetail = {
    //     name: "Student",
    //     role: "Student",
    //     email: values.email,
    //     token: values.password,
    //   };
    //   dispatch(setUser(userDetail));
    // }
  };

  useEffect(() => {
    if (authState.token != null) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    <section id="signin" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row sectionShadow">
          <div className="col-lg-6 offset-xl-1 align-items-center justify-content-center align-self-center">
            <img src="assets/img/login.png" className="img-fluid" />
          </div>
          <div className="col-lg-4 formSection">
            <h1 style={{ fontSize: 28 }}>Forgot Password!</h1>
            <p className="mb-4 mt-2" style={{ fontSize: 16 }}>
              Log in to continue
            </p>
            <div className="col-lg-12">
              <Form onFinish={handleSignin} initialValues={""}>
                <div className="col-lg-12">
                  <div className="col-lg-12">
                    <label className="labeltext">Email (*)</label>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Please input your Email!" },
                      ]}
                    >
                      <input
                        type="text"
                        placeholder="john@yahoo.com"
                        className="FormInput"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <label className="labeltext">Password (*)</label>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <input
                        type="password"
                        placeholder="*********"
                        className="FormInput"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 text-end">
                    <Link
                      to="/forgot-password"
                      className=""
                      style={{
                        textDecoration: "underline",
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                  <div className="col-lg-12 text-center">
                    <Form.Item>
                      <button
                        style={{ border: "none" }}
                        type="submit"
                        className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                      >
                        <span>Sign in</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <p className="mt-5 text-center">
                      New to Papersmates?{" "}
                      <Link
                        to="/sign-up"
                        className=""
                        style={{
                          color: "#333",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Signup Now
                      </Link>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
