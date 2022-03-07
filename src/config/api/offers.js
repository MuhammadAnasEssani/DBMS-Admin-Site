import axios from "../helper/axios";


function getOffersByVendor(model) {
    return axios.post(`/offers/getOffersByVendor`);
}

export { getOffersByVendor };
