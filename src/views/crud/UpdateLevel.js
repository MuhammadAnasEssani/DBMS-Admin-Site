import React from "react";
import { Form, Select } from "antd";

export default function UpdateLevel() {
  const { Option } = Select;
  const handleLevel = () => {};
  return (
    <div className=" col-lg-11">
      <Form onFinish={handleLevel} initialValues={""}>
        <div className="row">
          <div className="col-lg-4">
            <label className="labeltext">Academic Level: (*)</label>
            <Form.Item
              name="level"
              rules={[{ required: true, message: "Please Select level!" }]}
            >
              <Select
                size={"large"}
                showSearch
                className="FormInput"
                placeholder="Please Select Level"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Masters">Masters</Option>
                <Option value="University">University</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <label className="labeltext">Price: (*)</label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Please Enter Price!" }]}
            >
              <input type="number" className="FormInput" placeholder="100" />
            </Form.Item>
          </div>

          <div className="col-lg-4">
            <Form.Item>
              <button className="btn btn-get-started" style={{ marginTop: 20 }}>
                Update
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
