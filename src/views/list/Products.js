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
import { getCategories } from "../../config/api/Categories";
import Notification from "../../component/notification/Notification";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function MyProducts() {
  const [state, setState] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [searchInput, setSearchInput] = useState();
  const [viewVisible, setViewVisible] = useState(false);
  const [editProductVisible, setEditProductVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [productEdit, setProductEdit] = useState(null);
  const [productImage, setProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [changeAgain, setChangeAgain] = useState(false);
  const [product, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCategoryName, setProductCategoryName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDiscount, setProductDiscount] = useState(0)
  const [productType, setProductType] = useState('normal')
  const [loading, setLoading] = useState(false);
  const states = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const drawerState = states.DrawerReducer.State;
  const history = useHistory();
  const showProductDetailModal = (product) => {
    setProductDetails(product);
    setViewVisible(true);
  };
  const showProductEditModal = (product) => {
    // console.log(product)
    // setProductEdit(product);
    setProductId(product._id)
    setProductName(product.name)
    setProductPrice(product.price)
    setProductDesc(product.description)
    setProductCategory(product.category._id)
    setProductCategoryName(product.category.name)
    setProductQuantity(product.quantity)
    setProductDiscount(product.discount)
    setProductType(product.type)
    setProductImage(product.productPictures)
    setEditProductVisible(true);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    // console.log(productCategory)
    // console.log(values)
    var form = new FormData();
    form.append("_id", productId);
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDesc);
    form.append("quantity", productQuantity);
    form.append("category", productCategory);
    form.append("discount", productDiscount);
    form.append("type", productType);
    if (productImage.length > 0) {
      for (let pic of productImage) {
        form.append("productPicture", pic);
      }
    }
    for (var key of form.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    try{
      const res = await editProduct(form);
      if (res.status === 201) {
        Notification(
          "Product Department",
          "Product Edit Sucessfully",
          "Success"
        );
        setProductImage([]);
        {changeAgain ? setChangeAgain(false) : setChangeAgain(true)}
        setEditProductVisible(false)
        return;
      }else {
        Notification("Product Department", res.data.message, "Error");
        return;
      }
    }catch(err){
      Notification("Product Department", "Something went wrong", "Error");
    }
  };
  const handleProductImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
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
    product.length > 0 &&
      product.map((product, index) =>
        data.push({
          key: index + 1,
          no: index + 1,
          name: product.name,
          price: product.price,
          discount: product.discount,
          quantity: product.quantity,
          type: product.type,
          status: product.status,
          category: product.category.name,
          action: (
            <div className="d-sm-inline-flex gap-2 actionDiv">
              <span
                className="bi bi-eye actionBtn"
                onClick={() => showProductDetailModal(product)}
              ></span>
              <span
                className="bi bi-pencil actionBtn"
                onClick={() => showProductEditModal(product)}
              ></span>
              {/* <Popconfirm
                title="Are you sure？"
                icon={<CloseCircleTwoTone twoToneColor="Red" />}
                onConfirm={()=> handleDelete(product._id)}
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
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Product Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const fetchProducts = async () => {
    try{
      const res = await getProductsByVendor();
      if (res.status === 200) {
        setProducts(res.data.products);
      } else {
        Notification(
          "Product Department",
          res.data.message,
          "Error"
        );
      }
    }catch(err){
      Notification(
        "Product Department",
        "Something went wrong",
        "Error"
      );
    }
  };
  const fetchCategories = async () => {
    try{
      const res = await getCategories();
      if (res.status === 200) {
        setCategories(res.data.categoryList);
      }else{
        Notification(
          "Product Department",
          res.data.message,
          "Error"
        );
      }
    }catch(err){
      Notification(
        "Product Department",
        "Something went wrong",
        "Error"
      );
    }
  };

  const createCategoryList = (categories, options = []) => {
    // options.push({
    //   value: productCategory,
    //   name: productCategoryName,
    // });
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
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
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [changeAgain]);
  return (
    <>
      <Modal
        title="Product"
        centered
        visible={viewVisible}
        onOk={() => setViewVisible(false)}
        onCancel={() => setViewVisible(false)}
        width={1000}
      >
        {productDetails != null && (
          <>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="key">Name</label>
                <p className="value">{productDetails.name}</p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="key">Price</label>
                <p className="value">{productDetails.price}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="key">Quantity</label>
                <p className="value">{productDetails.quantity}</p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="key">Category</label>
                <p className="value">{productDetails.category.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <label className="key">Description</label>
                <p className="value">{productDetails.description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <label className="key">Product Pictures</label>
                <div style={{ display: "flex" }}>
                  {productDetails.productPictures.map((picture) => (
                    <div className="productImgContainer">
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={picture.avatar}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      <Modal
        title="Edit Product"
        centered
        visible={editProductVisible}
        onOk={() => setEditProductVisible(false)}
        onCancel={() => setEditProductVisible(false)}
        width={1000}
      >
        {/* {productEdit != null && ( */}
          <>
            <form
              onSubmit={handleEditProduct}
              // initialValues={{
              //   name: productEdit.name,
              //   price: productEdit.price,
              //   quantity: productEdit.quantity,
              //   description: productEdit.description,
              //   category: productEdit.category._id,
              // }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <label className="labeltext">Product Name: (*)</label>
                  {/* <Form.Item name="name"> */}
                    <input type="text" className="FormInput" value={productName}
                      placeholder='Product Name'
                      onChange={(e) => setProductName(e.target.value)} />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Product Price: (*)</label>
                  {/* <Form.Item name="price"> */}
                    <input type="number" className="FormInput" value={productPrice}
                      placeholder='Product Price'
                      onChange={(e) => setProductPrice(e.target.value)} />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Product Quantity: (*)</label>
                  {/* <Form.Item name="quantity"> */}
                    <input type="number" className="FormInput" value={productQuantity}
                      placeholder='Product Quantity'
                      onChange={(e) => setProductQuantity(e.target.value)} />
                  {/* </Form.Item> */}
                </div>

                {/* <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Academic Level: (*)</label>
                    <Form.Item name="academic-level">
                      <input type="text" className="FormInput" />
                    </Form.Item>
                  </div> */}

                <div className="col-lg-6">
                  <label className="labeltext">Category : (*)</label>
                  {/* <Form.Item name="category"> */}
                    <select
                      className="FormInput"
                      name="cars"
                      id="cars"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    >
                      {/* console.log(productEdit.category._id) */}
                      {/* <option >
                            {productCategoryName}
                          </option> */}
                      {createCategoryList(categories).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                    <label className="labeltext">Product Discount</label>
                    {/* <Form.Item name="quantity"> */}
                    <input type="number" className="FormInput" value={productDiscount}
                      placeholder='Product Discount'
                      onChange={(e) => setProductDiscount(e.target.value)} />
                    {/* </Form.Item> */}
                  </div>
                <div className="col-lg-12">
                  <label className="labeltext">Product Description: (*)</label>
                  {/* <Form.Item name="description"> */}
                    <textarea type="text" required className="FormInput" value={productDesc}
                      placeholder='Product Description'
                      onChange={(e) => setProductDesc(e.target.value)} style={{ height: "110px" }} />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                  <label className="labeltext">Upload Images: (*)</label>
                  {/* <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal
                      visible={previewVisible}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal> */}
                  {/* <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      defaultFileList={[...fileList]}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <br />
                    <br /> */}
                  {/* <Form.Item>
                    <Upload
                      listType="picture"
                      defaultFileList={[...fileList]}
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />} onClick={() => setFileList(fileList)}>Upload</Button>
                    </Upload>
                    </Form.Item> */}
                  {productImage.length > 0
                    ? productImage.map((pic, index) => (
                        <div
                          key={index}
                          style={{
                            height: "35px",
                            margin: "1px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid red",
                          }}
                        >
                          <div>{JSON.stringify(pic.name)}</div>
                          <ImBin
                            id={pic}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // console.log(index)
                              // console.log(pic)
                              productImage.splice(index, 1);
                              {
                                change ? setChange(false) : setChange(true);
                              }
                              // console.log(productImage);
                            }}
                          />
                        </div>
                      ))
                    : null}
                  {/* <Form.Item> */}
                    <input
                      type="file"
                      name="productImage"
                      onChange={handleProductImage}
                    />
                  {/* </Form.Item> */}
                </div>
                <div className="col-lg-6">
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
                      checked = {productType == "featured" ? "checked" : null}
                      id="0.8918393257508421"
                      onChange={() => {
                        productType == "normal" ? setProductType("featured") : setProductType("normal")
                      }}
                    />
                    <label for="0.8918393257508421">
                      <span
                        font-size="14px"
                        color="inherit"
                        class="Typography-sc-1nbqu5-0 grIwdh"
                      >
                        Featured Product
                      </span>
                    </label>
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
                      <span>Edit Product</span>
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
