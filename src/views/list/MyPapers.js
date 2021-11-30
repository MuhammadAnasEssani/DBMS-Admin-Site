import React, { useState } from "react";
import { Table, Button, Space, Input, Popconfirm } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";

export default function MyOrders() {
  const [state, setState] = useState({});
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
  const handleDelete = () => {};
  const data = [
    {
      key: "1",
      no: "1",
      name: "Mike",
      type: "Essay",
      level: "School",
      pages: "8",
      deadline: "12/3/2021",
      status: (
        <p
          style={{
            backgroundColor: "#f5f9fc",
            width: "80%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          Not Assign
        </p>
      ),
      price: "23$",
    },
    {
      key: "2",
      no: "2",
      name: "John",
      type: "Paper",
      level: "College",
      pages: "11",
      deadline: "12/3/2021",
      status: (
        <p
          style={{
            backgroundColor: "#f5f9fc",
            width: "80%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          Not Assign
        </p>
      ),
      price: "21$",
    },
    {
      key: "3",
      no: "3",
      name: "Smith",
      type: "Assignment",
      level: "University",
      pages: "12",
      deadline: "12/3/2021",
      status: (
        <p
          style={{
            backgroundColor: "#f5f9fc",
            width: "80%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          Not Assign
        </p>
      ),
      price: "20$",
    },
    {
      key: "4",
      no: "4",
      name: "Mike",
      type: "Essay",
      level: "School",
      pages: "15",
      deadline: "12/3/2021",
      status: (
        <p
          style={{
            backgroundColor: "#f5f9fc",
            width: "80%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          Not Assign
        </p>
      ),
      price: "23$",
    },
    {
      key: "5",
      no: "5",
      name: "Doe",
      type: "Essay",
      level: "Masters",
      pages: "10",
      deadline: "12/3/2021",
      status: (
        <p
          style={{
            backgroundColor: "#f5f9fc",
            width: "80%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          Not Assign
        </p>
      ),
      price: "23$",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      responsive: ["md"],
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Paper Type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Academic Level",
      dataIndex: "level",
      key: "level",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      responsive: ["md"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <div className="d-sm-inline-flex gap-2 actionDiv">
          <Link
            className="bi bi-eye actionBtn"
            to={`/order-details/${record.key}`}
            onClick={() => console.log(record.key)}
          ></Link>
          <Popconfirm
            title="Are you sure？"
            icon={<CloseCircleTwoTone twoToneColor="Red" />}
            onConfirm={handleDelete}
          >
            <Link className="bi bi-trash actionBtn"></Link>
          </Popconfirm>
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
            title={"My Papers"}
            subicon={"bi bi-diagram-2"}
            subtitle={"List"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div
              className=" col-lg-11 dashboardSections itempadding"
              style={{
                padding: "30px 20px 30px 20px",
                marginBottom: 40,
                overflowX: "auto",
              }}
            >
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
