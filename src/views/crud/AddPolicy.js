import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Notification from "../../component/notification/Notification";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import { addOffer } from "../../config/api/Offer";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createPolicy } from "../../config/api/policy";

export default function AddPolicy() {
  const [loading, setLoading] = useState(false);
  const [policyType, setPolicyType] = useState("");
  const [policyDesc, setPolicyDesc] = useState("");
  const [policyDescArabic, setPolicyDescArabic] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const handleDescription = (e, editor) => {
    const data = editor.getData();
    // console.log(data)
    setPolicyDesc(data);
  };
  const handleDescriptionArabic = (e, editor) => {
    const data = editor.getData();
    // console.log(data)
    setPolicyDescArabic(data);
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    if (policyDesc == "" || policyDescArabic == "") {
      Notification("Policy Department", "Description is required", "Error");
    } else {
      const model = {
        type: policyType,
        description: JSON.stringify(policyDesc),
        descriptionArabic: JSON.stringify(policyDescArabic),
      };
      try {
        const res = await createPolicy(model);
        if (res.status === 201) {
          Notification(
            "Policy Department",
            "Policy Added Successfully",
            "Success"
          );
          setPolicyType("");
          setPolicyDesc("");
          setPolicyDescArabic("");
          setLoading(false);
          return;
        } else {
          Notification("Policy Department", res.data.message, "Error");
          setLoading(false);
          return;
        }
      } catch (err) {
        Notification("Policy Department", "Something went wrong", "Error");
        setLoading(false);
      }
    }
    //   console.log(JSON.stringify(policyDesc))
    //   console.log(JSON.stringify(policyDescArabic))
  };

  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, [auth.authenticate]);
  //   console.log(policyDesc)
  //       console.log(policyDescArabic)
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Policy"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Add Policy</h1>

              <form onSubmit={handleAddPolicy}>
                <div className="row">
                  <div className="col-lg-6">
                    <label className="labeltext">Policy Type: (*)</label>
                    <select
                      className="FormInput"
                      name="cars"
                      id="cars"
                      required
                      value={policyType}
                      onChange={(e) => setPolicyType(e.target.value)}
                    >
                      <option value="">None</option>
                      <option key="Privacy Policy" value="Privacy Policy">
                        Privacy Policy
                      </option>
                      <option key="Shiping Policy" value="Shiping Policy">
                        Shiping Policy
                      </option>
                      <option
                        key="Terms and Conditions"
                        value="Terms and Conditions"
                      >
                        Terms and Conditions
                      </option>
                    </select>
                  </div>
                  <div className="col-lg-12 ">
                    <label className="labeltext">Policy Description: (*)</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={policyDesc}
                      onChange={handleDescription}
                    />
                  </div>
                  <div className="col-lg-12 ">
                    <label className="labeltext">
                      Policy Description Arabic: (*)
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={policyDescArabic}
                      onChange={handleDescriptionArabic}
                    />
                  </div>
                  {/* <div>{policyDesc}</div> */}
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
                        <span>Add Offer</span>
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
