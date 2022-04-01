import axios from "../helper/axios";

function createPolicy(model) {
  return axios.post(`/admin/add-policy`, {
    ...model,
  });
}

export { createPolicy };
