import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Notification from "../../component/notification/Notification";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import { addOffer } from "../../config/api/Offer";
import { useHistory } from "react-router-dom";

export default function AddOffer() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [offerImage, setOfferImage] = useState("");
  const [offersImage, setOffersImage] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const handleAddOffer = async (e) => {
    e.preventDefault();
    setLoading(true)
    var form = new FormData();
    form.append("title", title);
    form.append("description", offerDesc);
    form.append("offerImage", offerImage);
    try {
      const res = await addOffer(form);
      if (res.status === 201) {
        Notification("Offer Department", res.data.message, "Success");
        setTitle("");
        setOfferDesc("");
        setOfferImage("");
        setOffersImage("")
        setLoading(false)
        return;
      } else {
        Notification("Offer Department", res.data.message, "Error");
        setLoading(false)
        return;
      }
    } catch (err) {
      setLoading(false)
      // console.log(err);
      Notification("Offer", "Something went wrong", "Error");
    }
  };
  const handleOfferImage = (e) => {
    setOfferImage(e.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setOffersImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
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
            title={"Offers"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Add Offer</h1>

              <form onSubmit={handleAddOffer}>
                <div className="row">
                  {/* <div className="col-lg-12">
                    <input
                      required
                      type="file"
                      name="offerImage"
                      onChange={handleOfferImage}
                    />
                  </div> */}
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
                    {offersImage != "" && (
                      <img
                        className="editImage"
                        src={offersImage}
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
                      Offer image here
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
                    onChange={handleOfferImage}
                  />
                </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Offer Title: (*)</label>
                    <input
                      type="text"
                      required
                      className="FormInput"
                      value={title}
                      placeholder="Offer Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12 ">
                    <label className="labeltext">Offer Description: (*)</label>
                    <textarea
                      type="text"
                      required
                      className="FormInput"
                      value={offerDesc}
                      placeholder="Offer Description"
                      onChange={(e) => setOfferDesc(e.target.value)}
                      style={{ height: "110px" }}
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
