import BaseUrl from "./_Domain";

function OrderList(token) {
  const url = `${BaseUrl}Order/OrderList`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  }).then((res) => res.json());
}
function OrderDetails(token,orderid) {
    const url = `${BaseUrl}Order/OrderListByOrderId?orderId=${orderid}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res))
    .catch((err)=> console.log(err));
  }

export { OrderList,OrderDetails };