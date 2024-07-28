import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

import "./Index.css";

export default function Index() {

    const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('')


  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        setInfos(pageInfo.infos)
        setLastRegisteredUsers(pageInfo.lastUsers)
        setAdminName(pageInfo.adminName)
      });
  }, []);

  return (
    <>
      <div className="container-fluid sec_course " id="home-content">
        <div className="container-lg">
          <div className="home-title1 titleAdmin ">
            <p className=" titleAdmin3">خوش آمدید,</p>
            <p className="name">{adminName}</p>
          </div>
          <div className="mainBoxShowUserPanelTicket">
            <div className="mainBoxShowUserPanel  ">
              <div className="boxShowUserPanel1 boxShowUserPanel">
                <div className="boxShowUserPanel_icon boxShowUserPanel_icon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234"
                    />
                  </svg>
                </div>
                <div className="boxShowUserPanel_titels">
                  <span className="boxShowUserPanel_title"> ثبت نامی </span>
                  <div className="boxShowUserPanel_title2">0 عدد </div>
                </div>
              </div>

              <div className="boxShowUserPanel3 boxShowUserPanel">
                <div className="boxShowUserPanel_icon boxShowUserPanel_icon3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 26 26"
                  >
                    <path
                      fill="currentColor"
                      d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2a1 1 0 0 0-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095c-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313c.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28c.4-.2 4.594-3.095 4.594-3.095c.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906c-.3-.2-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907c-1.3.8-2.513.993-2.813.593c-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125c.562-.313 1.957-1.204 3.313-2.062c.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968a1 1 0 0 0-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.264 3.264 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3c.9 0 1.712-.194 2.312-.594c1.2-.7 7-5.218 7-5.218c.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1c-.3-.2-.793-.106-1.093.094c-1.6 1.2-5.907 4.588-6.907 5.188c-1.4.8-2.719 1-3.219.5c-.2-.2-.187-.388-.187-.688c.006-.172.025-.32.063-.438c.056-.174.17-.388.593-.718c.02-.016.01-.015.031-.031c.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z"
                    />
                  </svg>
                </div>
                <div className="boxShowUserPanel_titels">
                  <span className="boxShowUserPanel_title"> دوره ها </span>
                  <div className="boxShowUserPanel_title2">12 عدد</div>
                </div>
              </div>

              <div className="boxShowUserPanel2 boxShowUserPanel">
                <div className="boxShowUserPanel_icon boxShowUserPanel_icon2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14H5v-1h-.5A1.5 1.5 0 0 1 3 11.5V6h10v2h1V4.5A2.5 2.5 0 0 0 11.5 2zm7 1A1.5 1.5 0 0 1 13 4.5V5H3v-.5A1.5 1.5 0 0 1 4.5 3zM6 11.5A2.5 2.5 0 0 1 8.5 9h5a2.5 2.5 0 0 1 2.5 2.5v.129l2.035-1.405a1.25 1.25 0 0 1 1.96 1.028v5.498a1.25 1.25 0 0 1-1.96 1.028L16 16.373v.127a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 6 16.5zm12.604-.454L16 12.844v2.314l2.604 1.797a.25.25 0 0 0 .392-.205v-5.498a.25.25 0 0 0-.392-.206M8.5 10A1.5 1.5 0 0 0 7 11.5v5A1.5 1.5 0 0 0 8.5 18h5a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5z"
                    />
                  </svg>
                </div>
                <div className="boxShowUserPanel_titels">
                  <span className="boxShowUserPanel_title"> جلسات</span>
                  <div className="boxShowUserPanel_title2">123 جلسه</div>
                </div>
              </div>

              <div className="boxShowUserPanel3 boxShowUserPanel">
                <div className="boxShowUserPanel_icon boxShowUserPanel_icon3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M26.07 3.996a2.974 2.974 0 0 0-.933.223h-.004c-.285.113-1.64.683-3.7 1.547l-7.382 3.109c-5.297 2.23-10.504 4.426-10.504 4.426l.062-.024s-.359.118-.734.375a2.03 2.03 0 0 0-.586.567c-.184.27-.332.683-.277 1.11c.09.722.558 1.155.894 1.394c.34.242.664.355.664.355h.008l4.883 1.645c.219.703 1.488 4.875 1.793 5.836c.18.574.355.933.574 1.207c.106.14.23.257.379.351a1.119 1.119 0 0 0 .246.106l-.05-.012c.015.004.027.016.038.02c.04.011.067.015.118.023c.773.234 1.394-.246 1.394-.246l.035-.028l2.883-2.625l4.832 3.707l.11.047c1.007.442 2.027.196 2.566-.238c.543-.437.754-.996.754-.996l.035-.09l3.734-19.129c.106-.472.133-.914.016-1.343a1.807 1.807 0 0 0-.781-1.047a1.872 1.872 0 0 0-1.067-.27m-.101 2.05c-.004.063.008.056-.02.177v.011l-3.699 18.93c-.016.027-.043.086-.117.145c-.078.062-.14.101-.465-.028l-5.91-4.531l-3.57 3.254l.75-4.79l9.656-9c.398-.37.265-.448.265-.448c.028-.454-.601-.133-.601-.133l-12.176 7.543l-.004-.02l-5.836-1.965v-.004l-.015-.003a.27.27 0 0 0 .03-.012l.032-.016l.031-.011s5.211-2.196 10.508-4.426c2.652-1.117 5.324-2.242 7.379-3.11a807.312 807.312 0 0 1 3.66-1.53c.082-.032.043-.032.102-.032z"
                    />
                  </svg>
                </div>
                <div className="boxShowUserPanel_titels">
                  <span className="boxShowUserPanel_title">
                    {" "}
                    پاسخ داده شده{" "}
                  </span>
                  <div className="boxShowUserPanel_title2">3 تیکت</div>
                </div>
              </div>
            </div>
          </div>

          <DataTable title="ثبت نامی اخیر">
            <table className="table">
              <thead className="table_th">
                <tr className="table_tr1">
                  <th>شناسه</th>
                  <th>نام و نام خانوادگی</th>
                  <th>ایمیل</th>
                </tr>
              </thead>
              <tbody>
                {lastRegisteredUsers.map((user, index) => (
                  <tr className="table_tr">
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    {/* <td>09123443243</td> */}
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
      </div>
    </>
  );
}
