import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function StudentNav() {
    const iconsSize = 18;
    const subMenuIconSize = 14;
    const { SubMenu } = Menu;
  
    const [collapse, setcollapse] = useState(false);
  
    const rootSubmenuKeys = ["MyPapers", "Notifications"];
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
            <span className="bi bi-receipt" style={{ fontSize: iconsSize }}></span>
          }
        >
         <Link to="/orders">Orders</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          icon={
            <span className="bi bi-book" style={{ fontSize: iconsSize }}></span>
          }
        >
          <Link to="/my-papers">My Papers</Link>
        </Menu.Item>
  
        {/* <Menu.Item
          key="4"
          icon={
            <span
              className="bi bi-journal-text"
              style={{ fontSize: iconsSize }}
            ></span>
          }
        >
           <Link to="/orders">Orders</Link>
        </Menu.Item> */}
      </Menu>
    )
}
