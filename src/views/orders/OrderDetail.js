import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { OrderDetails } from "../../config/api/OrdersAPI";

export default function OrderDetail() {
  const states = useSelector((state) => state);
  const authState = states.AuthReducer.user;
  const drawerState = states.DrawerReducer.State;
  const { orderid } = useParams();

  const [OrderData, setOrderData] = useState([]);
  const [Isloading, setIsloading] = useState(true);
  const HandleOrderDetails = async () => {
    try {
      var res = await OrderDetails(authState.token, 1);
      if (res.Message != "Success") {
        console.log(res.Message);
        return;
      }
      var resModel = res.Data[0];
      console.log(resModel)
      setOrderData(resModel);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const model = {
    name: "Doe",
    type: "Essay",
    topic: "Artificial",
    level: "Masters",
    pages: "10",
    deadline: "12/3/2021",
    status: "Not Assign",
    price: "23$",
  };

  useEffect(() => {
    HandleOrderDetails();
  }, []);

  return (
    <section id="List" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-journal-text"}
            title={"Orders Detail"}
            subicon={"bi bi-diagram-2"}
            subtitle={"List"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div
              className=" col-lg-11 dashboardSections itempadding"
              style={{ padding: "50px 40px" }}
            >
              <div className="row">
                <div className="col-lg-5 formSection marginL">
                  <h1 className="mb-4" style={{ marginLeft: 5 }}>
                    Order Detail
                  </h1>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>Student Name :</th>
                        <td>
                          {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.Studentname
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Academic Level :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.academiclevel
                          )}</td>
                      </tr>
                      <tr>
                        <th>Paper Type :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.PaperType
                          )}</td>
                      </tr>
                      <tr>
                        <th>Paper Topic :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.paperTopic
                          )}</td>
                      </tr>
                      <tr>
                        <th>Pages :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.pages
                          )}</td>
                      </tr>
                      <tr>
                        <th>Deadline :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.Deadline
                          )}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <th>Status :</th>
                        <td> {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 100, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.status
                          )}</td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          {" "}
                          <strong style={{ color: "#4c4c4c" }}>
                            Paper Description :{" "}
                          </strong>
                          {Isloading ? (
                            <Skeleton.Input
                              style={{ width: 200, height: 25 }}
                              size={"default"}
                              active={Isloading}
                            ></Skeleton.Input>
                          ) : (
                            OrderData.paperDescription
                          )}
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                          <h1 style={{ fontSize: 23 }}>Total Price :</h1>
                        </td>
                        <td>
                          <h1 style={{ fontSize: 23 }}>$12</h1>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-5 offset-xl-1 align-self-center formSection">
                  <div className="text-center filesectionpadding">
                    <svg
                      class="ant-empty-img-simple"
                      width="90"
                      height="90"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(0 1)"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <ellipse
                          class="ant-empty-img-simple-ellipse"
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"
                        ></ellipse>
                        <g class="ant-empty-img-simple-g" fill-rule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            class="ant-empty-img-simple-path"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <p style={{ color: "#ccc", fontWeight: 400 }}>
                      File Not Available
                    </p>
                    <Link
                      className="btn btn-get-started"
                      style={{ padding: "20px 30px" }}
                    >
                      Download File <i className="bi bi-download"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
