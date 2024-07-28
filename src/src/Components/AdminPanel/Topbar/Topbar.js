import React, { useContext, useEffect, useRef, useState } from "react";
import IsShowToggleAdminPanelContext from "../../../pages/AdminPanel/IsShowToggleAdminPanelContext";
export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);
  const isShowAdminContext = useContext(IsShowToggleAdminPanelContext)

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminInfo(data);
        setAdminNotifications(data.notifications);
      });
  }, [seeNotification]);

  function seeNotification(notficationID) {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/notifications/see/${notficationID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((err) => {
        console.log(err);
      });
  }


  return (
    <section className="mainTopBarAdmin">
      <div className="container-fluid">
        <div className="container">
          <div
            class={`home-header ${
              isShowNotificationsBox && "active-modal-notfication"
            }`}
          >
            <div
              className="btnShowSidebar"
              onClick={() => {
                isShowAdminContext.setIsSidebarAdminShow(true);
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
            <div className="home-right">
              <div className="home-searchbar">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="جستجو..."
                />
                <i className="fa fa-search search-bar_searchIcon"></i>
              </div>
              <div className="home-notification">
                <button
                  type="button"
                  onMouseEnter={() => setIsShowNotificationsBox(true)}
                >
                  <i className="fa-solid fa-bell bell_bar_searchIcon"></i>
                </button>
              </div>
              <div
                className="home-notification-modal"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
                onMouseLeave={() => setIsShowNotificationsBox(false)}
              >
                <ul className="home-notification-modal-list">
                  {adminNotifications.length === 0 ? (
                    <li className="home-notification-modal-item">
                      نوتیفکیشنی برای نمایش وجود ندارد
                    </li>
                  ) : (
                    <>
                      {adminNotifications.map((notification) => (
                        <li className="home-notification-modal-item">
                          <span className="home-notification-modal-text">
                            {notification.msg}
                          </span>
                          <label className="switch">
                            <a
                              href="javascript:void(0)"
                              onClick={() => seeNotification(notification._id)}
                            >
                              <svg
                                className="swithSvg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="none"
                                  stroke="#3741c8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="m2.75 8.75l3.5 3.5l7-7.5"
                                />
                              </svg>
                            </a>
                          </label>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="home-left">
              <div className="home-profile">
                <div className="home-profile-image">
                  <a href="#">
                    <img src={adminInfo.profile} alt="" />
                  </a>
                </div>
                <div className="home-profile-name">
                  <a href="#">{adminInfo.name}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
