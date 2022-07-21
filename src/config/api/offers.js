import axios from "../helper/axios";


function getOffersByVendor(model) {
    return axios.post(`/offers/getOffersByVendor`);
}
function  deleteOffer(id) {
    // console.log(payload)
    return axios.delete(`/offer/${id}`).then((res) => res);
}

export { getOffersByVendor,deleteOffer };
