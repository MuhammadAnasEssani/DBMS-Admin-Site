import axios from "../helper/axios";

function getColours() {
    return axios.get(`/colour`);
}

export { getColours };