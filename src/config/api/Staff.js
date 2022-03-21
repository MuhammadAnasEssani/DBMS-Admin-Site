import axios from "../helper/axios";

function addStaff(model) {
  return axios.post("/admin/add-staff", {
    ...model,
  });
}
function getStaff(model) {
  return axios.get("/admin/get-staff");
}

export { addStaff,getStaff };
