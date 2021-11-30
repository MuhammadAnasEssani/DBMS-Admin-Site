import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import UpdateLevel from "../crud/UpdateLevel";

export default function AcademicLevel() {
  const [state, setState] = useState({});
  const [Update, setUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const states = useSelector((state) => state);
  const authState = states.AuthReducer.user;
  const drawerState = states.DrawerReducer.State;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={
              <SearchOutlined style={{ color: "#fff", alignSelf: "center" }} />
            }
            size="small"
            style={{ width: 90, color: "#fff", display: "flex" }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? "#012970" : "012970", fontSize: 14 }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
    console.log(state);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  const data = [
    {
      key: "1",
      no: "1",
      level: "High School",
      price: "10$",
    },
    {
      key: "2",
      no: "2",
      level: "College",
      price: "14$",
    },
    {
      key: "3",
      no: "3",
      level: "University",
      price: "16$",
    },
    {
      key: "4",
      no: "4",
      level: "Masters",
      price: "18$",
    },
    {
      key: "5",
      no: "5",
      level: "Phd",
      price: "20$",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Academic Level",
      dataIndex: "level",
      key: "level",
      width: 250,
      ...getColumnSearchProps("level"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <div className="d-sm-inline-flex gap-2 actionDiv">
          <Link
            className="bi bi-pencil actionBtn"
            onClick={() => setUpdate(!Update)}
          ></Link>
          <Link className="bi bi-trash actionBtn"></Link>
        </div>
      ),
    },
  ];
  return (
    <section id="List" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-book"}
            title={"Academic level"}
            subicon={"bi bi-diagram-2"}
            subtitle={"List"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div
              className=" col-lg-11 dashboardSections"
              style={{ padding: "30px 30px 30px 30px", marginBottom: 40 }}
            >
              {authState.role === "Administration" && Update ? (
                <>
                  <UpdateLevel />

                  <div
                    className="mt-2 mb-4"
                    style={{ borderBottom: "1px solid #d4d4d4", width: "100%" }}
                  ></div>
                </>
              ) : null}

              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
