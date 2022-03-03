import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Popconfirm, Modal } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Select } from "antd";
import { ImBin } from "react-icons/im";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { deleteProductById, editProduct, getProductsByVendor } from "../../config/api/Product";
import { getCategories, updateCategory } from "../../config/api/Categories";
import Notification from "../../component/notification/Notification";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function CategoryList() {
  const [state, setState] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [searchInput, setSearchInput] = useState();
  const [viewVisible, setViewVisible] = useState(false);
  const [editCategoryVisible, setEditCategoryVisible] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState(',');
  const [change, setChange] = useState(false);
  const [changeAgain, setChangeAgain] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const states = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const drawerState = states.DrawerReducer.State;

  const showCategoryEditModal = (category) => {
    // console.log(category)
    // setCategoryEdit(category)
    // console.log(category)
    setCategoryId(category._id)
    setCategoryName(category.name)
    setParentCategory(category.parentId+","+category.parentName)
    setEditCategoryVisible(true)
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const model= {
      _id: categoryId,
      name: categoryName,
      parentId: parentCategory.split(",")[0],
      parentName: parentCategory.split(",")[1]
    }
    // console.log(model)
    try{
      const res = await updateCategory(model);
      if (res.status === 201) {
        Notification("Category Department", "Category Updated Sucessfully", "Success")
        {change ? setChange(false) : setChange(true)}
        setEditCategoryVisible(false)
        return
      }else {
        Notification("Category Department", res.data.message, "Error" )
        return
      }
    }catch(err){
      Notification("Category Department", "Something went wrong", "Error" )
    }
    // console.log(model)
    // console.log(values.parent.split("+")[0])
    // const data = {
    //   _id: categoryEdit._id,
       
    // }
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
    // console.log(state);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  const handleDelete = async(id) => {
    const payload = {
      productId : id
    }
    const res = await deleteProductById({payload});
    // if(res){
    //   console.log(res)
    // }
    if(res.status === 202){
      Notification(
        "Product Department",
        "Product Deleted Sucessfully",
        "Success"
      );
      {changeAgain ? setChangeAgain(false) : setChangeAgain(true)}
      return;
    }
    if (res.status === 400) {
      Notification("Product Department", res.data.message, "Error");
      return;
    }
  };
  const data = [];
  {
    categories.length > 0 &&
      categories.map((category, index) =>
        data.push({
          key: index + 1,
          no: index + 1,
          name: category.name,
          parent: category.parentName,
          action: (
            <div className="d-sm-inline-flex gap-2 actionDiv">
              <span
                className="bi bi-pencil actionBtn"
                onClick={() => showCategoryEditModal(category)}
              ></span>
              {/* <Popconfirm
                title="Are you sure？"
                icon={<CloseCircleTwoTone twoToneColor="Red" />}
                onConfirm={()=> handleDelete(category._id)}
              >
                <Link className="bi bi-trash actionBtn"></Link>
              </Popconfirm> */}
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
      responsive: ["md"],
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Parent Category",
      dataIndex: "parent",
      key: "parent",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const fetchCategories = async () => {
    try{
      const res = await getCategories();
      if (res.status === 200) {
        setCategoryList(res.data.categoryList)
        setCategories(createCategoryList(res.data.categoryList));
        return
      }
      if(res.status === 400) {
        Notification("Category Department", res.data.message, "Error")
        return
      } 
    }catch(err) {
      Notification("Category Department", "Something went wrong", "Error")
    }
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      // console.log(category.children.length)
      // console.log(category)
      options.push({ _id: category._id, name: category.name, parentName: category.parentName, parentId: category.parentId  });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [change]);
  // console.log(categoryList)
  // console.log(categories)
  return (
    <>
      <Modal
        title="Edit Product"
        centered
        visible={editCategoryVisible}
        onOk={() => 
          {setEditCategoryVisible(false)
          setCategoryEdit(null)
          {change ? setChange(false) : setChange(true)}
        }
        }
        onCancel={() => 
          {setEditCategoryVisible(false)
          setCategoryEdit(null)
          {change ? setChange(false) : setChange(true)}
        }
        }
        width={1000}
      >
        {/* {categoryEdit != null && ( */}
          <>
          <form onSubmit={handleEditCategory} >
                <div className="row">
                  <div className="col-lg-5">
                    <label className="labeltext">Category Name: (*)</label>
                    {/* <Form.Item name="name"> */}
                      <input type="text" required className="FormInput" value={categoryName}
                      placeholder='Product Name'
                      onChange={(e) => setCategoryName(e.target.value)} />
                    {/* </Form.Item> */}
                  </div>

                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Parent: (*)</label>
                    {/* <Form.Item name="parent"> */}
                      <select
                        className="FormInput"
                        name="cars"
                        id="cars"
                        value={parentCategory}
                      onChange={(e) => setParentCategory(e.target.value)}
                      >
                        <option value="">{parentCategory.split(",")[1]}</option>
                        {createCategoryList(categoryList).map((option) => (
                          <option key={option._id} value={option._id+","+option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-12">
                    {/* <Form.Item> */}
                    {loading ? <button
                      style={{ border: "none" }}
                      type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <>
                        <Spin indicator={antIcon} />
                      </>
                    </button> : <button
                      style={{ border: "none" }}
                      type="submit"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Edit Category</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>}
                    {/* </Form.Item> */}
                  </div>
                </div>
              </form>
          </>
        {/* )} */}
      </Modal>
      <section id="List" className="hero d-flex align-items-center">
        <div className="container ">
          <div
            className={
              drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"
            }
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
    </>
  );
}
