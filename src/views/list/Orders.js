import React, { useState, useEffect } from "react";
import { Table, Button, Space, Input, Popconfirm } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { getOrdersByVendor, updateOrderByVendor } from "../../config/api/OrdersAPI";
import Notification from "../../component/notification/Notification";
import Modal from "antd/lib/modal/Modal";

export default function Orders() {
  const [state, setState] = useState({});
  const [searchInput, setSearchInput] = useState();
  const [change, setChange] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const states = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const drawerState = states.DrawerReducer.State;
  const [orders, setOrders] = useState([]);

  // const [Isloading, setIsloading] = useState(true);
  const [OrdersModel, setOrdersModel] = useState([]);
  const filterArray = (array) => {
    const arrays = [];
    array.forEach((item) => {
      // console.log(item)
      if (item.productVendor == auth.user._id) {
        arrays.push(item);
      }
    });
    return arrays;
  };
  const countArray = (array) => {
    const arrays = [];
    array.forEach((item) => {
      // console.log(item)
      if (item.productVendor == auth.user._id) {
        arrays.push(item);
      }
    });
    return arrays.length;
  };

  const HandleorderList = async () => {
    try {
      var res = await getOrdersByVendor();
      if (res.status == 200) {
        setOrders(res.data.orders);
        return;
      } else {
        Notification("Order Department", res.data.message, "Error");
        return;
      }
      // console.log(res);
      // if (res.Message != "Success") {
      //   return;
      // }
      // var resModel = res.Data;
      // setOrdersModel(resModel);
    } catch (err) {
      Notification("Order Department", "Something went wrong", "Error");
    }
  };

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
  // const check = ordered.items.find(function (item) {
  //   return item.itemStatus == false;
  // });
  const showOrderModal = (order) => {
    // console.log(order)
    setOrderId(order._id);
    setOrderItems(filterArray(order.items));
    // setOrderDetails(order);
    setViewVisible(true);
  };
  const updateOrder = async (productId) => {
    // console.log(productId)
    // console.log(orderId)
    // console.log("hello")
    const model = {
      orderId,
      productId
    }
    // console.log(model)
    // console.log("hello")
    try{
      var res = await updateOrderByVendor(model);
      // console.log(res)
      if (res.status == 201) {
        // setOrders(res.data.orders);
        Notification("Order Department", res.data.message, "Error");
        setViewVisible(false)
        {change ? setChange(false): setChange(true)}
        return;
      } else {
        Notification("Order Department", res.data.message, "Error");
        return;
      }
    }catch(err){
      Notification("Order Department", "Something went wrong", "Error");
    }
  };
  // const checkArray = (array) => {

  // }
  const data = [];
  {
    orders.length > 0 &&
      orders.map((order, index) =>
        data.push({
          key: index + 1,
          no: index + 1,
          email: order.user.email,
          items: countArray(order.items),
          status:
            filterArray(order.items).find(function (item) {
              return item.itemStatus == false;
            }) == undefined
              ? "packed"
              : "ordered",
          // changeStatus: (
          //   <label class="switch">
          //     <input
          //       type="checkbox"
          //       onChange={updateOrder}
          //       // disabled = {true}
          //       disabled={
          //         filterArray(order.items).find(function (item) {
          //           return item.itemStatus == false;
          //         }) == undefined
          //           ? true
          //           : false
          //       }
          //     />
          //     <span class="slider"></span>
          //   </label>
          // ),
          action: (
            <div className="d-sm-inline-flex gap-2 actionDiv">
              <span
                className="bi bi-pencil actionBtn"
                onClick={() => showOrderModal(order)}
              ></span>
            </div>
          ),
        })
      );
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      // responsive: ["md"],
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
      // ...getColumnSearchProps("name"),
    },
    {
      title: "No of Items",
      dataIndex: "items",
      key: "items",
      // ...getColumnSearchProps("PaperType"),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   // ...getColumnSearchProps("academiclevel"),
    // },
    // {
    //   title: "Pages",
    //   dataIndex: "pages",
    //   key: "pages",
    // },
    // {
    //   title: "Deadline",
    //   dataIndex: "Deadline",
    //   key: "Deadline",
    //   responsive: ["md"],
    // },
    // {
    //   title: "Price",
    //   dataIndex: "price",
    //   key: "price",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // responsive: ["md"],
    },
    // {
    //   title: "Change Status",
    //   dataIndex: "changeStatus",
    //   key: "changeStatus",
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, [auth.authenticate]);
  useEffect(() => {
    HandleorderList();
  }, [change]);
  // console.log(orders);
  // console.log(orderItems);
  return (
    <>
      <Modal
        title="Order"
        centered
        visible={viewVisible}
        onOk={() => setViewVisible(false)}
        onCancel={() => setViewVisible(false)}
        width={1000}
      >
        <>
          <div
            overflow="hidden"
            cursor="unset"
            class="Box-sc-15jsbqj-0 Card-sc-1rfvr4b-0 bcLZmQ gGoSpj"
          >
            <div class="TableRow-sc-1sslxri-0 fFiRPC">
              <div
                class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dkMTjI hbBxpW pre"
                cursor="unset"
              >
                <div
                  font-size="14px"
                  color="text.muted"
                  class="Typography-sc-1nbqu5-0 chBjUL"
                >
                  Order ID:
                </div>
                <div font-size="14px" class="Typography-sc-1nbqu5-0 gVliBE">
                  621f9d70ac4b69bb1039740b
                </div>
              </div>
              <div
                class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dkMTjI hbBxpW pre"
                cursor="unset"
              >
                <div
                  font-size="14px"
                  color="text.muted"
                  class="Typography-sc-1nbqu5-0 chBjUL"
                >
                  Placed on:
                </div>
                <div font-size="14px" class="Typography-sc-1nbqu5-0 gVliBE">
                  28 Feb, 2022
                </div>
              </div>
              <div
                class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dkMTjI hbBxpW pre"
                cursor="unset"
              >
                <div
                  font-size="14px"
                  color="text.muted"
                  class="Typography-sc-1nbqu5-0 chBjUL"
                >
                  Delivered on:
                </div>
                <div font-size="14px" class="Typography-sc-1nbqu5-0 gVliBE">
                  28 Feb, 2022
                </div>
              </div>
            </div>
            <div cursor="unset" class="Box-sc-15jsbqj-0 kBYRep">
              {orderItems.length > 0
                ? orderItems.map((data) => {
                    return (
                      <div
                        cursor="unset"
                        class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 iZSoIB hrPsZn"
                      >
                        <div
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 gOLWtq eObGgo"
                        >
                          <div
                            size="64"
                            class="AvatarStyle__StyledAvatar-sc-1tfjtzs-0 ffSehd"
                          >
                            <img
                              src={data.productId.productPictures[0].avatar}
                              alt="avatar"
                            />
                          </div>
                          <div cursor="unset" class="Box-sc-15jsbqj-0 jGKOtS">
                            <h6
                              font-weight="600"
                              font-size="14px"
                              class="Typography-sc-1nbqu5-0 JPPAF"
                            >
                              {data.productId.name}
                            </h6>
                            <div
                              font-size="14px"
                              color="text.muted"
                              class="Typography-sc-1nbqu5-0 huVebp"
                            >
                              ${data.payablePrice} x {data.purchasedQty}
                            </div>
                          </div>
                        </div>
                        <div
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 QZPAu hdhYdk"
                        >
                          <div
                            font-size="14px"
                            color="text.muted"
                            class="Typography-sc-1nbqu5-0 huVebp"
                          >
                            {data.itemStatus == false ? "ordered" : "packed"}
                          </div>
                        </div>
                        <div
                          cursor="unset"
                          class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 eRcLlJ eUlVfr"
                        >
                          {/* <button color="primary" class="Button-l2616d-0 XMkZq">
                      <div
                        font-size="14px"
                        class="Typography-sc-1nbqu5-0 gVliBE"
                      >
                        Write a Review
                      </div>
                    </button> */}
                          <label class="switch">
                            <input
                              type="checkbox"
                              onChange={() => updateOrder(data.productId)}
                              // disabled = {true}
                              checked = {data.itemStatus ? "checked" : null}
                              disabled={data.itemStatus ? true : false}
                            />
                            <span class="slider"></span>
                          </label>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </>
      </Modal>
      <section id="List" className="hero d-flex align-items-center">
        <div className="container ">
          <div
            className={
              drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"
            }
          >
            <BreadCrumbs
              icon={"bi bi-journal-text"}
              title={"Orders"}
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
                  // loading={Isloading}
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
