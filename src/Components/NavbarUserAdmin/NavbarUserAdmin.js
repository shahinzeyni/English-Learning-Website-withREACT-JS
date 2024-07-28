import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/authContext'
import isShowToggleContext from '../../pages/UserPanel/Index/IsShowToggleContext';
import { Link } from 'react-router-dom';

export default function NavbarUserAdmin() {
    const authContext = useContext(AuthContext)
    
    const isShowToggle = useContext(isShowToggleContext)

    // const isShowToggle = useContext(isShowToggleContext)

  return (
    <>
      <div className="userData">
        <div
          className="btnShowSidebar"
          onClick={() => {
            isShowToggle.sidebarBtn(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
            />
          </svg>
        </div>
        <div className="userData_right">
          <span className="main__title-text">
            <span className="main__title-name">
              {authContext.userInfos.name}
            </span>{" "}
            عزیز به پنل کاربری خوش اومدی
          </span>
        </div>
        <div className="userData_left">
          <div className="iconUserPanel">
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
          <div className="iconUserPanl">
            <Link className="iconUserPanel" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="6" r="4" />
                  <path
                    strokeLinecap="round"
                    d="M19.998 18c.002-.164.002-.331.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
                  />
                </g>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
