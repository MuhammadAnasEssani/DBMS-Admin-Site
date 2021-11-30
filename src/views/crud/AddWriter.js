import React from "react";
import { useSelector } from "react-redux";
import { Form, Select } from "antd";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";

export default function AddWriter() {
  const { Option } = Select;

  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;

  const handleAddWriter = (values) => {
    console.log(values);
  };
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Writers"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Enter Writer Information</h1>

              <Form onFinish={handleAddWriter} initialValues={""}>
                <div className="row">
                  <div className="col-lg-5">
                    <label className="labeltext">Name: (*)</label>
                    <Form.Item name="name">
                      <input type="text" className="FormInput" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Email: (*)</label>
                    <Form.Item name="email">
                      <input type="text" className="FormInput" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-5">
                    <label className="labeltext">Phone: (*)</label>
                    <Form.Item name="phone">
                      <input type="number" className="FormInput" />
                    </Form.Item>
                  </div>

                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Academic Level: (*)</label>
                    <Form.Item name="academic-level">
                      <input type="text" className="FormInput" />
                    </Form.Item>
                  </div>
                 
                  <div className="col-lg-5">
                    <label className="labeltext">Categories : (*)</label>
                    <Form.Item name="categories">
                      <Select
                        size={"large"}
                        mode="multiple"
                        showSearch
                        className="FormInput"
                        placeholder="Select a categories"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Essay">Essay</Option>
                        <Option value="Critical Thinking">
                          Critical Thinking
                        </Option>
                        <Option value="Creative Writing">
                          Creative Writing
                        </Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Password: (*)</label>
                    <Form.Item name="password">
                      <input type="password" className="FormInput" />
                    </Form.Item>
                  </div>

                  <div className="col-lg-12">
                    <Form.Item>
                      <button className="btn btn-get-started">Submit</button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
