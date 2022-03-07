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
import { getOffersByVendor } from "../../config/api/Offer";

export default function AddProduct() {
  const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productOffer, setProductOffer] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDiscount, setProductDiscount] = useState(0)
  const [productType, setProductType] = useState('normal')
  const [productImage, setProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    var form = new FormData();
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDesc);
    form.append("quantity", productQuantity);
    form.append("category", productCategory);
    form.append("discount", productDiscount);
    form.append("offer", productOffer);
    form.append("type", productType);
    for (let pic of productImage) {
      form.append("productPicture", pic);
    }
    try {
      const res = await addProduct(form);
      if (res.status === 201) {
        Notification("Product Department", res.data.message, "Success")
        setProductName("")
        setProductDesc("")
        setProductCategory("")
        setProductOffer("")
        setProductDiscount(0)
        setProductPrice("")
        setProductQuantity("")
        setProductType("normal")
        setProductImage([])
        return
      } else {
        Notification("Product Department", res.data.message, "Error")
        return
      }
    } catch (err) {
      // console.log(err)
      Notification("Product Department", "Something went wrong", "Error")
    }
  };
  const handleProductImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
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
  const fetchOffers = async () => {
    try{
      const res = await getOffersByVendor();
      if (res.status === 200) {
        setOffers(res.data.offers);
      }else{
        Notification(
          "Offers",
          res.data.message,
          "Error"
        );
      }
    }catch(err){
      Notification(
        "Offers",
        "Something went wrong",
        "Error"
      );
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
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
    fetchCategories();
    fetchOffers();
  }, []);
  console.log(offers)

  useEffect(() => { }, [change]);
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
                  <div className="col-lg-6">
                    <label className="labeltext">Product Name: (*)</label>
                    {/* <Form.Item name="name"> */}
                    <input type="text" required className="FormInput" value={productName}
                      placeholder='Product Name'
                      onChange={(e) => setProductName(e.target.value)} />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Product Price: (*)</label>
                    {/* <Form.Item name="price"> */}
                    <input type="number" required className="FormInput" value={productPrice}
                      placeholder='Product Price'
                      onChange={(e) => setProductPrice(e.target.value)} />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Product Quantity: (*)</label>
                    {/* <Form.Item name="quantity"> */}
                    <input type="number" required className="FormInput" value={productQuantity}
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
                      required
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
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
                  <div className="col-lg-6">
                    <label className="labeltext">Offer)</label>
                    {/* <Form.Item name="category"> */}
                    <select
                      className="FormInput"
                      name="cars"
                      id="cars"
                      value={productOffer}
                      onChange={(e) => setProductOffer(e.target.value)}
                    >
                      <option value="">None</option>
                      {offers.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                    </div>
                  <div className="col-lg-12">
                    <label className="labeltext">
                      Product Description: (*)
                    </label>
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
                    <input
                      required
                      type="file"
                      name="productImage"
                      onChange={handleProductImage}
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="checkbox"
                      name="Maccs"
                      color="secondary"
                      size="18"
                      class="CheckBox__SyledCheckBox-sc-1go6jlo-0 gOojgn"
                      value="Maccs"
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
                      <span>Add Product</span>
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
