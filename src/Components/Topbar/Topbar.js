import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import CounterWatch from "../CounterWatch/CounterWatch";
import "./Topbar.css";

export default memo(function Topbar() {
  return (
    <section className="topbar_sec">
      <div className="top-bar1">
        <div className="container-fluid">
          <div className="top-bar__content">
            <div className="top-bar__right">
              <ul className="top-bar__menu">
                <li className="top-bar__item">
                  <div className="topbarBellIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={1.65}
                      >
                        <g>
                          <path
                            strokeDasharray={4}
                            strokeDashoffset={4}
                            d="M12 3V5"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.24s"
                              values="4;0"
                            ></animate>
                          </path>
                          <path
                            strokeDasharray={28}
                            strokeDashoffset={28}
                            d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.24s"
                              dur="0.48s"
                              values="28;0"
                            ></animate>
                          </path>
                          <animateTransform
                            attributeName="transform"
                            begin="0.96s"
                            dur="7.2s"
                            keyTimes="0;0.05;0.15;0.2;1"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3"
                          ></animateTransform>
                        </g>
                        <path
                          strokeDasharray={8}
                          strokeDashoffset={8}
                          d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.72s"
                            dur="0.24s"
                            values="8;0"
                          ></animate>
                          <animateTransform
                            attributeName="transform"
                            begin="1.2s"
                            dur="7.2s"
                            keyTimes="0;0.05;0.15;0.2;1"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8"
                          ></animateTransform>
                        </path>
                      </g>
                    </svg>
                  </div>
                  <Link to="/" className="top-bar__link1">
                    تخفیفات ویژه بر روی تمامی دوره ها
                  </Link>
                  <Link to="/" className="item-notif2">
                    به زودی
                    <div className="topBarLinkArrowIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinejoin="round"
                            d="M16 12H8m0 0l3-3m-3 3l3 3"
                          />
                          <path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536" />
                        </g>
                      </svg>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="top-bar__left">
              <CounterWatch />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
