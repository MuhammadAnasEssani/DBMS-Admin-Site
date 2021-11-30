import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";

export default function StaffList() {
  const [state, setState] = useState({});
  const [searchInput, setSearchInput] = useState();

  const states = useSelector((state) => state);
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
            style={{ width: 90, color: "#fff", display:"flex" }}

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
      image: "assets/img/Student.png",
      name: "Mike",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "2",
      image: "assets/img/Student.png",
      name: "John",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "3",
      image: "assets/img/Student.png",
      name: "Mike",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "4",
      image: "assets/img/Student.png",
      name: "John",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "5",
      image: "assets/img/Student.png",
      name: "Mike",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "6",
      image: "assets/img/Student.png",
      name: "John",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "7",
      image: "assets/img/Student.png",
      name: "Mike",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "8",
      image: "assets/img/Student.png",
      name: "John",
      email: "john@yahoo.com",
      phone: "03225884654",
    },

    {
      key: "9",
      image: "assets/img/Student.png",
      name: "Mike",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
    {
      key: "10",
      image: "assets/img/Student.png",
      name: "John",
      email: "john@yahoo.com",
      phone: "03225884654",
    },
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      width: 150,
      responsive: ["md"],
      render: (text, record, index) => (
        <div className="actionDiv">
          <img src={record.image} className="ProfileImage" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <div className="d-sm-inline-flex gap-2 actionDiv">
          <Link
            className="bi bi-pencil actionBtn"
            onClick={() => console.log(record.key)}
          ></Link>
          <Link className="bi bi-trash actionBtn"></Link>
        </div>
      ),
    },
  ];
  return (
    <section id="List" className="hero d-flex align-items-center">
      <div className="container ">
        <div className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}>
          <BreadCrumbs
            icon={"bi bi-people"}
            title={"Staff"}
            subicon={"bi bi-diagram-2"}
            subtitle={"List"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div
              className=" col-lg-11 dashboardSections itempadding"
              style={{ padding: "30px 20px 30px 20px" , marginBottom:40}}
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
