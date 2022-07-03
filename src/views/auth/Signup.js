import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Select, Spin} from "antd";
import {useSelector} from "react-redux";

import {createVendor} from "../../config/api/UserAuthAPI";
import Notification from "../../component/notification/Notification";
import {LoadingOutlined} from "@ant-design/icons";
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
    form.append("first_name", fName);
    form.append("last_name", lName);
    form.append("email", email);
    form.append("password", password);
    form.append("shop_description", description);
    form.append("shop_address", address);
    form.append("shop_name", shopName);
    form.append("contact_number", contactNumber);
    form.append("avatar", profileImage);
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
  );
}
