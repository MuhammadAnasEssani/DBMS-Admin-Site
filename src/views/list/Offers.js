import React, {useEffect, useState} from 'react'
import {Table} from "antd";
import {useSelector} from 'react-redux';
import BreadCrumbs from "../../component/breadcrumbs/BreadCrumbs";
import {useHistory} from "react-router-dom";
import {getOffersByVendor} from '../../config/api/Offer';
import Popconfirm from "antd/es/popconfirm";
import Notification from "../../component/notification/Notification";
import {deleteOffer} from "../../config/api/offers";

export default function Offers() {
    const states = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const drawerState = states.DrawerReducer.State;
  const [change, setChange] = useState(false);
  const [offers, setOffers] = useState([]);
  const handleDelete = async (id) => {
    try{
      const res = await deleteOffer(id);
      // if(res){
      //   console.log(res)
      // }
      if(res.status === 204){
        Notification(
            "Offer Department",
            res.data.message,
            "Success"
        );
        {change ? setChange(false) : setChange(true)}
        return;
      }else{
        Notification("Offer Department", res.data.message, "Error");
        return;
      }
    }catch(err){
      Notification("Offer Department", "Something went wrong", "Error");

    }

  };
  const data = [];
  {
    offers.length > 0 &&
      offers.map((offer, index) =>
          data.push({
          key: index + 1,
          no: index + 1,
            title: offer.title,
            status: offer.status == 10 ? "Active" : "InActive",
          action: (
            <div className="d-sm-inline-flex gap-2 actionDiv">
              {/*<span*/}
              {/*  className="bi bi-pencil actionBtn"*/}
              {/*  // onClick={() => showCategoryEditModal(category)}*/}
              {/*></span>*/}
              <Popconfirm
                  title="Are you sure？"
                  // icon={<CloseCircleTwoTone twoToneColor="Red" />}
                  onConfirm={()=> handleDelete(offer.id)}
              >
                <span className="bi bi-trash actionBtn"></span>
              </Popconfirm>
            </div>
          ),
        })
      );
  }

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      responsive: ["md"],
    },
    {
      title: "Offer Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const fetchOffers = async () => {
    try{
      const res = await getOffersByVendor();
      if (res.status === 200) {
          setOffers(res.data.data)
        return
      }else {
        Notification("Offers Department", res.data.message, "Error")
        return
      } 
    }catch(err) {
      Notification("Offers Department", "Something went wrong", "Error")
    }
  };


  useEffect(() => {
    fetchOffers();
  }, [change]);
  useEffect(() => {
    if (!auth.authenticate) {
      history.push("/");
      return;
    }
  }, [auth.authenticate]);
  return (
    <>
      <section id="List" className="hero d-flex align-items-center">
        <div className="container ">
          <div
            className={
              drawerState.Drawer ? "row offset-xl-2" : "row offset-xl-1"
            }
          >
            <BreadCrumbs
              icon={"bi bi-book"}
              title={"Offers"}
              subicon={"bi bi-diagram-2"}
              subtitle={"List"}
            />
            <div className="col-lg-12 d-flex flex-column">
              <div
                className=" col-lg-11 dashboardSections itempadding"
                style={{
                  padding: "30px 20px 30px 20px",
                  marginBottom: 40,
                  overflowX: "auto",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ pageSize: 5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
