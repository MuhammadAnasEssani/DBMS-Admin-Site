import axios from "../helper/axios";

function  getCategories(form) {
  return axios.get('/category/getcategory')
}

function addCategory(model) {
  return axios.post('/category/create', {
    ...model
})
}
function updateCategory(model) {
  return axios.post('/category/update', {
    ...model
})
}

export { getCategories, addCategory,updateCategory };