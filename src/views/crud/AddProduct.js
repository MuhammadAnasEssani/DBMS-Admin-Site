import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
// import { Upload, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import {Select, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Notification from "../../component/notification/Notification";
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import {ImBin} from "react-icons/im";
import {getCategories} from "../../config/api/Categories";
import {useHistory} from "react-router-dom";
import {getOffersByVendor} from "../../config/api/Offer";
import {getColours} from "../../config/api/Colour";
import {getSizes} from "../../config/api/Size";
import {addProduct} from "../../config/api/Product";

const { Option } = Select;


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AddProduct() {
  // const { Option } = Select;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productOffer, setProductOffer] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [productDiscount, setProductDiscount] = useState();
  const [productType, setProductType] = useState(10);
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
  const [colour, setColour] = useState([]);
  const [size, setSize] = useState([]);


  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(size);
    // console.log(productCategory);
    // console.log(JSON.stringify(productImage));
    var form = new FormData();
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDesc);
    form.append("quantity", productQuantity);
    if(productDiscount){
      form.append("discount", productDiscount);
    }
    form.append("type", productType);
    form.append("colours", JSON.stringify(colour));
    form.append("sizes", JSON.stringify(size));
    form.append("categories", JSON.stringify(productCategory));
    form.append("offers", JSON.stringify(productOffer));
    // form.append("product_pictures", JSON.stringify(productImage));

    //   for (var i in data) {
    //     createFormData(formData, key + '[' + i + ']', data[i]);
    // }
    // for (let Colour of colour) {
    //   form.append("colours", Colour);
    // }
    // for (let Size of size) {
    //   form.append("sizes", Size);
    // }
    // for (let category of productCategory) {
    //   form.append("categories", category);
    // }
    // for (let offer of productOffer) {
    //   form.append("offers", offer);
    // }
    for (let pic of productImage) {
      form.append("product_pictures", pic);
    }
    // // console.log(colours);
    // // console.log(sizes);
    try {
      const res = await addProduct(form);
      if (res.status === 201) {
        Notification("Product Department", res.data.message, "Success");
        setProductName("");
        setProductDesc("");
        setProductCategory([]);
        setProductOffer([]);
        setProductDiscount(undefined);
        setProductPrice("");
        setProductQuantity("");
        setProductType(10);
        setProductImage([]);
        setDisplayProductImage([]);
        setColour([]);
        setSize([]);
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
        setCategories(res.data.data);
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
        setOffers(res.data.data);
      } else {
        Notification("Offers", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Offers", "Something went wrong", "Error");
    }
  };
  const fetchColours = async () => {
    try {
      const res = await getColours();
      if (res.status === 200) {
        setColours(res.data.data);
      } else {
        Notification("Colours", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Colours", "Something went wrong", "Error");
    }
  };
  const fetchSizes = async () => {
    try {
      const res = await getSizes();
      if (res.status === 200) {
        setSizes(res.data.data);
      } else {
        Notification("Sizes", res.data.message, "Error");
      }
    } catch (err) {
      Notification("Sizes", "Something went wrong", "Error");
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
    fetchColours();
    fetchSizes();
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
                      <input
                          type="text"
                          required
                          className="FormInput"
                          value={productName}
                          placeholder="Product Name"
                          onChange={(e) => setProductName(e.target.value)}
                      />
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
                      <Select
                          mode="multiple"
                          allowClear
                          className="FormInput"
                          placeholder="Select Category"
                          name="cars"
                          id="cars"
                          value={productCategory}
                          required
                          // value={productCategory}
                          onChange={(value) => {
                            setProductCategory(value)}}
                      >
                        {categories.map((option) => (
                            <Option key={option.id} value={option.id}>
                              {option.name}
                            </Option>
                        ))}
                      </Select>

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
                      <Select
                          mode="multiple"
                          className="FormInput"
                          name="cars"
                          id="cars"
                          placeholder="Select Offer"
                          value={productOffer}

                          // value={productOffer}
                          onChange={(value) => setProductOffer(value)}
                      >
                        {offers.map((option) => (
                            <Option key={option.id} value={option.id}>
                              {option.title}
                            </Option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-lg-6">
                      <label className="labeltext">Colours</label>
                      <Select
                          mode="multiple"
                          allowClear
                          className="FormInput"
                          placeholder="Select Colour"
                          name="cars"
                          id="cars"
                          required
                          value={colour}
                          onChange={(value) => setColour(value)}
                      >
                        {colours.map((option) => (
                            <Option key={option.id} value={option.id}>
                              {option.colour}
                            </Option>
                        ))}
                      </Select>

                    </div>
                    <div className="col-lg-6">
                      <label className="labeltext">Size</label>
                      <Select
                          mode="multiple"
                          allowClear
                          className="FormInput"
                          placeholder="Select Size"
                          name="cars"
                          id="cars"
                          required
                          value={size}
                          onChange={(value) => setSize(value)}
                      >
                        {sizes.map((option) => (
                            <Option key={option.id} value={option.id}>
                              {option.size}
                            </Option>
                        ))}
                      </Select>

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
                      {/* <CKEditor editor={ClassicEditor} data={productDesc} onChange={handleDescription} /> */}
                      <textarea
                          type="text"
                          required
                          className="FormInput"
                          value={productDesc}
                          placeholder="Product Description"
                          onChange={(e) => setProductDesc(e.target.value)}
                          style={{ height: "110px" }}
                      />
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
                          checked={productType == 20 ? "checked" : null}
                          onChange={() => {
                            productType == 10
                                ? setProductType(20)
                                : setProductType(10);
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
