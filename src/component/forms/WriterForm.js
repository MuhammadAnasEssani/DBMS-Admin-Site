import React, { useState } from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

export default function WriterForm(props) {
  const { onFinish } = props;
  const { Option } = Select;
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  const [Disabled, setdiabled] = useState(false);

  return (
    <Form onFinish={onFinish} initialValues={""}>
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
          <Form.Item name="academiclevel">
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Essay">Essay</Option>
              <Option value="Critical Thinking">Critical Thinking</Option>
              <Option value="Creative Writing">Creative Writing</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="col-lg-5 offset-xl-1">
          <label className="labeltext">Upload Image: (*)</label>
          <Form.Item
            name="image"
            rules={[
              {
                message: "Upload Image",
              },
            ]}
          >
            <input
              type="file"
              accept="images/*"
              placeholder=""
              className="FormInput"
              style={{ paddingTop: 5 }}
              onChange={(e) => {
                console.log(e.target.files[0]);
              }}
            />
          </Form.Item>
        </div>

        <div className="col-lg-12">
          <Form.Item>
            <button className="btn btn-get-started">Submit</button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
