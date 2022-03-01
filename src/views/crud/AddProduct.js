import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Select } from "antd";
// import { Upload, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Notification from "../../component/notification/Notification";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { ImBin } from "react-icons/im";
import { addProduct } from "../../config/api/Product";
import { getCategories } from "../../config/api/Categories";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productImage, setProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [categories, setCategories] = useState([]);
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    var form = new FormData();
    form.append("name", values.name);
    form.append("price", values.price);
    form.append("description", values.description);
    form.append("quantity", values.quantity);
    form.append("category", values.category);
    for (let pic of productImage) {
      console.log(pic)
      form.append("productPicture", pic);
    }
    const res = await addProduct(form);
    if (res.status === 201) {
      Notification("Product Department", "Product Added Sucessfully", "Success")
      setProductImage([])
      return
    }
    if (res.status === 400) {
      Notification("Product Department", res.data.message, "Error" )
      return
    }
  };
  const handleProductImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
  };
  const fetchCategories = async () => {
    const res = await getCategories();
    if (res.status === 200) {
      setCategories(res.data.categoryList);
    }
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, []);
  useEffect(() => {}, [change]);
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Writers"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Enter Writer Information</h1>

              <form onSubmit={handleAddProduct}>
                <div className="row">
                  <div className="col-lg-5">
                    <label className="labeltext">Product Name: (*)</label>
                    <Form.Item name="name">
                      <input type="text" required className="FormInput" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Product Price: (*)</label>
                    <Form.Item name="price">
                      <input type="number" required className="FormInput" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-5">
                    <label className="labeltext">Product Quantity: (*)</label>
                    <Form.Item name="quantity">
                      <input type="number" required className="FormInput" />
                    </Form.Item>
                  </div>

                  {/* <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Academic Level: (*)</label>
                    <Form.Item name="academic-level">
                      <input type="text" className="FormInput" />
                    </Form.Item>
                  </div> */}

                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Category : (*)</label>
                    <Form.Item name="category">
                      <select
                        className="FormInput"
                        name="cars"
                        id="cars"
                        required
                      >
                        <option value="">None</option>
                        {createCategoryList(categories).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {/* <Select
                        size={"large"}
                        mode="multiple"
                        showSearch
                        className="FormInput"
                        placeholder="Select a categories"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        required
                      >
                        <Option value="Essay">Essay</Option>
                        <Option value="Critical Thinking">
                          Critical Thinking
                        </Option>
                        <Option value="Creative Writing">
                          Creative Writing
                        </Option>
                      </Select> */}
                    </Form.Item>
                  </div>
                  <div className="col-lg-11">
                    <label className="labeltext">
                      Product Description: (*)
                    </label>
                    <Form.Item name="description">
                      <textarea type="text" required className="FormInput" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-5">
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
                                productImage.splice(index,1);
                                {
                                  change ? setChange(false) : setChange(true);
                                }
                                // console.log(productImage);
                              }}
                            />
                          </div>
                        ))
                      : null}
                    <Form.Item>
                      <input
                        required
                        type="file"
                        name="productImage"
                        onChange={handleProductImage}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
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
                      <span>Sign in</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
