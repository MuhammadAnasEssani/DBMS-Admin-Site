import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../../config/api/UserAuthAPI";

import Notification from "../../component/notification/Notification";
import { authConstants } from "../../store/actions/contants";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
        const { token, user } = res.data;
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
    // <section style={{ padding: "0px" }}>
    //   <div class="container-fluid">
    //     <div class="row">
    //       <div class="col-xl-5">
    //         <img
    //           class="bg-img-cover bg-center"
    //           src="../assets/images/login/3.jpg"
    //           alt="looginpage"
    //         />
    //       </div>
    //       <div class="col-xl-7 p-0">
    //         <div class="login-card">
    //           <form class="theme-form login-form" onSubmit={handleSignin}>
    //             <h4>Login</h4>
    //             <h6>Welcome back! Log in to your account.</h6>
    //             <div class="form-group">
    //               <label>Email Address</label>
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-email"></i>
    //                 </span>
    //                 <input
    //                   class="form-control"
    //                   type="email"
    //                   required=""
    //                   placeholder="Test@gmail.com"
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                 />
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <label>Password</label>
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-lock"></i>
    //                 </span>
    //                 <input
    //                   class="form-control"
    //                   type="password"
    //                   name="login[password]"
    //                   required=""
    //                   placeholder="*********"
    //                   value={password}
    //                  onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                 <div class="show-hide">
    //                   <span class="show"> </span>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <div class="checkbox">
    //                 <input id="checkbox1" type="checkbox" />
    //                 <label class="text-muted" for="checkbox1">
    //                   Remember password
    //                 </label>
    //               </div>
    //               <a class="link" href="forget-password.html">
    //                 Forgot password?
    //               </a>
    //             </div>
    //             <div class="form-group">
    //               {loading ? (
    //                 <button class="btn btn-primary btn-block">
    //                   <>
    //                     <Spin indicator={antIcon} />
    //                   </>
    //                 </button>
    //               ) : (
    //                 <button class="btn btn-primary btn-block" type="submit">
    //                   Sign in
    //                 </button>
    //               )}
    //             </div>
    //             <div class="login-social-title">
    //               <h5>Sign in with</h5>
    //             </div>
    //             <div class="form-group">
    //               <ul class="login-social">
    //                 <li>
    //                   <a href="https://www.linkedin.com/login" target="_blank">
    //                     <i data-feather="linkedin"></i>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="https://twitter.com/" target="_blank">
    //                     <i data-feather="twitter"></i>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="https://www.facebook.com/" target="_blank">
    //                     <i data-feather="facebook"></i>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="https://www.instagram.com/login" target="_blank">
    //                     <i data-feather="instagram"> </i>
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //             <p>
    //               Don't have account?
    //               <Link class="ms-2" to="/sign-up">
    //                 Create Account
    //               </Link>
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section id="signin" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row sectionShadow">
          <div className="col-lg-6 offset-xl-1 align-items-center justify-content-center align-self-center">
            <img src="assets/img/login.png" className="img-fluid" />
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
