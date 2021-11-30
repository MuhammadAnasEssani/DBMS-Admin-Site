import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

import { userSignUp } from "../../config/api/UserAuthAPI";
import Notification from "../../component/notification/Notification";

export default function Signup() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const history = useHistory();

  const [isTerms, setisTerms] = useState(false);
  const { Option } = Select;

  const handleSignup = async (values) => {
    values.roleid = 2;
    try {
      var res = await userSignUp(values);
      if (res.Message != "success") {
        console.log(res.Message);
        Notification("Success", res.Message, "Success");
        return;
      }
      Notification(
        "Success",
        "Successfully Signup Kindly Check Your Email.!",
        "Success"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authState.token != null) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    <section
      id="signup"
      className="hero d-flex align-items-center"
      style={{ padding: "100px 0px" }}
    >
      <div className="container">
        <div className="row sectionShadow">
          <div className="col-lg-6 align-items-center justify-content-center align-self-center">
            <img src="assets/img/Sign_up.png" className="img-fluid" />
          </div>
          <div className="col-lg-4 offset-xl-1 formSection">
            <h1 style={{ fontSize: 28 }}>Join us!</h1>
            <p className="mb-2 mt-1" style={{ fontSize: 16 }}>
              Hundred thousands of students achieve goals
            </p>
            <div className="col-lg-12">
              <Form onFinish={handleSignup} initialValues={""}>
                <div className="col-lg-12">
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="FormInput"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="FormInput"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <input
                      type="number"
                      placeholder="Enter your phone"
                      className="FormInput"
                    />
                  </Form.Item>
                  <Form.Item name="role" className="mt-2">
                    <Select size={"large"} placeholder="Select a role">
                      <Option value="Student">Student</Option>
                      <Option value="Writer">Writer</Option>
                      <Option value="Staff">Staff</Option>
                    </Select>
                  </Form.Item>
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
                      placeholder="Enter your password"
                      className="FormInput"
                    />
                  </Form.Item>

                  <div
                    className="col-lg-12 justify-content-center"
                    style={{ display: "flex" }}
                  >
                    <input
                      name="termsConditions"
                      type="checkbox"
                      style={{ height: 18, width: 18 }}
                      onChange={(e) => setisTerms(e.target.checked)}
                    />
                    <label className="" style={{ marginLeft: 10 }}>
                      I have read and agree to the{" "}
                      <a
                        target="_blank"
                        href="https://papersmates.com/terms-conditions"
                        style={{ color: "#333", textDecoration: "underline" }}
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <div className="col-lg-12 text-center">
                    <Form.Item>
                      {isTerms ? (
                        <button
                          style={{ border: "none" }}
                          type="submit"
                          className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                        >
                          <span>Sign up</span>
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      ) : (
                        <button
                          style={{ border: "none" }}
                          disabled
                          className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                        >
                          <span>Sign up</span>
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 text-center">
                    <p className="mt-5">
                      Already have an account?{" "}
                      <Link
                        to="/"
                        className=""
                        style={{
                          color: "#333",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Signin Now
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
