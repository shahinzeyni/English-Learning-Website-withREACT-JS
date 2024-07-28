import React from "react";

export default function DataTable({ children, title }) {
  return (
    <section className="secTable">
      <div className="containerSize container-lg">
      <div className="home-content-latset-users1">
        <div className="home-content-users-title home-title titleAdmin">
          <span className="titleAdmin2 ">
            لیست <span className="signup ">{title}</span>
          </span>
        </div>
        <div className="home-content-users-table">
          {children}
        </div>
      </div>
    </div>
    </section>
  );
}
