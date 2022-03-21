import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// import "../../chart/chartjs/chart.min.js"
// import "../../chart/chartist/chartist.js"
// import "../../chart/chartist/chartist-plugin-tooltip.js"
// import "../../chart/apex-chart/apex-chart.js"
// import "../../chart/apex-chart/stock-prices.js"

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import CounterCard from "../../component/counterCard/CounterCard";
import IntroCard from "../../component/introCard/IntroCard";
import ChangePassword from "../../component/changePassword/ChangePassword";

export default function WriterDashboard() {
  const state = useSelector((state) => state);
  // const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const [changePassword, setChangePassword] = useState(false);

 

  // useEffect(() => {
  //   if (authState.token == null) {
  //     history.push("/");
  //   }
  // }, []);
  return (
    <section id="hero" className="hero d-flex align-items-center" style={{paddingBottom: "40px"}}>
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
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 dash-xl-33 dash-lg-50">
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
                </div>
                <div class="col-xl-4 col-md-6 dash-lgorder-1 dash-xl-33 dash-lg-50">
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
                        08
                      </h1>
                      <p
                        color="text.muted"
                        class="Typography-sc-1nbqu5-0 feXfPn"
                      >
                        7/3/2020 - 8/1/2020
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xl-5 col-md-12 dash-xl-50 dash-lg-100 dash-39">
                  <div class="card ongoing-project recent-orders">
                    <div class="card-header card-no-border">
                      <div class="media media-dashboard">
                        <div class="media-body">
                          <h5 class="mb-0">Recent Orders</h5>
                        </div>
                        <div class="icon-box onhover-dropdown">
                          <i data-feather="more-horizontal"></i>
                          <div class="icon-box-show onhover-show-div">
                            <ul>
                              <li>
                                {" "}
                                <a>Done</a>
                              </li>
                              <li>
                                {" "}
                                <a>Pending</a>
                              </li>
                              <li>
                                {" "}
                                <a>Rejected</a>
                              </li>
                              <li>
                                {" "}
                                <a>In Progress</a>
                              </li>
                            </ul>
                          </div>
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
                                <span>Product Name</span>
                              </th>
                              <th>
                                {" "}
                                <span>Customer</span>
                              </th>
                              <th>
                                {" "}
                                <span>Price </span>
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
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="square-box me-2">
                                    <img
                                      class="img-fluid b-r-5"
                                      src="../assets/images/dashboard-2/running-shoe.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="media-body ps-2">
                                    <div class="avatar-details">
                                      <a href="product-page.html">
                                        <h6>Nike Sports NK</h6>
                                      </a>
                                      <span> Free delivery</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="img-content-box">
                                <h6>Harold More</h6>
                                <span>UK Desig Team</span>
                              </td>
                              <td>
                                <h6>$99.85</h6>
                                <span>Nok </span>
                              </td>
                              <td>
                                <h6>20</h6>
                              </td>
                              <td>
                                <div class="badge badge-light-primary">
                                  Done
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="square-box me-2">
                                    <img
                                      class="img-fluid b-r-5"
                                      src="../assets/images/dashboard-2/hand-bag.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="media-body ps-2">
                                    <div class="avatar-details">
                                      <a href="product-page.html">
                                        <h6>Women Bag</h6>
                                      </a>
                                      <span> ₹83.65 delivery</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="img-content-box">
                                <h6>Daniel Poller</h6>
                                <span>UX Ninjas</span>
                              </td>
                              <td>
                                <h6>$79.99</h6>
                                <span>Nok </span>
                              </td>
                              <td>
                                <h6>12</h6>
                              </td>
                              <td>
                                <div class="badge badge-light-secondary">
                                  Pending
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="square-box me-2">
                                    <img
                                      class="img-fluid b-r-5"
                                      src="../assets/images/dashboard-2/sun-glasses.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="media-body ps-2">
                                    <div class="avatar-details">
                                      <a href="product-page.html">
                                        <h6>Sunglasses</h6>
                                      </a>
                                      <span> Free delivery</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="img-content-box">
                                <h6>Frank Borker</h6>
                                <span>SF Dev Team</span>
                              </td>
                              <td>
                                <h6>$59.20</h6>
                                <span>Nok </span>
                              </td>
                              <td>
                                <h6>23</h6>
                              </td>
                              <td>
                                <div class="badge badge-light-danger">
                                  Rejected
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="square-box me-2">
                                    <img
                                      class="img-fluid b-r-5"
                                      src="../assets/images/dashboard-2/shirt.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="media-body ps-2">
                                    <div class="avatar-details">
                                      <a href="product-page.html">
                                        <h6>Cotton T-shirt</h6>
                                      </a>
                                      <span> ₹283.65 delivery</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="img-content-box">
                                <h6>Adam Moris</h6>
                                <span>Moscow Office</span>
                              </td>
                              <td>
                                <h6>$49.99</h6>
                                <span>Nok </span>
                              </td>
                              <td>
                                <h6>34</h6>
                              </td>
                              <td>
                                <div class="badge badge-light-info">
                                  In Progress
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 dash-xl-50 dash-29">
                  <div class="card our-activities">
                    <div class="card-header card-no-border">
                      <div class="media media-dashboard">
                        <div class="media-body">
                          <h5 class="mb-0">Our Activities </h5>
                        </div>
                        <div class="icon-box onhover-dropdown">
                          <i data-feather="more-horizontal"></i>
                          <div class="icon-box-show onhover-show-div">
                            <ul>
                              <li>
                                {" "}
                                <a>Latest </a>
                              </li>
                              <li>
                                {" "}
                                <a>Earlist</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="table-responsive">
                        <table class="table table-bordernone">
                          <tbody>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="icon-wrappar">
                                    <i class="fa fa-trophy font-primary"> </i>
                                  </div>
                                  <div class="media-body">
                                    <a href="#">
                                      <h5>
                                        Win best seller of the year awaed{" "}
                                      </h5>
                                    </a>
                                    <p>Company, San Francisco</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  1 day ago
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="icon-wrappar">
                                    <i class="fa fa-check-circle font-secondary">
                                      {" "}
                                    </i>
                                  </div>
                                  <div class="media-body">
                                    <a href="#">
                                      <h5>Apporved our product</h5>
                                    </a>
                                    <p>Elisse joson, San Francisco</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  2 weeks ago
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="icon-wrappar">
                                    <i class="fa fa-bookmark font-success"> </i>
                                  </div>
                                  <div class="media-body">
                                    <a href="#">
                                      <h5>
                                        Win best seller of the year awaed{" "}
                                      </h5>
                                    </a>
                                    <p>Company, San Francisco</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  3 day ago
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <div class="icon-wrappar">
                                    <i class="fa fa-shopping-basket font-warning">
                                      {" "}
                                    </i>
                                  </div>
                                  <div class="media-body">
                                    <a href="#">
                                      <h5>Apporved our product in checking</h5>
                                    </a>
                                    <p>35k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  2 hours ago
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 dash-xl-50 dash-32">
                  <div class="card hot-selling">
                    <div class="card-header card-no-border">
                      <div class="header-top">
                        <h5 class="m-0">Hot Selling Products</h5>
                        <div class="icon-box onhover-dropdown">
                          <i data-feather="more-horizontal"></i>
                          <div class="icon-box-show onhover-show-div">
                            <ul>
                              <li>
                                {" "}
                                <a>Today</a>
                              </li>
                              <li>
                                {" "}
                                <a>Yesterday</a>
                              </li>
                              <li>
                                {" "}
                                <a>Tommorow</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="table-responsive">
                        <table class="table table-bordernone">
                          <tbody>
                            <tr>
                              <td>
                                <div class="media">
                                  <img
                                    class="img-fluid me-3 b-r-5"
                                    src="../assets/images/dashboard-2/rectangle-26.png"
                                    alt=""
                                  />
                                  <div class="media-body">
                                    <a href="product-page.html">
                                      <h5>Dominoes Coffee Table Game</h5>
                                    </a>
                                    <p>60k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  $50
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  {" "}
                                  <img
                                    class="img-fluid me-3 b-r-5"
                                    src="../assets/images/dashboard-2/rectangle-27.png"
                                    alt=""
                                  />
                                  <div class="media-body">
                                    <a href="product-page.html">
                                      <h5>Photive Wireless speakers</h5>
                                    </a>
                                    <p>35k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  $25
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <img
                                    class="img-fluid me-3 b-r-5"
                                    src="../assets/images/dashboard-2/rectangle-28.png"
                                    alt=""
                                  />
                                  <div class="media-body">
                                    <a href="product-page.html">
                                      <h5>Urbanears Lotsen Speaker</h5>
                                    </a>
                                    <p>53k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  $30
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <img
                                    class="img-fluid me-3 b-r-5"
                                    src="../assets/images/dashboard-2/rectangle-29.png"
                                    alt=""
                                  />
                                  <div class="media-body">
                                    <a href="product-page.html">
                                      <h5>Plattan 2 Headphones</h5>
                                    </a>
                                    <p>35k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  $45{" "}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="media">
                                  <img
                                    class="img-fluid me-3 b-r-5"
                                    src="../assets/images/dashboard-2/rectangle-29.png"
                                    alt=""
                                  />
                                  <div class="media-body">
                                    <a href="product-page.html">
                                      <h5>Plattan 2 Headphones</h5>
                                    </a>
                                    <p>35k Sales</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span class="badge badge-light-theme-light font-theme-light">
                                  $45{" "}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-8 col-md-8 dash-lgorder-1 dash-xl-50 ">
                  <div class="card profile-greeting">
                    <div class="card-body">
                      <div class="media">
                        <div class="media-body">
                          <div class="greeting-user">
                            <h1 style={{color: "#fff"}}>Hello, {auth.user.fullName}</h1>
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
                        <h5 style={{color: "#fff"}}>Get support 24 hours</h5>
                        <p style={{color: "#fff"}}>Check Our new service & feature about sales! </p>
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
