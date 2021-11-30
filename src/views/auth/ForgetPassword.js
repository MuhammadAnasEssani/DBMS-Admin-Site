import React,{useEffect} from "react";
import { Form } from "antd";
import { Link, useHistory } from "react-router-dom";
import {useSelector } from "react-redux";



export default function ForgetPassword() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const history = useHistory();

  const handleFPassword = (values) => {};
  useEffect(() => {
    if (authState.token != null) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    <section id="forgotpassword" className="hero d-flex align-items-center" style={{padding: "100px 0px 100px 0px "}}>
      <div className="container">
        <div className="row sectionShadow">
          <div className="col-lg-6 offset-xl-1 align-items-center justify-content-center align-self-center">
            <img src="assets/img/forgot_password.png" className="img-fluid" />
          </div>
          <div className="col-lg-4  formSection align-items-center justify-content-center align-self-center">
            <h1 style={{ fontSize: 28 }}>Forget Password!</h1>
            <p className="mb-4 mt-2" style={{ fontSize: 16 }}>
              Please enter your email
            </p>
            <div className="col-lg-12">
              <Form onFinish={handleFPassword} initialValues={""}>
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

                  <div className="col-lg-12 text-center">
                    <Form.Item>
                      <button
                        style={{ border: "none" }}
                        type="submit"
                        className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                      >
                        <span>Send</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </Form.Item>
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
