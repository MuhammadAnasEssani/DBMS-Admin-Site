import axios from "../helper/axios";

function addStaff(model) {
  return axios.post("/admin/add-staff", {
    ...model,
  });
}
function getStaff(model) {
  return axios.get("/admin/get-staff");
}

function changeStaffStatus(model) {
  return axios.post("/admin/update-staff", {
    ...model,
  });
}

export { addStaff,getStaff ,changeStaffStatus};
