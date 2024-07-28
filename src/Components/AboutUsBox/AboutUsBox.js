import React from "react";

import "./AboutUsBox.css";

export default function AboutUsBox({ title, desc, icon , animation }) {
  return (
    <div className={` col-lg-6 col-md-6 col-sm-12 col-12 ${animation}`}>
      <div className="about-us__box">
        <div className="about-us__box-right">
         {icon}
        </div>
        <div className="about-us__box-left">
          <span className="about-us__box-title">{ title }</span>
          <span className="about-us__box-text">
              { desc }
          </span>
        </div>
      </div>
    </div>
  );
}
