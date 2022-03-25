import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getOrdersByAdmin,
  getPendingOrdersByAdmin,
  getRecentOrdersByAdmin,
} from "../../config/api/OrdersAPI";
import { Skeleton } from "antd";
import Notification from "../../component/notification/Notification";
import { getRecentVendors } from "../../config/api/Vendor";

export default function AdminDashboard() {
  const state = useSelector((state) => state);
  // const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const [recentLoading, setRecentLoading] = useState(false);
  const [vendorLoading, setVendorLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentVendors, setRecentVendors] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchRecentOrders = async () => {
    setRecentLoading(true);
    try {
      const res = await getRecentOrdersByAdmin();
      if (res.status == 200) {
        setRecentOrders(res.data.orders);
        setRecentLoading(false);
        return;
      } else {
        Notification("Recent Orderst", res.data.message, "Error");
        setRecentLoading(false);
        return;
      }
    } catch (err) {
      Notification("Recent Orders", "Something went wrong", "Error");
      setRecentLoading(false);
    }
  };
  const fetchRecentVendors = async () => {
    setRecentVendors(true);
    try {
      const res = await getRecentVendors();
      if (res.status == 200) {
        setRecentVendors(res.data.users);
        setVendorLoading(false);
        return;
      } else {
        Notification("Recent Vendors", res.data.message, "Error");
        setVendorLoading(false);
        return;
      }
    } catch (err) {
      Notification("Recent Vendors", "Something went wrong", "Error");
      setVendorLoading(false);
    }
  };
  const fetchPendingOrders = async () => {
    setPendingLoading(true);
    try {
      const res = await getPendingOrdersByAdmin();
      if (res.status == 200) {
        setPendingOrders(res.data.orders);
        setPendingLoading(false);
        return;
      } else {
        Notification("Pending Orders", res.data.message, "Error");
        setPendingLoading(false);
        return;
      }
    } catch (err) {
      Notification("Pending Orders", "Something went wrong", "Error");
      setPendingLoading(false);
    }
  };
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  useEffect(() => {
    fetchRecentOrders();
    fetchRecentVendors();
    fetchPendingOrders();
  }, []);
  // console.log(recentOrders)
  return (
    <section
      id="hero"
      className="hero d-flex align-items-center"
      style={{ paddingBottom: "40px" }}
    >
      <div style={{ width: "100%" }}>
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <div class="page-body">
            <div class="container-fluid ecommerce-dash">
              <div class="row">
                <div class="col-xl-4 col-md-6 dash-xl-33 dash-lg-50">
                  <div
                    spacing="6"
                    class="GridStyle__StyledGrid-sc-1r6thsr-0 DwCWS"
                  >
                    {pendingLoading ? (
                      <Skeleton.Input className={"statics"} active={true} />
                    ) : (
                      <div
                        height="100%"
                        class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 jELKxp FODSZ Typography-sc-1nbqu5-0 jwCRmv"
                        cursor="unset"
                      >
                        <h5
                          font-weight="600"
                          font-size="16px"
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 wkSqn"
                        >
                          Earnings (before taxes)
                        </h5>
                        <h1
                          font-size="30px"
                          color="gray.700"
                          class="Typography-sc-1nbqu5-0 igxEVo"
                        >
                          $30450.00
                        </h1>
                        <p
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 feXfPn"
                        >
                          after associated vendor fees
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 dash-xl-33 dash-lg-50">
                  {pendingLoading ? (
                    <Skeleton.Input className={"statics"} active={true} />
                  ) : (
                    <div
                      spacing="6"
                      class="GridStyle__StyledGrid-sc-1r6thsr-0 DwCWS"
                    >
                      <div
                        height="100%"
                        class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 jELKxp FODSZ Typography-sc-1nbqu5-0 jwCRmv"
                        cursor="unset"
                      >
                        <h5
                          font-weight="600"
                          font-size="16px"
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 wkSqn"
                        >
                          Your balance
                        </h5>
                        <h1
                          font-size="30px"
                          color="gray.700"
                          class="Typography-sc-1nbqu5-0 igxEVo"
                        >
                          $4000.00
                        </h1>
                        <p
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 feXfPn"
                        >
                          Will be processed on Feb 15, 2021
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div class="col-xl-4 col-md-6 dash-lgorder-1 dash-xl-33 dash-lg-50">
                  {pendingLoading ? (
                    <Skeleton.Input className={"statics"} active={true} />
                  ) : (
                    <div
                      spacing="6"
                      class="GridStyle__StyledGrid-sc-1r6thsr-0 DwCWS"
                    >
                      <div
                        height="100%"
                        class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 jELKxp FODSZ Typography-sc-1nbqu5-0 jwCRmv"
                        cursor="unset"
                      >
                        <h5
                          font-weight="600"
                          font-size="16px"
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 wkSqn"
                        >
                          Pending Orders
                        </h5>
                        <h1
                          font-size="30px"
                          color="gray.700"
                          class="Typography-sc-1nbqu5-0 igxEVo"
                        >
                          {pendingOrders.length}
                        </h1>
                        <p
                          color="text.muted"
                          class="Typography-sc-1nbqu5-0 feXfPn"
                        >
                          {formatDate(pendingOrders[0].createdAt)} -{" "}
                          {formatDate(
                            pendingOrders[pendingOrders.length - 1].createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div class="col-xl-6 col-md-12">
                  {recentLoading ? (
                    <Skeleton.Input className={"recentLoader"} active={true} />
                  ) : (
                    <div class="card ongoing-project recent-orders">
                      <div class="card-header card-no-border">
                        <div class="media media-dashboard">
                          <div class="media-body">
                            <h5 class="mb-0">Recent Orders</h5>
                          </div>
                        </div>
                      </div>
                      <div class="card-body pt-0">
                        <div class="table-responsive">
                          <table class="table table-bordernone">
                            <thead>
                              <tr>
                                <th>
                                  {" "}
                                  <span>Customer Name</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Customer Email</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Amount</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Quantity</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Status</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentOrders.length > 0 &&
                                recentOrders.map((order) => (
                                  <tr>
                                    <td class="img-content-box">
                                      <h6>
                                        {order.user.firstName}{" "}
                                        {order.user.lastName}
                                      </h6>
                                    </td>
                                    <td class="img-content-box">
                                      <h6>{order.user.email}</h6>
                                    </td>
                                    <td>
                                      <h6>{order.totalAmount}</h6>
                                      <span>{order.paymentType}</span>
                                    </td>
                                    <td>
                                      <h6>{order.items.length}</h6>
                                    </td>
                                    <td>
                                      <div class="badge badge-light-primary">
                                        {
                                          // console.log(order.orderStatus.findIndex(
                                          //   (status) => {
                                          //     return (
                                          //       status.isCompleted == false
                                          //     );
                                          //   }
                                          // ))
                                          order.orderStatus[
                                            order.orderStatus.findIndex(
                                              (status) => {
                                                return (
                                                  status.isCompleted == false
                                                );
                                              }
                                            ) != -1
                                              ? order.orderStatus.findIndex(
                                                  (status) => {
                                                    return (
                                                      status.isCompleted ==
                                                      false
                                                    );
                                                  }
                                                ) - 1
                                              : 3
                                          ].type
                                        }
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div class="col-xl-6 col-md-12">
                  {vendorLoading ? (
                    <Skeleton.Input className={"recentLoader"} active={true} />
                  ) : (
                    <div class="card ongoing-project recent-orders">
                      <div class="card-header card-no-border">
                        <div class="media media-dashboard">
                          <div class="media-body">
                            <h5 class="mb-0">Recent Vendors</h5>
                          </div>
                        </div>
                      </div>
                      <div class="card-body pt-0">
                        <div class="table-responsive">
                          <table class="table table-bordernone">
                            <thead>
                              <tr>
                                <th>
                                  {" "}
                                  <span>Shop Detail</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Vendor Name</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Vendor Email</span>
                                </th>
                                {/* <th>
                                  {" "}
                                  <span>Quantity</span>
                                </th> */}
                                <th>
                                  {" "}
                                  <span>Status</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentVendors.length > 0 &&
                                recentVendors.map((vendor) => (
                                  <tr>
                                    <td>
                                      <div class="media">
                                        <div class="square-box me-2">
                                          <img
                                            class="img-fluid b-r-5"
                                            src={vendor.avatar}
                                            alt=""
                                          />
                                        </div>
                                        <div class="media-body ps-2">
                                          <div
                                            class="avatar-details"
                                            style={{ textAlign: "left" }}
                                          >
                                            <Link >
                                              <h6>{vendor.shopName}</h6>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td class="img-content-box">
                                      <h6>
                                        {vendor.firstName} {vendor.lastName}
                                      </h6>
                                    </td>
                                    <td
                                      class="img-content-box"
                                      style={{ textAlign: "left" }}
                                    >
                                      <h6>{vendor.email}</h6>
                                    </td>
                                    <td>
                                      <div class="badge badge-light-primary">
                                        {vendor.status}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class="col-xl-8 col-md-8 dash-lgorder-1 dash-xl-50 ">
                  <div class="card profile-greeting">
                    <div class="card-body">
                      <div class="media">
                        <div class="media-body">
                          <div class="greeting-user">
                            <h1 style={{ color: "#fff" }}>
                              Hello, {auth.user.fullName}
                            </h1>
                            <p>Welcome back, your dashboard is ready!</p>
                          </div>
                        </div>
                      </div>
                      <div class="cartoon-img">
                        <img
                          class="img-fluid"
                          src="http://admin.pixelstrap.com/zeta/assets/images/images.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-4 dash-xl-50 dash-29">
                  <div class="card bg-primary get-support">
                    <div class="card-body">
                      <div class="support-sec-img">
                        <img
                          class="img-fluid"
                          src="../assets/images/dashboard-2/support-img.png"
                          alt=""
                        />
                      </div>
                      <div class="support-detail">
                        <h5 style={{ color: "#fff" }}>Get support 24 hours</h5>
                        <p style={{ color: "#fff" }}>
                          Check Our new service & feature about sales!{" "}
                        </p>
                      </div>
                    </div>
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
