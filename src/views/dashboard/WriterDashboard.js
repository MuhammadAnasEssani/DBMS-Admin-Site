import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import Notification from "../../component/notification/Notification";
import {getOrdersByVendor,} from "../../config/api/OrdersAPI";
import {Skeleton} from "antd";
import {getProductsByVendor} from "../../config/api/Product";
// import "../../chart/chartjs/chart.min.js"
// import "../../chart/chartist/chartist.js"
// import "../../chart/chartist/chartist-plugin-tooltip.js"
// import "../../chart/apex-chart/apex-chart.js"
// import "../../chart/apex-chart/stock-prices.js"
export default function WriterDashboard() {
  const state = useSelector((state) => state);
  // const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;
  const auth = useSelector((state) => state.auth);

  const history = useHistory();
  const [recentLoading, setRecentLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const fetchRecentOrders = async () => {
    setRecentLoading(true);
    try {
      const res = await getOrdersByVendor();
      if (res.status == 200) {
        setRecentOrders(res.data.data);
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
  const fetchRecentProducts = async () => {
    setProductLoading(true);
    try {
      const res = await getProductsByVendor();
      if (res.status == 200) {
        setRecentProducts(res.data.data);
        setProductLoading(false);
        return;
      } else {
        Notification("Recent Products", res.data.message, "Error");
        setProductLoading(false);
        return;
      }
    } catch (err) {
      Notification("Recent Products", "Something went wrong", "Error");
      setProductLoading(false);
    }
  };
  const fetchPendingOrders = async () => {
    setPendingLoading(true);
    try {
      const res = await getProductsByVendor();
      if (res.status == 200) {
        setPendingOrders(res.data.data);
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
    fetchRecentProducts();
    fetchPendingOrders();
  }, []);
  // console.log(recentProducts)
  const theme = useTheme();
  return (
    // <Page title="General: E-commerce">
    //   <section
    //     id="hero"
    //     className="hero d-flex align-items-center"
    //     style={{ paddingBottom: "40px" }}
    //   >
    //     <div style={{ width: "100%" }}>
    //       <div
    //         className={
    //           drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"
    //         }
    //       >
    //         <div class="page-body">
    //           <div class="container-fluid ecommerce-dash">
    //             <Grid container spacing={3}>

    //               <Grid item xs={12} md={4}>
    //                 <EcommerceWidgetSummary
    //                   title="Product Sold"
    //                   percent={2.6}
    //                   total={765}
    //                   chartColor={theme.palette.primary.main}
    //                   chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
    //                 />
    //               </Grid>

    //               <Grid item xs={12} md={4}>
    //                 <EcommerceWidgetSummary
    //                   title="Total Balance"
    //                   percent={-0.1}
    //                   total={18765}
    //                   chartColor={theme.palette.chart.green[0]}
    //                   chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
    //                 />
    //               </Grid>

    //               <Grid item xs={12} md={4}>
    //                 <EcommerceWidgetSummary
    //                   title="Sales Profit"
    //                   percent={0.6}
    //                   total={4876}
    //                   chartColor={theme.palette.chart.red[0]}
    //                   chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
    //                 />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={4}>
    //                 <EcommerceSaleByGender />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={8}>
    //                 <EcommerceYearlySales />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={8}>
    //                 <EcommerceSalesOverview />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={4}>
    //                 <EcommerceCurrentBalance />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={8}>
    //                 <EcommerceBestSalesman />
    //               </Grid>

    //               <Grid item xs={12} md={6} lg={4}>
    //                 <EcommerceLatestProducts />
    //               </Grid>
    //             </Grid>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </Page>
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
                          {pendingOrders.length > 0 && formatDate(pendingOrders[0].created_at)} -{" "}
                          {pendingOrders.length > 1 && formatDate(
                            pendingOrders[pendingOrders.length - 1].created_at
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
                                recentOrders.slice(0, 4).map((order) => (
                                  <tr>
                                    <td class="img-content-box">
                                      <h6>
                                        {order.user.first_name}{" "}
                                        {order.user.last_name}
                                      </h6>
                                    </td>
                                    <td class="img-content-box">
                                      <h6>{order.user.email}</h6>
                                    </td>
                                    <td>
                                      <h6>
                                        {order.order_items.reduce(
                                            (totalPrice, data) => {
                                              return (
                                                  totalPrice + data.payable_price * data.purchased_qty
                                              );
                                            },
                                            0
                                        )}
                                        </h6>
                                      <span>{order.payment_type}</span>
                                    </td>
                                    <td>
                                      <h6>{order.order_items.length}</h6>
                                    </td>
                                    <td>
                                      <div class="badge badge-light-primary">
                                        {
                                          order.order_status
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
                  {productLoading ? (
                    <Skeleton.Input className={"recentLoader"} active={true} />
                  ) : (
                    <div class="card ongoing-project recent-orders">
                      <div class="card-header card-no-border">
                        <div class="media media-dashboard">
                          <div class="media-body">
                            <h5 class="mb-0">Recent Products</h5>
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
                                  <span>Product Detail</span>
                                </th>
                                {/*<th>*/}
                                {/*  {" "}*/}
                                {/*  <span>Product Category</span>*/}
                                {/*</th>*/}
                                <th>
                                  {" "}
                                  <span>Product Price</span>
                                </th>
                                <th>
                                  {" "}
                                  <span>Status</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentProducts.length > 0 &&
                                recentProducts.map((product) => (
                                  // <></>
                                  <tr>
                                    <td
                                      style={{
                                        maxWidth: "197px",
                                      }}
                                    >
                                      <div class="media">
                                        <div class="square-box me-2">
                                          <img
                                            class="img-fluid b-r-5"
                                            src={
                                              `http://localhost:3333/uploads/product-pictures/${product.pictures[0].avatar}`
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <div class="media-body ps-2">
                                          <div
                                            class="avatar-details"
                                            style={{ textAlign: "left" }}
                                          >
                                            <Link>
                                              <h6>{product.name}</h6>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    {/*<td*/}
                                    {/*  class="img-content-box"*/}
                                    {/*  style={{ textAlign: "left" }}*/}
                                    {/*>*/}
                                    {/*  <h6>{product.category.name}</h6>*/}
                                    {/*</td>*/}
                                    <td
                                      class="img-content-box"
                                      style={{ textAlign: "left" }}
                                    >
                                      <h6>{product.price}</h6>
                                    </td>
                                    <td>
                                      <div class="badge badge-light-primary">
                                        {product.status == 10 ? "Active" : "InActive"}
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
