import React from "react";

export default function PAdminItem({ title, count,icon }) {
  return (
    <div className="col-4">
      <div className="home-content-revanue box">
        <div className="home-box">
          <div className="home-box-left">
            <div className="home-box-title">
              <span>{title}</span>
            </div>
            <div className="home-box-value">
              <div className="home-box-price"></div>
            </div>
            <div className="home-box-text">
              <span>{title} در یک ماه گذشته</span>
              <span>{count}</span>
            </div>
          </div>
          <div className="home-box-right">
            <div className="home-box-icon">
              <i className={`${icon} home-box-iconTag`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
