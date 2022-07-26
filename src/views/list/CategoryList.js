import React, {useEffect, useState} from "react";
import {Button, Input, Modal, Space, Spin, Table} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import {deleteCategory, getCategories, updateCategory} from "../../config/api/Categories";
import Notification from "../../component/notification/Notification";
import Popconfirm from "antd/es/popconfirm";

export default function CategoryList() {
  const [state, setState] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [searchInput, setSearchInput] = useState();
  const [viewVisible, setViewVisible] = useState(false);
  const [editCategoryVisible, setEditCategoryVisible] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
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
    setCategoryId(category.id)
    setCategoryName(category.name)
    setCategoryDesc(category.description)
    setParentCategory(category.parentId+","+category.parentName)
    setEditCategoryVisible(true)
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const model= {
      id: categoryId,
      name: categoryName,
      description: categoryDesc
    }
    // console.log(model)
    try{
      const res = await updateCategory(model);
      if (res.status === 201) {
        Notification("Edit Category Department", res.data.message, "Success")
        {change ? setChange(false) : setChange(true)}
        setEditCategoryVisible(false)
        return
      }else {
        Notification("Edit Category Department", res.data.message, "Error" )
        return
      }
    }catch(err){
      Notification("Edit Category Department", "Something went wrong", "Error" )
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
    try{
      const res = await deleteCategory(id);
      // if(res){
      //   console.log(res)
      // }
      if(res.status === 204){
        Notification(
            "Category Department",
            res.data.message,
            "Success"
        );
        {change ? setChange(false) : setChange(true)}
        return;
      }else{
        Notification("Category Department", res.data.message, "Error");
        return;
      }
    }catch(err){
      Notification("Category Department", "Something went wrong", "Error");

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
          // parent: category.parentName,
          action: (
              <div className="d-sm-inline-flex gap-2 actionDiv">
              <span
                  className="bi bi-pencil actionBtn"
                  onClick={() => showCategoryEditModal(category)}
              ></span>
                <Popconfirm
                    title="Are you sure？"
                    // icon={<CloseCircleTwoTone twoToneColor="Red" />}
                    onConfirm={()=> handleDelete(category.id)}
                >
                  <span className="bi bi-trash actionBtn"></span>
                </Popconfirm>
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
    // {
    //   title: "Parent Category",
    //   dataIndex: "parent",
    //   key: "parent",
    // },

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
        setCategories(res.data.data)
        // console.log(res.data.data)
        // setCategories(createCategoryList(res.data.categoryList));
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
  const createSelectCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      //  console.log(category)
      if (category.children.length > 0) {
        // createCategoryList(category.children, options);
        for (let categoryy of category.children) {
          options.push({ value: categoryy._id, name: categoryy.name });
        }
      }
    }
    return options;
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
  }, [auth.authenticate]);
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
                         placeholder='Category Name'
                         onChange={(e) => setCategoryName(e.target.value)} />
                  {/* </Form.Item> */}
                </div>

                <div className="col-lg-12">
                  <label className="labeltext">
                    Category Description: (*)
                  </label>
                  {/* <CKEditor editor={ClassicEditor} data={productDesc} onChange={handleDescription} /> */}
                  <textarea
                      type="text"
                      required
                      className="FormInput"
                      value={categoryDesc}
                      placeholder="Category Description"
                      onChange={(e) => setCategoryDesc(e.target.value)}
                      style={{ height: "110px" }}
                  />
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
                  title={"Categories"}
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
