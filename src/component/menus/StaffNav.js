import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function StaffNav() {
  const iconsSize = 18;
  const subMenuIconSize = 14;
  const { SubMenu } = Menu;

  const [collapse, setcollapse] = useState(false);

  const rootSubmenuKeys = ["Writers", "Notifications"];
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={[""]}
      mode="inline"
      inlineCollapsed={collapse}
      style={{}}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      <Menu.Item
        key="1"
        icon={
          <span className="bi bi-grid" style={{ fontSize: iconsSize }}></span>
        }
      >
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={
          <span className="bi bi-person" style={{ fontSize: iconsSize }}></span>
        }
      >
        <Link to="/student-list"> Students</Link>
      </Menu.Item>

      <SubMenu
        key="Writers"
        icon={
          <span className="bi bi-people" style={{ fontSize: iconsSize }}></span>
        }
        title="Writers"
      >
        <Menu.Item
          key="3"
          icon={
            <span
              className="bi bi-plus-circle"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/add-writer">Add</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={
            <span
              className="bi bi-list-ol"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/writer-list">List</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="Notifications"
        icon={
          <span className="bi bi-bell" style={{ fontSize: iconsSize }}></span>
        }
        title="Notifications"
      >
        <Menu.Item
          key="6"
          icon={
            <span
              className="bi bi-envelope"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link>Send</Link>
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={
            <span
              className="bi bi-list-ol"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link>List</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        key="5"
        icon={
          <span className="bi bi-book" style={{ fontSize: iconsSize }}></span>
        }
      >
        <Link to="/academic-levels">Academic levels</Link>
      </Menu.Item>

      <Menu.Item
        key="6"
        icon={
          <span
            className="bi bi-journal-text"
            style={{ fontSize: iconsSize }}
          ></span>
        }
      >
        <Link to="/orders">Orders</Link>
      </Menu.Item>
    </Menu>
  );
}
