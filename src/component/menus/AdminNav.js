import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function AdminNav() {
  const iconsSize = 18;
  const subMenuIconSize = 14;
  const { SubMenu } = Menu;

  const [collapse, setcollapse] = useState(false);

  const rootSubmenuKeys = ["Staff", "Writers"];
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
     
     <SubMenu
        key="Categories"
        icon={
          <span
            className="bi bi-journal-bookmark"
            style={{ fontSize: iconsSize }}
          ></span>
        }
        title="Categories"
      >
        <Menu.Item
          key="2"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/add-category">Add Category</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/categories">Categories</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="Staff"
        icon={
          <span
            className="bi bi-journal-bookmark"
            style={{ fontSize: iconsSize }}
          ></span>
        }
        title="Staff"
      >
        <Menu.Item
          key="4"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/add-staff">Add Staff</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/staff">Staff</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
          key="6"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/admin-orders">Orders</Link>
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={
            <span
              className="bi bi-save"
              style={{ fontSize: subMenuIconSize }}
            ></span>
          }
        >
          {" "}
          <Link to="/vendors">Vendors</Link>
        </Menu.Item>
    </Menu>
    
  );
}
