import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

import { createVendor, userSignUp } from "../../config/api/UserAuthAPI";
import Notification from "../../component/notification/Notification";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import MDBFileupload from 'mdb-react-fileupload';

export default function Signup() {
  // const state = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isTerms, setisTerms] = useState(false);
  const { Option } = Select;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    var form = new FormData();
    form.append("firstName", fName);
    form.append("lastName", lName);
    form.append("email", email);
    form.append("password", password);
    form.append("cpassword", cPassword);
    form.append("description", description);
    form.append("address", address);
    form.append("shopName", shopName);
    form.append("contactNumber", contactNumber);
    form.append("userImage", profileImage);
    try {
      const res = await createVendor(form);
      // console.log(res);
      if (res.status === 201) {
        Notification("Create Vendor", res.data.message, "Success");
        setLoading(false);
        setfName("");
        setlName("");
        setEmail("");
        setDescription("");
        setAddress("");
        setShopName("");
        setContactNumber("");
        setPassword("");
        setcPassword("");
        setProfileImage("");
        setUserImage("")
        history.push("/");
        return;
      } else {
        Notification("Create Vendor", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch (err) {
      Notification("Create Vendor", "Something went wrong", "Error");
      setLoading(false);
      return;
    }
  };
  const handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setUserImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (auth.token != null) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    // <section style={{ padding: "0px" }}>
    //   <div class="container-fluid p-0">
    //     <div class="row m-0">
    //       <div class="col-xl-5">
    //         <img
    //           class="bg-img-cover bg-center"
    //           src="../assets/images/login/3.jpg"
    //           alt="looginpage"
    //         />
    //       </div>
    //       <div class="col-xl-7 p-0">
    //         <div class="login-card">
    //           <form class="theme-form login-form">
    //             <h4>Create your account</h4>
    //             <h6>Enter your personal details to create account</h6>
    //             <div className="form-group col-lg-9 col-12">
    //               <label>Your Name</label>
    //               <div className="small-group row">
    //                 <div class="input-group col-lg-6 col-12">
    //                   <span class="input-group-text">
    //                     <i class="icon-user"></i>
    //                   </span>
    //                   <input
    //                     class="form-control"
    //                     type="email"
    //                     required=""
    //                     placeholder="First Name"
    //                     value={fName}
    //                     onChange={(e) => setfName(e.target.value)}
    //                   />
    //                 </div>
    //                 <div class="input-group col-lg-6 col-12">
    //                   <span class="input-group-text">
    //                     <i class="icon-user"></i>
    //                   </span>
    //                   <input
    //                     class="form-control"
    //                     type="email"
    //                     required=""
    //                     placeholder="Last Name"
    //                     value={lName}
    //                     onChange={(e) => setlName(e.target.value)}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <label>User Details</label>
    //               <div class="small-group">
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
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-email"></i>
    //                 </span>
    //                 <input
    //                   class="form-control"
    //                   type="tel"
    //                   required=""
    //                   placeholder="Contact Number"
    //                   value={contactNumber}
    //                   onChange={(e) => setContactNumber(e.target.value)}
    //                 />
    //               </div>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <label>Shop Details</label>
    //               <div class="small-group">
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-email"></i>
    //                 </span>
    //                 <input
    //                   class="form-control"
    //                   type="text"
    //                   required=""
    //                   placeholder="Address"
    //                   value={address}
    //                   onChange={(e) => setAddress(e.target.value)}
    //                 />
    //               </div>
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-email"></i>
    //                 </span>
    //                 <input
    //                   class="form-control"
    //                   type="text"
    //                   required=""
    //                   placeholder="Shop Name"
    //                   value={shopName}
    //                   onChange={(e) => setShopName(e.target.value)}
    //                 />
    //               </div>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <label>Password</label>
    //               <div class="small-group">
    //                 <div class="input-group">
    //                   <span class="input-group-text">
    //                     <i class="icon-lock"></i>
    //                   </span>
    //                   <input
    //                     class="form-control"
    //                     type="password"
    //                     name="login[password]"
    //                     required=""
    //                     placeholder="*********"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                   />
    //                   <div class="show-hide">
    //                     <span class="show"> </span>
    //                   </div>
    //                 </div>
    //                 <div class="input-group">
    //                   <span class="input-group-text">
    //                     <i class="icon-lock"></i>
    //                   </span>
    //                   <input
    //                     class="form-control"
    //                     type="password"
    //                     name="login[password]"
    //                     required=""
    //                     placeholder="*********"
    //                     value={cPassword}
    //                     onChange={(e) => setcPassword(e.target.value)}
    //                   />
    //                   <div class="show-hide">
    //                     <span class="show"> </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <label>Description</label>
    //               <div class="input-group">
    //                 <span class="input-group-text">
    //                   <i class="icon-lock"></i>
    //                 </span>
    //                 <textarea
    //                   class="form-control"
    //                   type="text"
    //                   required=""
    //                   placeholder="Description"
    //                   value={cPassword}
    //                   onChange={(e) => setcPassword(e.target.value)}
    //                 />
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <div class="checkbox">
    //                 <input id="checkbox1" type="checkbox" />
    //                 <label class="text-muted" for="checkbox1">
    //                   Agree with <span>Privacy Policy </span>
    //                 </label>
    //               </div>
    //             </div>
    //             <div class="form-group">
    //               <button class="btn btn-primary btn-block" type="submit">
    //                 Create Account
    //               </button>
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
    //               Already have an account?
    //               <Link class="ms-2" to="/">
    //                 Sign in
    //               </Link>
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section
      id="signup"
      className="hero d-flex align-items-center"
      style={{ padding: "80px 0px 50px 0px" }}
    >
      <div className="container-fluid ">
        <div
          className="row"
          style={{ justifyContent: "center", margin: "0px 10px" }}
        >
          <h1
            className="category_header"
            style={{
              color: "#141313",
              fontSize: "34px",
              fontWeight: "700",
              color: "black",
              marginBottom: "21px",
              paddingLeft: "11px",
              maxWidth: "1040px",
            }}
          >
            Signup
          </h1>
          <div className="row sectionShadow" style={{ maxWidth: "1040px" }}>
            <form onSubmit={handleSignup}>
              <div className="row">
                <div className="col-lg-12">
                  <label
                    htmlFor="upload-button"
                    display="flex"
                    role="button"
                    tabindex="0"
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 bLhEoJ"
                    style={{ outline: "none", position: "relative" }}
                  >
                    {userImage != "" && (
                      <img
                        className="editImage"
                        src={userImage}
                        alt=""
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                    <h5
                      font-weight="600"
                      font-size="16px"
                      color="text.muted"
                      class="Typography-sc-1nbqu5-0 hCoDOS"
                    >
                      Shop image here
                    </h5>
                    <div
                      width="200px"
                      class="Divider-sc-119puxu-0 cLMkXD"
                    ></div>
                    <div
                      color="text.muted"
                      class="Typography-sc-1nbqu5-0 kTSWSV"
                    >
                      on
                    </div>
                    <label
                      htmlFor="upload-button"
                      color="primary"
                      type="button"
                      class="Button-sc-l2616d-0 fDufhf"
                    >
                      Select file
                    </label>
                    <span
                      font-size="12px"
                      color="text.muted"
                      class="Typography-sc-1nbqu5-0 fwJlYS"
                    >
                      Upload 280*280 image
                    </span>
                  </label>
                  <input
                    accept=".jpeg,.jpg,.png,.gif"
                    id="upload-button"
                    multiple=""
                    type="file"
                    autocomplete="off"
                    tabindex="-1"
                    style={{ display: "none" }}
                    onChange={handleProfileImage}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="First Name"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={fName}
                    onChange={(e) => setfName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 ">
                  <label className="labeltext">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Last Name"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={lName}
                    onChange={(e) => setlName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-lg-6">
                  <label className="labeltext">Contact Number</label>
                  <input
                    required
                    type="number"
                    placeholder="Number"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-lg-6">
                  <label className="labeltext">Confirm Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm Password"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={cPassword}
                    onChange={(e) => setcPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Address</label>
                  <input
                    required
                    type="text"
                    placeholder="Address"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Shop Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Shop Name"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <label className="labeltext">Description</label>
                  <textarea
                    required
                    type="text"
                    placeholder="Details"
                    className="FormInput"
                    style={{ height: "150px", borderRadius: "10px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  {loading ? (
                    <button
                      style={{ border: "none" }}
                      // type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <>
                        <Spin indicator={antIcon} />
                      </>
                    </button>
                  ) : (
                    <button
                      style={{ border: "none" }}
                      type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Sign up</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  )}
                </div>
                <div className="col-lg-12">
                  <p className="mt-5 text-center">
                    Already have an account{" "}
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
            </form>
          </div>
        </div>
      </div>
    </section>
    // <section
    //   id="signup"
    //   className="hero d-flex align-items-center"
    //   style={{ padding: "100px 0px" }}
    // >
    //   <div className="container">
    //     <div className="row sectionShadow">
    //       <div className="col-lg-6 align-items-center justify-content-center align-self-center">
    //         <img src="assets/img/Sign_up.png" className="img-fluid" />
    //       </div>
    //       <div className="col-lg-4 offset-xl-1 formSection">
    //         <h1 style={{ fontSize: 28 }}>Join us!</h1>
    //         <p className="mb-2 mt-1" style={{ fontSize: 16 }}>
    //           Hundred thousands of students achieve goals
    //         </p>
    //         <div className="col-lg-12">
    //           <Form onFinish={handleSignup} initialValues={""}>
    //             <div className="col-lg-12">
    //               <Form.Item
    //                 name="name"
    //                 rules={[
    //                   { required: true, message: "Please input your name!" },
    //                 ]}
    //               >
    //                 <input
    //                   type="text"
    //                   placeholder="Enter your name"
    //                   className="FormInput"
    //                 />
    //               </Form.Item>

    //               <Form.Item
    //                 name="email"
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input your email!",
    //                   },
    //                 ]}
    //               >
    //                 <input
    //                   type="email"
    //                   placeholder="Enter your email"
    //                   className="FormInput"
    //                 />
    //               </Form.Item>
    //               <Form.Item
    //                 name="phone"
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input your phone!",
    //                   },
    //                 ]}
    //               >
    //                 <input
    //                   type="number"
    //                   placeholder="Enter your phone"
    //                   className="FormInput"
    //                 />
    //               </Form.Item>
    //               <Form.Item name="role" className="mt-2">
    //                 <Select size={"large"} placeholder="Select a role">
    //                   <Option value="Student">Student</Option>
    //                   <Option value="Writer">Writer</Option>
    //                   <Option value="Staff">Staff</Option>
    //                 </Select>
    //               </Form.Item>
    //               <Form.Item
    //                 name="password"
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input your password!",
    //                   },
    //                 ]}
    //               >
    //                 <input
    //                   type="password"
    //                   placeholder="Enter your password"
    //                   className="FormInput"
    //                 />
    //               </Form.Item>

    //               <div
    //                 className="col-lg-12 justify-content-center"
    //                 style={{ display: "flex" }}
    //               >
    //                 <input
    //                   name="termsConditions"
    //                   type="checkbox"
    //                   style={{ height: 18, width: 18 }}
    //                   onChange={(e) => setisTerms(e.target.checked)}
    //                 />
    //                 <label className="" style={{ marginLeft: 10 }}>
    //                   I have read and agree to the{" "}
    //                   <a
    //                     target="_blank"
    //                     href="https://papersmates.com/terms-conditions"
    //                     style={{ color: "#333", textDecoration: "underline" }}
    //                   >
    //                     Terms and Conditions
    //                   </a>
    //                 </label>
    //               </div>
    //               <div className="col-lg-12 text-center">
    //                 <Form.Item>
    //                   {isTerms ? (
    //                     <button
    //                       style={{ border: "none" }}
    //                       type="submit"
    //                       className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
    //                     >
    //                       <span>Sign up</span>
    //                       <i className="bi bi-arrow-right"></i>
    //                     </button>
    //                   ) : (
    //                     <button
    //                       style={{ border: "none" }}
    //                       disabled
    //                       className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
    //                     >
    //                       <span>Sign up</span>
    //                       <i className="bi bi-arrow-right"></i>
    //                     </button>
    //                   )}
    //                 </Form.Item>
    //               </div>
    //               <div className="col-lg-12 text-center">
    //                 <p className="mt-5">
    //                   Already have an account?{" "}
    //                   <Link
    //                     to="/"
    //                     className=""
    //                     style={{
    //                       color: "#333",
    //                       fontSize: 14,
    //                       fontWeight: 500,
    //                     }}
    //                   >
    //                     Signin Now
    //                   </Link>
    //                 </p>
    //               </div>
    //             </div>
    //           </Form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
