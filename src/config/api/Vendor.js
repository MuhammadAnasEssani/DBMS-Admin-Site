import axios from "../helper/axios";

function getVendors() {
    return axios.post("/admin/get-vendors");
  }
  function getRecentVendors() {
    return axios.post("/admin/getRecentOrders");
  }

  export { getVendors,getRecentVendors };