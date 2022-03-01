import axios from "axios";
import { store } from "../../store";
import { authConstants } from "../../store/actions/contants";
import { api } from "../../urlConfig";
// import { authConstants } from "../actions/contants";

const token = window.localStorage.getItem('token');

const axiosInstanse = axios.create({
  baseURL: api,
  headers: {
      'Authorization': token ? `Bearer ${token}` : ''
  }
});

axiosInstanse.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

axiosInstanse.interceptors.response.use((res) => {
    return res;
}, (error) => {
    // console.log(error.response);
    const status = error.response ? error.response.status : 500
    if(status && status === 500){
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return error.response;
})

export default axiosInstanse;