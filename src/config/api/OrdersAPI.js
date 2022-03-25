import BaseUrl from "./_Domain";
import axios from "../helper/axios";


function OrderDetails(token, orderid) {
  const url = `${BaseUrl}Order/OrderListByOrderId?orderId=${orderid}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
function getOrdersByVendor() {
  return axios.post(`/order/getCustomerOrdersByVendors`);
}
function getPendingOrdersByVendor() {
  return axios.post(`/order/getPendingOrdersByVendors`);
}
function getOrdersByAdmin() {
  return axios.post(`/order/getCustomerOrders`);
}
function getPendingOrdersByAdmin() {
  return axios.post(`/order/getPending`);
}
function getRecentOrdersByAdmin() {
  return axios.post(`/order/getRecentOrdersByAdmin`);
}
function updateOrderByVendor(model) {
  return axios.post(`/vendor/updateOrder`,{
    ...model
});
}
function updateOrderByAdmin(model) {
  return axios.post(`/order/updateOrderStatus`,{
    ...model
});
}
export { OrderDetails, getOrdersByVendor,updateOrderByVendor,getOrdersByAdmin,updateOrderByAdmin,getRecentOrdersByAdmin,getPendingOrdersByAdmin,getPendingOrdersByVendor };
