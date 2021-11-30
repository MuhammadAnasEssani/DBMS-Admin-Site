import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Select } from "antd";
// import { Upload, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Notification from "../../component/notification/Notification";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import { ImBin } from "react-icons/im";
import { addProduct } from "../../config/api/Product";
import { getCategories } from "../../config/api/Categories";

export default function AddProduct() {
  const { Option } = Select;

  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productImage, setProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [categories, setCategories] = useState([]);
  //   const [previewTitle, setPreviewTitle] = useState("");
  //   const [previewImage, setPreviewImage] = useState("");
  //   const [previewVisible, setPreviewVisible] = useState(false);
  // console.log(fileList)

  //   function getBase64(file) {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //     });
  //   }
  //   const handleCancel = () => setPreviewVisible(false);

  //   const handlePreview = async (file) => {
  //     if (!file.url && !file.preview) {
  //       file.preview = await getBase64(file.originFileObj);
  //     }
  //     setPreviewTitle(file.url.substring(file.url.lastIndexOf('/') + 1));
  //     setPreviewImage(file.preview);
  //     setPreviewVisible(true);
  //   };
  //   const handleChange = ({ filelist }) => {
  //     console.log({ filelist });
  //     setFileList([{ filelist }]);
  //     console.log(fileList);
  //   };

  //   const uploadButton = (
  //     <div>
  //       <PlusOutlined />
  //       <div style={{ marginTop: 8 }}>Upload</div>
  //     </div>
  //   );

  const handleAddCategory = async (values, e) => {
    // var form = new FormData();
    // form.append("name", values.name);
    // form.append("price", values.price);
    // form.append("description", values.description);
    // form.append("quantity", values.quantity);
    // form.append("category", values.category);
    // for (let pic of productImage) {
    //   form.append("productPicture", pic);
    // }
    // const res = await addProduct(form);
    // if (res.status === 201) {
    //   Notification("Product Department", "Product Added Sucessfully", "Success")
    //   return
    // }
    // if (res.status === 400) {
    //   Notification("Product Department", res.data.message, "Error" )
    //   return
    // }
  };
  // const handleProductImage = (e) => {
  //   setProductImage([...productImage, e.target.files[0]]);
  // };
  // const fetchCategories = async () => {
  //   const res = await getCategories();
  //   if (res.status === 200) {
  //     setCategories(res.data.categoryList);
  //   }
  // };

  // const createCategoryList = (categories, options = []) => {
  //   for (let category of categories) {
  //     options.push({ value: category._id, name: category.name });
  //     if (category.children.length > 0) {
  //       createCategoryList(category.children, options);
  //     }
  //   }
  //   return options;
  // };
  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  // useEffect(() => {}, [change]);
  // console.log(categories)
  // console.log(productImage);
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

              <Form onFinish={handleAddCategory} initialValues={""}>
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
                        {/* {createCategoryList(categories).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))} */}
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
                    {/* {productImage.length > 0
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
                                productImage.splice(index);
                                {
                                  change ? setChange(false) : setChange(true);
                                }
                              }}
                            />
                          </div>
                        ))
                      : null} */}
                    <Form.Item>
                      <input
                        required
                        type="file"
                        name="productImage"
                        // onChange={handleProductImage}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12">
                    <Form.Item>
                      <button className="btn btn-get-started">Submit</button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
