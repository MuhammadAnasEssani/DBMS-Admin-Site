import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {userSignin} from "../../config/api/UserAuthAPI";

import Notification from "../../component/notification/Notification";
import {authConstants} from "../../store/actions/contants";
import {LoadingOutlined} from "@ant-design/icons";

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const users = {
        email,
        password,
      };
      const res = await userSignin(users);
      // console.log(res)
      if (res.status === 200) {
        const { token, user } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCESS,
          payload: {
            token,
            user,
          },
        });
        Notification("Login", res.data.message, "Success");
        setLoading(false);
        setEmail("");
        setPassword("");
        history.push("/dashboard");
        return;
      } else {
        Notification("Login", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch {
      setLoading(false);
      Notification("Login", "Something went wrong", "Error");
    }
  };

  useEffect(() => {
    // if (auth.authenticate) {
    //   return <Redirect to={"/"} />;
    // }
    if (auth.authenticate) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    <section id="signin" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row sectionShadow">
          <div className="col-lg-6 offset-xl-1 align-items-center justify-content-center align-self-center">
            <img src="assets/img/sign-in-dashboard.png" className="img-fluid" />
          </div>
          <div className="col-lg-4 formSection">
            <h1 style={{ fontSize: 28 }}>Login!</h1>
            <p className="mb-4 mt-2" style={{ fontSize: 16 }}>
              Log in to continue
            </p>
            <div className="col-lg-12">
              <form onSubmit={handleSignin}>
                <div className="col-lg-12">
                  <div className="col-lg-12">
                    <label className="labeltext">Email (*)</label>
                    <input
                    required
                      placeholder="john@yahoo.com"
                      className="FormInput"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12">
                    <label className="labeltext">Password (*)</label>

                    <input
                    required
                      placeholder="*********"
                      className="FormInput"
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 text-end">
                    <Link
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
                    {loading ? <button
                      style={{ border: "none" }}
                      // type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <>
                      <Spin indicator={antIcon} />
                    </>
                    </button> : <button
                      style={{ border: "none" }}
                      type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Sign in</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>}
                  </div>
                  <div className="col-lg-12">
                    <p className="mt-5 text-center">
                      New to website?{" "}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
