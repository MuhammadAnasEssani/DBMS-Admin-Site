import axios from "../helper/axios";

function getSizes() {
    return axios.get(`/size`);
}

export { getSizes };