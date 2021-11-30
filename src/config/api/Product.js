import axios from "../helper/axios";

function  addProduct(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "/product/create",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}

export { addProduct };
