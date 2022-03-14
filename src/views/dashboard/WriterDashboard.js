import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "antd";
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

  const columnsTopic = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
  ];
  const columnsOrder = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Paper Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "DeadLine",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <div className="d-sm-inline-flex gap-2 actionDiv">
          <Link
            className="bi bi-pencil actionBtn"
            onClick={() => console.log(record.key)}
          ></Link>
          <Link className="bi bi-trash actionBtn"></Link>
        </div>
      ),
    },
  ];
  const dataOrder = [
    {
      key: "1",
      no: "1",
      name: "Admin",
      type: "Essay",
      deadline: "20/12/2020",
    },
    {
      key: "2",
      no: "2",
      name: "Mr Admin",
      type: "Essay",
      deadline: "20/12/2020",
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      topic: "Essay",
      orders: 23,
    },
    {
      key: "2",
      no: "2",
      topic: "Essay",
      orders: 24,
    },
  ];

  const model = {
    name: "Staff",
    role: "Staff",
    email: "Staff@app.com",
    phone: "(+971) 446546 54",
  };

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
          {/* <BreadCrumbs
            icon={"bi bi-grid"}
            title={"Dashboard"}
            subicon={"bi bi-eject"}
            subtitle={"Latest Update"}
          />
          <div className="col-lg-4">
            {changePassword ? (
              <ChangePassword onclick={() => setChangePassword(false)} />
            ) : (
              <IntroCard
                model={model}
                editURl={"/edit-profile"}
                onclick={() => setChangePassword(true)}
              />
            )}
          </div> */}
          {/* <div className="col-lg-8">
            <div className="row gap-2 itempadding">
              <CounterCard
                icon={"assets/img/order.png"}
                count={"14"}
                heading={"Orders"}
              />

              <CounterCard
                icon={"assets/img/order.png"}
                count={"18"}
                heading={"Pending Papers"}
              />
              
              <CounterCard
                icon={"assets/img/request_paper.png"}
                count={"18"}
                col={"10"}
                heading={"Submited Papers"}
              />

              <CounterCard
                icon={"assets/img/Categories.png"}
                count={"18"}
                col={"10"}
                heading={"Categories"}
              />

            </div>
          </div> */}

          {/* <div className="col-lg-11 marginsTB ">
            <div className="row  itempadding">
              <div className="col-lg-4 dashboardSections paddingtable marginLR">
                <div className="col-lg-12 ">
                  <h1 style={{ fontSize: 24 }}>Most accepted topics</h1>
                  <p>Total Topics: 10</p>
                  <Table
                    columns={columnsTopic}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                  />
                </div>
              </div>
              <div className="col-lg-7 dashboardSections paddingtable">
                <div className="col-lg-12">
                  <h1 style={{ fontSize: 24 }}>Orders</h1>
                  <p>Total Orders : 48</p>
                  <Table
                    columns={columnsOrder}
                    dataSource={dataOrder}
                    pagination={{ pageSize: 5 }}
                  />
                </div>
              </div>
            </div>
          </div> */}
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
                  {/* <div class="card sales-state">
                    <div class="row m-0">
                      <div class="col-12 p-0">
                        <div class="card bg-primary">
                          <div class="card-header card-no-border bg-primary">
                            <div class="media media-dashboard">
                              <div class="media-body">
                                <h5 class="mb-0 text-light">Sales Stats</h5>
                              </div>
                              <div class="icon-box">
                                <i data-feather="more-horizontal"></i>
                              </div>
                            </div>
                          </div>
                          <div class="card-body p-0">
                            <div id="sales-state-chart"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div class="sales-small-chart">
                          <div class="card-body p-0 m-auto">
                            <div class="sales-small sales-small-1"></div>
                            <h6>300</h6>
                            <span>Watch Sale </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div class="sales-small-chart">
                          <div class="card-body p-0 m-auto">
                            <div class="sales-small sales-small-2"></div>
                            <h6>1120</h6>
                            <span>Phone Sale</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div class="sales-small-chart">
                          <div class="card-body p-0 m-auto">
                            <div class="sales-small sales-small-3"></div>
                            <h6>530</h6>
                            <span>Tablet Sale </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div class="col-xl-4 col-md-6 dash-xl-33 dash-lg-50">
                  {/* <div class="card pb-0 invoice-overviwe">
                    <div class="card-header card-no-border">
                      <div class="header-top">
                        <h5 class="m-0">Invoice Overview</h5>
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
                      <div id="invoice-overviwe-chart"></div>
                    </div>
                  </div> */}
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
                    {/* <div
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
                    </div> */}
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
                    {/* <div
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
                    </div> */}
                  </div>
                  {/* <div class="card hot-selling">
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
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div> */}
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
                  {/* <div class="card revenue-category">
                    <div class="card-header card-no-border">
                      <div class="media">
                        <div class="media-body">
                          <h5 class="mb-0">Revenue by Category</h5>
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
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="donut-inner">
                        <h5>16,349</h5>
                        <h6>2,174 in pending</h6>
                      </div>
                      <div id="revenue-chart"> </div>
                    </div>
                  </div> */}
                </div>
                <div class="col-xl-8 col-md-8 dash-lgorder-1 dash-xl-50 ">
                  {/* <div
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 hrQCit jTGtOC"
                  >
                    <h5
                      font-weight="600"
                      font-size="16px"
                      class="Typography-sc-1nbqu5-0 fyYUUC"
                    >
                      Sales
                    </h5>
                    <canvas
                      role="img"
                      height="263"
                      width="528"
                      style={{display: "block", boxSizing: "border-box", height: "263px", width: "528px"}}
                    ></canvas>
                  </div> */}
                  <div class="card profile-greeting">
                    <div class="card-body">
                      <div class="media">
                        <div class="media-body">
                          <div class="greeting-user">
                            <h1 style={{color: "#fff"}}>Hello, {auth.user.fullName}</h1>
                            <p>Welcome back, your dashboard is ready!</p>
                            {/* <a
                              class="btn btn-outline-white_color"
                              href="blog-single.html"
                            >
                              Get Started<i class="icon-arrow-right"> </i>
                            </a> */}
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
                  {/* <div class="card special-discount">
                    <div class="card-body">
                      <div class="discount-slide owl-carousel owl-theme">
                        <div class="item">
                          <div class="row discount-block">
                            <div class="col-xl-7 col-lg-12 dash-xl-100">
                              <div class="discount-detail">
                                <div>
                                  <h5>
                                    {" "}
                                    Special Discount{" "}
                                    <span class="font-primary f-w-500">
                                      70%OFF
                                    </span>
                                  </h5>
                                  <h3 class="m-auto">
                                    Deal of the Day from{" "}
                                    <span class="font-primary">$75</span>
                                  </h3>
                                  <ul class="timer-sec countdown">
                                    <li>
                                      <h6 class="font-primary m-0 days"> </h6>
                                      <span class="font-dark">Days </span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 hours"> </h6>
                                      <span class="font-dark">Hours</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 minutes">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Min</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 seconds">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Sec</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-5 col-lg-12 dash-xl-100">
                              <div class="img-wrraper">
                                <img
                                  class="img-fluid"
                                  src="../assets/images/dashboard-2/image.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <div class="row discount-block">
                            <div class="col-xl-7 col-lg-12 dash-xl-100">
                              <div class="discount-detail">
                                <div>
                                  <h5>
                                    {" "}
                                    Special Discount{" "}
                                    <span class="font-primary f-w-500">
                                      70%OFF
                                    </span>
                                  </h5>
                                  <h3 class="m-auto">
                                    Deal of the Day from{" "}
                                    <span class="font-primary">$75</span>
                                  </h3>
                                  <ul class="timer-sec countdown">
                                    <li>
                                      <h6 class="font-primary m-0 days"> </h6>
                                      <span class="font-dark">Days </span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 hours"> </h6>
                                      <span class="font-dark">Hours</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 minutes">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Min</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 seconds">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Sec</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-5 col-lg-12 dash-xl-100">
                              <div class="img-wrraper">
                                <img
                                  class="img-fluid"
                                  src="../assets/images/dashboard-2/image.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <div class="row discount-block">
                            <div class="col-xl-7 col-lg-12 dash-xl-100">
                              <div class="discount-detail">
                                <div>
                                  <h5>
                                    {" "}
                                    Special Discount{" "}
                                    <span class="font-primary f-w-500">
                                      70%OFF
                                    </span>
                                  </h5>
                                  <h3 class="m-auto">
                                    Deal of the Day from{" "}
                                    <span class="font-primary">$75</span>
                                  </h3>
                                  <ul class="timer-sec countdown">
                                    <li>
                                      <h6 class="font-primary m-0 days"> </h6>
                                      <span class="font-dark">Days </span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 hours"> </h6>
                                      <span class="font-dark">Hours</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 minutes">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Min</span>
                                    </li>
                                    <li>
                                      <h6 class="font-primary m-0 seconds">
                                        {" "}
                                      </h6>
                                      <span class="font-dark">Sec</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-5 col-lg-12 dash-xl-100">
                              <div class="img-wrraper">
                                <img
                                  class="img-fluid"
                                  src="../assets/images/dashboard-2/image.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                        {/* <Link
                          class="btn btn-outline-white_color"
                          // href="product-page.html"
                        >
                          Interested?
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="col-xl-4 col-md-6 dash-xl-50 dash-31">
                  <div class="card total-sale">
                    <div class="card-header card-no-border">
                      <div class="media">
                        <div class="media-body">
                          <h5 class="mb-0">Total sale</h5>
                        </div>
                        <div class="icon-box onhover-dropdown">
                          <i data-feather="more-horizontal"></i>
                          <div class="icon-box-show onhover-show-div">
                            <ul>
                              <li>
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
                      <div class="animat-block">
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="sale-main">
                        <div class="sale-left">
                          <h6 class="font-danger">
                            <i class="icon-arrow-down"></i>
                            <span>0.45%</span>
                          </h6>
                          <h5 class="font-primary">680.96</h5>
                        </div>
                        <div class="sale-right">
                          <div id="total-sales-chart"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
