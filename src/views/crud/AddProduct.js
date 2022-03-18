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
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AddProduct() {
  const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [productType, setProductType] = useState("normal");
  const [productImage, setProductImage] = useState([]);
  const [displayProductImage, setDisplayProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colourError, setColourError] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleDelete = (i) => {
    setColours(colours.filter((colours, index) => index !== i));
    if (colours.length == 0) {
      setColourError(true);
    }
  };

  const handleAddition = (colour) => {
    setColours([...colours, colour]);
    setColourError(false);
  };

  const handleDrag = (colour, currPos, newPos) => {
    const newColours = colours.slice();

    newColours.splice(currPos, 1);
    newColours.splice(newPos, 0, colour);

    // re-render
    setColours(newColours);
  };

  const handleTagClick = (index) => {
    // console.log("The tag at index " + index + " was clicked");
  };
  const handleDeleteSizes = (i) => {
    setSizes(sizes.filter((sizes, index) => index !== i));
    if (sizes.length == 0) {
      setSizeError(true);
    }
  };

  const handleAdditionSizes = (size) => {
    setSizes([...sizes, size]);
    setSizeError(false);
  };

  const handleDragSizes = (size, currPos, newPos) => {
    const newSizes = sizes.slice();

    newSizes.splice(currPos, 1);
    newSizes.splice(newPos, 0, size);

    // re-render
    setSizes(newSizes);
  };

  const handleTagClickSizes = (index) => {
    // console.log("The tag at index " + index + " was clicked");
  };
  // const selectedTags = (tags) => {
  //   console.log(tags);
  // };
  // const removeTags = (indexToRemove) => {
  //   setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  // };
  // const addTags = (event) => {
  //   if (event.target.value !== "") {
  //     setTags([...tags, event.target.value]);
  //     selectedTags([...tags, event.target.value]);
  //     event.target.value = "";
  //   }
  // };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (colours.length > 0 && sizes.length > 0) {
      setLoading(true);
      console.log(colours);
      console.log(sizes);
      var form = new FormData();
      form.append("name", productName);
      form.append("price", productPrice);
      form.append("description", productDesc);
      form.append("quantity", productQuantity);
      form.append("category", productCategory);
      form.append("discount", productDiscount);
      form.append("offer", productOffer);
      form.append("type", productType);
      form.append("colours", JSON.stringify(colours));
      form.append("sizes", JSON.stringify(sizes));
    //   for (var i in data) {
    //     createFormData(formData, key + '[' + i + ']', data[i]);
    // }
      // for (let colour of colours) {
      //   form.append("colours", colour);
      // }
      // for (let size of sizes) {
      //   form.append("sizes", size);
      // }
      for (let pic of productImage) {
        form.append("productPicture", pic);
      }
      // console.log(colours);
      // console.log(sizes);
      try {
        const res = await addProduct(form);
        if (res.status === 201) {
          Notification("Product Department", res.data.message, "Success");
          setProductName("");
          setProductDesc("");
          setProductCategory("");
          setProductOffer("");
          setProductDiscount(0);
          setProductPrice("");
          setProductQuantity("");
          setProductType("normal");
          setProductImage([]);
          setDisplayProductImage([]);
          setColours([]);
          setSizes([]);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          Notification("Product Department", res.data.message, "Error");
          return;
        }
      } catch (err) {
        setLoading(false);
        Notification("Product Department", "Something went wrong", "Error");
      }
    } else {
      if (colours.length == 0) {
        setColourError(true);
      } else {
        setColourError(false);
      }
      if (sizes.length == 0) {
        setSizeError(true);
      } else {
        setSizeError(false);
      }
    }
  };
  const handleProductImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
    let reader = new FileReader();
    reader.onloadend = () => {
      displayProductImage.push(reader.result);
      change ? setChange(false) : setChange(true);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.status === 200) {
        setCategories(res.data.categoryList);
      } else {
        Notification("Product Department", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Product Department", "Something went wrong", "Error");
    }
  };
  const fetchOffers = async () => {
    try {
      const res = await getOffersByVendor();
      if (res.status === 200) {
        setOffers(res.data.offers);
      } else {
        Notification("Offers", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Offers", "Something went wrong", "Error");
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
  }, [displayProductImage, auth.authenticate]);
  // console.log(displayProductImage);

  useEffect(() => {}, [change]);
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Products"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Add Products</h1>

              <form onSubmit={handleAddProduct}>
                <div className="row">
                  <div className="col-lg-6">
                    <label className="labeltext">Product Name: (*)</label>
                    {/* <Form.Item name="name"> */}
                    <input
                      type="text"
                      required
                      className="FormInput"
                      value={productName}
                      placeholder="Product Name"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Product Price: (*)</label>
                    {/* <Form.Item name="price"> */}
                    <input
                      type="number"
                      required
                      className="FormInput"
                      value={productPrice}
                      placeholder="Product Price"
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Product Quantity: (*)</label>
                    {/* <Form.Item name="quantity"> */}
                    <input
                      type="number"
                      required
                      className="FormInput"
                      value={productQuantity}
                      placeholder="Product Quantity"
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
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
                    <input
                      type="number"
                      className="FormInput"
                      value={productDiscount}
                      placeholder="Product Discount"
                      onChange={(e) => setProductDiscount(e.target.value)}
                    />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Offer</label>
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
                  {/* <div className="tags-input col-lg-6">
                    <ul id="tags">
                      {tags.map((tag, index) => (
                        <li key={index} className="tag">
                          <span className="tag-title">{tag}</span>
                          <span
                            className="tag-close-icon"
                            onClick={() => removeTags(index)}
                          >
                            x
                          </span>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      onKeyUp={(event) =>
                        event.key === "Enter" ? addTags(event) : null
                      }
                      placeholder="Press enter to add tags"
                    />
                  </div> */}
                  <div className="col-lg-12">
                    <label className="labeltext">
                      Product Description: (*)
                    </label>
                    {/* <Form.Item name="description"> */}
                    <textarea
                      type="text"
                      required
                      className="FormInput"
                      value={productDesc}
                      placeholder="Product Description"
                      onChange={(e) => setProductDesc(e.target.value)}
                      style={{ height: "110px" }}
                    />
                    {/* </Form.Item> */}
                  </div>
                  <div className="col-lg-6">
                    <div className="row">
                      <label
                        className="labeltext uploadImage"
                        htmlFor="upload-button"
                      >
                        <div>
                          <span
                            role="img"
                            aria-label="plus"
                            class="anticon anticon-plus"
                          >
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="plus"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <defs>
                                <style></style>
                              </defs>
                              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                              <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                            </svg>
                          </span>
                          <div>Upload</div>
                        </div>
                      </label>
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
                      {displayProductImage.length > 0
                        ? displayProductImage.map((pic, index) => (
                            <div
                              className="col-lg-3 uploadImage"
                              key={index}
                              // style={{
                              //   height: "35px",
                              //   margin: "1px",
                              //   width: "100%",
                              //   display: "flex",
                              //   justifyContent: "space-between",
                              //   alignItems: "center",
                              //   border: "1px solid red",
                              // }}
                              style={{ position: "relative" }}
                            >
                              <img
                                src={pic}
                                alt=""
                                style={{ width: "70px", height: "80px" }}
                              />
                              {/* <div>{JSON.stringify(pic.name)}</div> */}
                              <ImBin
                                id={pic}
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  top: "40%",
                                  left: "43%",
                                  fontSize: "16px",
                                }}
                                onClick={() => {
                                  // console.log(index)
                                  // console.log(pic)
                                  displayProductImage.splice(index, 1);
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
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleProductImage}
                      />
                    </div>
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
                      checked={productType == "featured" ? "checked" : null}
                      onChange={() => {
                        productType == "normal"
                          ? setProductType("featured")
                          : setProductType("normal");
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
                  <div className="col-lg-6">
                    <label className="labeltext">Product Colours</label>
                    {colourError && (
                      <p
                        style={{
                          color: "red",
                          position: "absolute",
                          top: "47px",
                          right: "21px",
                        }}
                      >
                        Colours are required
                      </p>
                    )}
                    <ReactTags
                      required
                      // style={{
                      //   margin: "10px 0px",
                      //   padding: "8px 12px",
                      //   height: "40px",
                      //   fontSize: "inherit",
                      //   color: "rgb(43, 52, 69)",
                      //   borderRadius: "5px",
                      //   border: "1px solid rgb(218, 225, 231)",
                      //   width: "100%",
                      //   outline: "none",
                      //   fontFamily: "inherit",
                      // }}
                      // inputProps={{
                      //   required: true,
                      // }}
                      tags={colours}
                      delimiters={delimiters}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      handleDrag={handleDrag}
                      handleTagClick={handleTagClick}
                      inputFieldPosition="bottom"
                      autocomplete
                    />
                  </div>
                  <div className="col-lg-6">
                    <label className="labeltext">Product Sizes</label>
                    {sizeError && (
                      <p
                        style={{
                          color: "red",
                          position: "absolute",
                          top: "47px",
                          right: "21px",
                        }}
                      >
                        Size are required
                      </p>
                    )}
                    <ReactTags
                      // inputProps={{
                      //   required: true,
                      // }}
                      // style={{
                      //   margin: "10px 0px",
                      //   padding: "8px 12px",
                      //   height: "40px",
                      //   fontSize: "inherit",
                      //   color: "rgb(43, 52, 69)",
                      //   borderRadius: "5px",
                      //   border: "1px solid rgb(218, 225, 231)",
                      //   width: "100%",
                      //   outline: "none",
                      //   fontFamily: "inherit",
                      // }}
                      tags={sizes}
                      delimiters={delimiters}
                      handleDelete={handleDeleteSizes}
                      handleAddition={handleAdditionSizes}
                      handleDrag={handleDragSizes}
                      handleTagClick={handleTagClickSizes}
                      inputFieldPosition="bottom"
                      autocomplete
                    />
                  </div>
                  <div className="col-lg-12">
                    {loading ? (
                      <button
                        style={{ border: "none" }}
                        type="submit"
                        className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                      >
                        <>
                          <Spin indicator={antIcon} />
                        </>
                      </button>
                    ) : (
                      <button
                        style={{ border: "none" }}
                        type="submit"
                        className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                      >
                        <span>Add Product</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    )}
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
