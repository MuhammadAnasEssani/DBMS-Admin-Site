import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

import { createVendor, userSignUp } from "../../config/api/UserAuthAPI";
import Notification from "../../component/notification/Notification";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Signup() {
  // const state = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isTerms, setisTerms] = useState(false);
  const { Option } = Select;

  const handleSignup = async (e) => {
    e.preventDefault();
    var form = new FormData();
    form.append("firstName", fName);
    form.append("lastName", lName);
    form.append("email", email);
    form.append("password", password);
    form.append("cpassword", cPassword);
    form.append("description", description);
    form.append("address", address);
    form.append("contactNumber", contactNumber);
    form.append("userImage", profileImage);
    try {
      const res = await createVendor(form);
      console.log(res)
      if (res.status === 201) {
        Notification("Create Vendor", res.data.message, "Success");
        setfName("");
        setlName("");
        setEmail("");
        setDescription("");
        setAddress("");
        setContactNumber("");
        setPassword("");
        setcPassword("");
        setProfileImage("")
        return;
      } else {
        Notification("Create Vendor", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Create Vendor", "Something went wrong", "Error");
    }
  };
  const handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  useEffect(() => {
    if (auth.token != null) {
      history.push("/dashboard");
      return;
    }
  }, []);

  return (
    <section
      id="signup"
      className="hero d-flex align-items-center"
      style={{ padding: "160px 0px 50px 0px" }}
    >
      <div className="container-fluid ">
        <div
          className="row"
          //   className={
          //     t("lang") === "en"
          //       ? drawerState.Drawer
          //         ? "row offset-xl-2"
          //         : "row offset-xl-1"
          //       : drawerState.Drawer
          //       ? "row onset-xl-2"
          //       : "row onset-xl-1"
          //   }
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
            {/* Create Tender */}
            {/* {t("createtenders")} */}
            Signup
          </h1>
          <div
            className="row sectionShadow"
            style={{ maxWidth: "1040px", backgroundColor: "#f9fafb" }}
          >
            <form onSubmit={handleSignup}>
              <div className="row">
                <div className="col-lg-12">
                  <input
                    required
                    type="file"
                    name="offerImage"
                    onChange={handleProfileImage}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">First Name</label>
                  {/* <Form.Item name="title"> */}
                  <input
                    required
                    type="text"
                    placeholder="First Name"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={fName}
                    onChange={(e) => setfName(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6 ">
                  <label className="labeltext">Last Name</label>
                  {/* <Form.Item name="email"> */}
                  <input
                    required
                    type="text"
                    placeholder="Last Name"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={lName}
                    onChange={(e) => setlName(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Email</label>
                  {/* <Form.Item name="phone"> */}
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>

                <div className="col-lg-6">
                  <label className="labeltext">Contact Number</label>
                  {/* <Form.Item name="academic-level"> */}
                  <input
                    required
                    type="number"
                    placeholder="Number"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Password</label>
                  {/* <Form.Item name="phone"> */}
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>

                <div className="col-lg-6">
                  <label className="labeltext">Confirm Password</label>
                  {/* <Form.Item name="academic-level"> */}
                  <input
                    required
                    type="password"
                    placeholder="Confirm Password"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={cPassword}
                    onChange={(e) => setcPassword(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Address</label>
                  {/* <Form.Item name="academic-level"> */}
                  <input
                    required
                    type="text"
                    placeholder="Address"
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>

                <div className="col-lg-12">
                  <label className="labeltext">Description</label>
                  {/* <Form.Item name="description"> */}
                  <textarea
                    required
                    type="text"
                    placeholder="Details"
                    className="FormInput"
                    style={{ height: "150px", borderRadius: "10px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {/* </Form.Item> */}
                </div>

                {/* <div className="col-lg-5">
                  <label className="labeltext">Categories : (*)</label>
                  <Form.Item name="categories">
                    <Select
                      size={"large"}
                      mode="multiple"
                      showSearch
                      className="FormInput"
                      placeholder="Select a categories"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Essay">Essay</Option>
                      <Option value="Critical Thinking">
                        Critical Thinking
                      </Option>
                      <Option value="Creative Writing">Creative Writing</Option>
                    </Select>
                  </Form.Item>
                </div> */}
                {/* <div className="col-lg-5 offset-xl-1">
                  <label className="labeltext">Password: (*)</label>
                  <Form.Item name="password">
                    <input type="password" className="FormInput" />
                  </Form.Item>
                </div> */}

                {/* <div className="col-lg-6">
                    <button className="btn btn-get-started" style={{width: "100%", backgroundColor :"#58595b", borderRadius: "15px"}}>Update Document</button>
                </div> */}
                <div className="col-lg-6 col-12">
                  {/* <Form.Item> */}
                  {loading ? (
                    <button
                      style={{ border: "none" }}
                      type="submit"
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
                  {/* </Form.Item> */}
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
