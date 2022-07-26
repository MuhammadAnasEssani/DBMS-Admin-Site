import axios from "../helper/axios";

function  addProduct(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "/product",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}

function getProductsByVendor() {
  return axios.get(`/product`);
}

function  editProduct(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "/product/update",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}
function  deleteProductById(payload) {
  // console.log(payload)
  return axios.delete(`product/deleteProductById`, {
    data: payload ,
  }).then((res) => res);
}


export { addProduct,getProductsByVendor, editProduct, deleteProductById };
