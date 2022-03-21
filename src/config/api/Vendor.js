import axios from "../helper/axios";

function getVendors() {
    return axios.post("/admin/get-vendors");
  }

  export { getVendors };