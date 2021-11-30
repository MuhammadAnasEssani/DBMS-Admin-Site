import axios from "../helper/axios";

function  getCategories(form) {
  return axios.get('/category/getcategory')
}

export { getCategories };