import React, { useState } from "react";
import { Form } from "antd";
import { useSelector } from "react-redux";

export default function AdminForm(props) {
  const { onFinish } = props;
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;

  const [Disabled, setdiabled] = useState(false);

  return (
    <Form onFinish={onFinish} initialValues={""}>
      <div className="row">
        <div className="col-lg-5">
          <label className="labeltext">Name: (*)</label>
          <Form.Item name="name">
            <input
              type="text"
              className="FormInput"
              disabled={Disabled}
              defaultValue={authState.name}
            />
          </Form.Item>
        </div>
        <div className="col-lg-5 offset-xl-1">
          <label className="labeltext">Email: (*)</label>
          <Form.Item name="email">
            <input
              type="text"
              className="FormInput"
              disabled
              defaultValue={authState.email}
              value={authState.email}
            />
          </Form.Item>
        </div>
        <div className="col-lg-5">
          <label className="labeltext">Phone: (*)</label>
          <Form.Item name="phone">
            <input
              type="number"
              className="FormInput"
              disabled={Disabled}
              defaultValue={authState.phone}
            />
          </Form.Item>
        </div>

        <div className="col-lg-5 offset-xl-1">
          <label className="labeltext">Upload Image</label>
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
