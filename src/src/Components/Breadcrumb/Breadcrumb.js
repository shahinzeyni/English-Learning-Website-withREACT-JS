import React from "react";
import { Link } from "react-router-dom";

import "./Breadcrumb.css";

export default function Breadcrumb({ title ,name ,href }) {

  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <Link to="/" className="breadcrumb__home-content-icon breadcrumb__home-icon ">
          
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path fill="currentColor" d="m12.707 2.293l9 9c.63.63.184 1.707-.707 1.707h-1v6a3 3 0 0 1-3 3h-1v-7a3 3 0 0 0-2.824-2.995L13 12h-2a3 3 0 0 0-3 3v7H7a3 3 0 0 1-3-3v-6H3c-.89 0-1.337-1.077-.707-1.707l9-9a1 1 0 0 1 1.414 0M13 14a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883-.993L11 14z" />
</svg>
          </Link>
          <ul className="breadcrumb__list">
            <div className="breadCrumb_li1">
              <Link to="/" className="breadcrumb__link">
                صفحه ی اصلی
              </Link>
            </div>

            <div className="breadCrumb_li2">
              <li className="breadcrumb__item">{title}</li>
            </div>
            <div className="breadCrumb_li3">
              <li className="breadcrumb__item">{name}</li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
}
