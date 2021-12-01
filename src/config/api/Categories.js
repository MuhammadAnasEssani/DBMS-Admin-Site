import axios from "../helper/axios";

function  getCategories(form) {
  return axios.get('/category/getcategory')
}

function addCategory(model) {
  return axios.post('/category/create', {
    ...model
})
}

export { getCategories, addCategory };