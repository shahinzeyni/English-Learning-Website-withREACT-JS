import React from "react";

import "./CourseDetailBox.css";

export default function CourseDetailBox({ title, text, icon }) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right course-boxes__box-right-icon">
          {icon}
        </div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{title}</span>
          <span className="course-boxes__box-left--subtitle">{text}</span>
        </div>
      </div>
    </div>
  );
}
