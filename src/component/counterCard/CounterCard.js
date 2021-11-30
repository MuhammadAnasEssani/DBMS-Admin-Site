import React from "react";

export default function CounterCard(props) {
  const { icon, count, heading, col } = props;
  return (
    <div
      className={
        col != null
          ? `col-lg-${col} dashboardSections`
          : "col-lg-5 dashboardSections"
      }
    >
      <div
        className="col-lg-6 align-items-center align-self-center"
        style={{ display: "flex" }}
      >
        <img src={icon} className="DashboardImage" />
        <div className="col-lg-6" style={{ marginLeft: 10 }}>
          <h1 style={{ fontSize: 28, color: "#d4d4d4" }}>{count}</h1>
          <h1 style={{ fontSize: 20 }}>{heading}</h1>
        </div>
      </div>
    </div>
  );
}
