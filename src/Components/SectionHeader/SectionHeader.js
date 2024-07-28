import React from "react";
import { Link } from "react-router-dom";

import "./SectionHeader.css";

export default function SectionHeader({ title, desc, btnTitle, btnHref }) {
  return (
    <div className="courses-header">
      <div className="courses-header__right">
        <span className="courses-header__title1 title">
          {title}
        </span>
        <span className="courses-header__text title2">
          {desc}
        </span>
      </div>
      {btnTitle
        ? <div className="courses-header__left">
            <Link to={`/${btnHref}`} className="courses-header__link">
              {btnTitle}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <g fill="currentColor" fillRule="evenodd">
                  <path d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" />
                  <path d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                </g>
              </svg>
              {/* <i className="fas fa-arrow-left courses-header__icon"></i> */}
            </Link>
          </div>
        : null}
    </div>
  );
}
