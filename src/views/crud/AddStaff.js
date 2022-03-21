import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Notification from "../../component/notification/Notification";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import { addOffer } from "../../config/api/Offer";
import { useHistory } from "react-router-dom";
import { addStaff } from "../../config/api/Staff";

export default function AddStaff() {
  const [loading, setLoading] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    const model = {
        firstName : fName,
        lastName : lName,
        email : email,
        password : password,
        cpassword : cPassword
    }
    // console.log(model)
    try {
      const res = await addStaff(model);
      if (res.status === 201) {
        Notification("Staff", res.data.message, "Success");
        setfName("");
        setlName("");
        setEmail("");
        setPassword("");
        setcPassword("")
        setLoading(false);
        return;
      } else {
        Notification("Staff", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch (err) {
      setLoading(false);
      Notification("Staff", "Something went wrong", "Error");
    }
  };
  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, [auth.authenticate]);
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Staff"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Add Staff</h1>

              <form onSubmit={handleAddStaff}>
                <div className="row">
                  {/* <div className="col-lg-12">
                    <input
                      required
                      type="file"
                      name="offerImage"
                      onChange={handleOfferImage}
                    />
                  </div> */}
                  <div className="col-lg-6">
                    <label className="labeltext">First Name: (*)</label>
                    <input
                      type="text"
                      required
                      className="FormInput"
                      value={fName}
                      placeholder="First Name"
                      onChange={(e) => setfName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Last Name: (*)</label>
                    <input
                      type="text"
                      required
                      className="FormInput"
                      value={lName}
                      placeholder="Last Name"
                      onChange={(e) => setlName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Email: (*)</label>
                    <input
                      type="email"
                      required
                      className="FormInput"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Password: (*)</label>
                    <input
                      type="password"
                      required
                      className="FormInput"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Confirm Password: (*)</label>
                    <input
                      type="password"
                      required
                      className="FormInput"
                      value={cPassword}
                      placeholder="Confirm Password"
                      onChange={(e) => setcPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12">
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
                        <span>Add Staff</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    )}
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
