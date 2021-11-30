import React from "react";
import { notification } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const Notification = (message, description, type) => {
  if (type === "Success") {
    const config = {
      placement: "topRight",
      onClick: () => {},
    };
    notification.open({
      ...config,
      message: (
        <div>
          <CheckCircleTwoTone twoToneColor="#52c41a" /> {message}
        </div>
      ),
      description: description,
    });
  } else {
    const config = {
      placement: "topRight",
      onClick: () => {},
    };
    notification.open({
      ...config,
      message: (
        <div>
          <CloseCircleTwoTone twoToneColor="Red" /> {message}
        </div>
      ),
      description: description,
    });
  }
};

export default Notification;
