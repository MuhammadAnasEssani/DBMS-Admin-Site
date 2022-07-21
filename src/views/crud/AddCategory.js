import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
// import { Upload, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import {Select, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Notification from "../../component/notification/Notification";

import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import {addCategory} from "../../config/api/Categories";
import {useHistory} from "react-router-dom";

export default function AddCategory() {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const states = useSelector((state) => state);
  const drawerState = states.DrawerReducer.State;
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const [change, setChange] = useState(false);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true)
    const model= {
      name: categoryName,
      description: categoryDescription
    }
    // console.log(model)
    try{
      const res = await addCategory(model);
      if (res.status === 201) {
        Notification("Category Department", "Category Added Sucessfully", "Success")
        setCategoryName("")
        setCategoryDescription("")
        setLoading(false)
        return
      }else {
        Notification("Category Department", res.data.message, "Error" )
        setLoading(false)
        return
      }
    }catch(err){
      Notification("Category Department", "Something went wrong", "Error" )
      setLoading(false)
    }
  };
  // const fetchCategories = async () => {
  //   try{
  //     const res = await getCategories();
  //     if (res.status === 200) {
  //       setCategories(res.data.categoryList);
  //     }else{
  //       Notification(
  //         "Categories",
  //         res.data.message,
  //         "Error"
  //       );
  //     }
  //   }catch(err){
  //     Notification(
  //       "Categories",
  //       "Something went wrong",
  //       "Error"
  //     );
  //   }
  // };

  // const createCategoryList = (categories,options = []) => {
  //   for (let category of categories) {
  //     options.push({ value: category._id, name: category.name, nameArabic: category.nameArabic });
  //     if (category.children.length > 0) {
  //       for (let categoryy of category.children) {
  //         options.push({ value: categoryy._id, name: categoryy.name });
  //       }
  //     }
  //   }
  //   return options;
  // };
  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, [auth.authenticate]);
  useEffect(() => {
    // fetchCategories();
    // console.log(createCategoryList(categories))
  }, []);
  // if(categories.length > 0){
  //   console.log(createCategoryList(categories))
  // }
  // console.log(categories)
  return (
    <section id="Crud" className="hero d-flex align-items-center">
      <div className="container ">
        <div
          className={drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"}
        >
          <BreadCrumbs
            icon={"bi bi-people-check"}
            title={"Category"}
            subicon={"bi bi-diagram-2"}
            subtitle={"Add"}
          />
          <div className="col-lg-12 d-flex flex-column">
            <div className=" col-lg-11 dashboardSections itempadding">
              <h1 className="mb-4">Add Categories</h1>

              <form onSubmit={handleAddCategory} >
                <div className="row">
                  <div className="col-lg-6">
                    <label className="labeltext">Category Name: (*)</label>
                    {/* <Form.Item name="name"> */}
                      <input type="text" required className="FormInput" value={categoryName}
                      placeholder='Category Name'
                      onChange={(e) => setCategoryName(e.target.value)}/>
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
                        value={categoryDescription}
                        placeholder="Category Description"
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        style={{ height: "110px" }}
                    />
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
                      <span>Add Category</span>
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
