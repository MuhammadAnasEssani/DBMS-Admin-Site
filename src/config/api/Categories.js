import axios from "../helper/axios";

function  getCategories() {
  return axios.get('/category')
}

function addCategory(model) {
  return axios.post('/category', {
    ...model
  })
}
function updateCategory(model) {
  return axios.put(`/category/${model.id}`, {
    ...model
})
}
function  deleteCategory(id) {
  // console.log(payload)
  return axios.delete(`/category/${id}`).then((res) => res);
}

export { getCategories, addCategory,updateCategory,deleteCategory };