import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Select } from "antd";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";

export default function UpdateOrders() {
  const { Option } = Select;

  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;

  const handleStatus = (values) => {
    console.log(values);
  };
  const model = {
    name: "Doe",
    type: "Essay",
    topic: " lorem ipsumn",
    level: "Masters",
    pages: "10",
    deadline: "12/3/2021",
    status: "Not Assign",
    price: "23$",
  };
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-journal-text"}
            title={"Update Order"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Update"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div
              className=" col-lg-11 dashboardSections itempadding"
              style={{ padding: "50px 40px" }}
            >
              <div className="row ">
                <div className="col-lg-5 formSection marginL">
                  <h1 className="mb-4" style={{ marginLeft: 5 }}>
                    Order Detail
                  </h1>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>Student Name :</th>
                        <td>{model.name}</td>
                      </tr>
                      <tr>
                        <th>Academic Level :</th>
                        <td>{model.level}</td>
                      </tr>
                      <tr>
                        <th>Paper Type :</th>
                        <td>{model.type}</td>
                      </tr>
                      <tr>
                        <th>Paper Topic :</th>
                        <td>{model.topic}</td>
                      </tr>
                      <tr>
                        <th>Pages :</th>
                        <td>{model.pages}</td>
                      </tr>
                      <tr>
                        <th>Deadline :</th>
                        <td>{model.deadline}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <th>Status :</th>
                        <td>{model.status}</td>
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
                <div
                  className="col-lg-5 offset-xl-1 formSection"
                  style={{ backgroundColor: "#fff" }}
                >
                  <h1 className="mb-1">Update Status</h1>

                  <p className="mb-3">
                    Please update status before accept the order!
                  </p>
                  <div>
                    <p>
                      <strong className="labeltext">
                        Paper Description :{" "}
                      </strong>
                      <br />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                  <Form onFinish={handleStatus}>
                    <label className="labeltext">Status: (*)</label>
                    <Form.Item
                      name="status"
                      rules={[
                        {
                          required: true,
                          message: "Select status!",
                        },
                      ]}
                    >
                      <Select
                        size={"large"}
                        showSearch
                        className="FormInput"
                        placeholder="Please update status"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="In progress">In Progress</Option>
                        <Option value="Completed">Completed</Option>
                      </Select>
                    </Form.Item>

                    <label className="labeltext">Upload Document</label>
                    <Form.Item name="document">
                      <input
                        type="file"
                        accept="file/*"
                        placeholder=""
                        className="FormInput"
                        style={{ paddingTop: 5 }}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <button
                        type="submit"
                        className="btn btn-get-started"
                        style={{ padding: "20px 30px", marginTop: "5px" }}
                      >
                        Accept <i className="bi bi-check"></i>
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
