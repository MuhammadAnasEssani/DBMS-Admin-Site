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
function getOrdersByVendor(model) {
  return axios.post(`/order/getCustomerOrdersByVendors`);
}

export { OrderDetails, getOrdersByVendor };
