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
import { addCategory, getCategories } from "../../config/api/Categories";

export default function AddProduct() {
  const { Option } = Select;

  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [productImage, setProductImage] = useState([]);
  const [change, setChange] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleAddCategory = async (values) => {
    const res = await addCategory(values);
    if (res.status === 201) {
      Notification("Category Department", "Category Added Sucessfully", "Success")
      return
    }
    if (res.status === 400) {
      Notification("Category Department", res.data.message, "Error" )
      return
    }
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
                    <label className="labeltext">Category Name: (*)</label>
                    <Form.Item name="name">
                      <input type="text" required className="FormInput" />
                    </Form.Item>
                  </div>

                  <div className="col-lg-5 offset-xl-1">
                    <label className="labeltext">Parent: (*)</label>
                    <Form.Item name="parentId">
                      <select
                        className="FormInput"
                        name="cars"
                        id="cars"
                      >
                        <option value="">None</option>
                        {createCategoryList(categories).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
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
