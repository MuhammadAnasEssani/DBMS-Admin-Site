import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "antd";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import CounterCard from "../../component/counterCard/CounterCard";
import IntroCard from "../../component/introCard/IntroCard";
import ChangePassword from "../../component/changePassword/ChangePassword";

export default function WriterDashboard() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const drawerState = state.DrawerReducer.State;


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
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}>
          <BreadCrumbs
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
          </div>
          <div className="col-lg-8">
            <div className="row gap-2 itempadding">
              {/* Cart */}
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

              {/* --------------- */}
            </div>
          </div>

          <div className="col-lg-11 marginsTB ">
            <div className="row  itempadding">
              {/* Most Accepted Topics */}
              <div className="col-lg-4 dashboardSections paddingtable marginLR">
                <div className="col-lg-12 ">
                  <h1 style={{ fontSize: 24 }}>Most accepted topics</h1>
                  <p>Total Topics: 10</p>
                  {/* <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>No.</th>
                        <th>Topic</th>
                        <th>Orders</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Artificial Intellegence</td>
                        <td>23 orders</td>
                      </tr>
                    </tbody>
                  </table> */}
                  <Table
                    columns={columnsTopic}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                  />
                </div>
              </div>
              {/* --------------------- */}
              {/* Orders */}
              <div className="col-lg-7 dashboardSections paddingtable">
                <div className="col-lg-12">
                  <h1 style={{ fontSize: 24 }}>Orders</h1>
                  <p>Total Orders : 48</p>
                  <Table
                    columns={columnsOrder}
                    dataSource={dataOrder}
                    pagination={{ pageSize: 5 }}
                  />
                  {/* <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>No.</th>
                        <th>Customer Name</th>
                        <th>Paper Type</th>
                        <th>Deadline</th>
                        <th>Status</th>
                      </tr>

                      <tr>
                        <td>1</td>
                        <td>Mr. Customer</td>
                        <td>Assignment</td>
                        <td>20/11/2021</td>
                        <td>Under Process</td>
                      </tr>
                    </tbody> 
                  </table>*/}
                </div>
              </div>
              {/* ------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
