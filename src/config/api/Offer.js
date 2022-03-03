import axios from "../helper/axios";

function addOffer(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "/offer/create",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}

function getOffersByVendor() {
    return axios.post(`/offers/getOffersByVendor`);
  }

export { addOffer,getOffersByVendor };
