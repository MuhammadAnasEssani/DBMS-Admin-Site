import axios from 'axios';
// import store from '../store'
// import { authConstants } from '../actions/constants';
import BaseUrl from '../api/_Domain';

// const token = window.localStorage.getItem('token');
// console.log(token);

const axiosInstanse = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY2ZTE3MzlmMTk1YjIzZWQxMjE5N2IiLCJyb2xlIjoidmVuZG9yIiwiaWF0IjoxNjM4NTM3NDYyLCJleHAiOjE2Mzg2MjM4NjJ9.mmZY3Q-ZwSczyhj72T8Whe84vFgXNGZCTXn-YzoY0g8`
    }
});

axiosInstanse.interceptors.request.use((req) => {
    // const { auth } = store.getState();
    // if(auth.token){
        req.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY2ZTE3MzlmMTk1YjIzZWQxMjE5N2IiLCJyb2xlIjoidmVuZG9yIiwiaWF0IjoxNjM4NTM3NDYyLCJleHAiOjE2Mzg2MjM4NjJ9.mmZY3Q-ZwSczyhj72T8Whe84vFgXNGZCTXn-YzoY0g8`;
    // }
    return req;
})

axiosInstanse.interceptors.response.use((res) => {
    return res;
}, (error) => {
    // console.log(error.response);
    const status = error.response ? error.response.status : 500
    if(status && status === 500){
        // localStorage.clear();
        // store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return error.response;
})

export default axiosInstanse;