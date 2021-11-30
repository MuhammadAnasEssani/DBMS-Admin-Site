import React from "react";

export default function BreadCrumbs(props) {
  const { icon, title, subicon, subtitle } = props;
  return (
    <div className="col-lg-11 mb-4">
      <div className="col-lg-12 dashboardSections itempadding">
        <h1>
          <span className={icon}></span> {title}
        </h1>

        <div
          className="mt-4"
          style={{ borderBottom: "1px solid #d4d4d4", width: "100%" }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#012970",
            }}
          >
            {" "}
            <span
              className={subicon}
              style={{ fontSize: 16, fontWeight: 600 }}
            ></span>{" "}
            {title}
            <span className="bi bi-dot" style={{ fontSize: 20 }}></span>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
