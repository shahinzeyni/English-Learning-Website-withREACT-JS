import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ticket from "../../../Components/UserPanel/Ticket/Ticket";
import AuthContext from "../../../context/authContext";
import NavbarUserAdmin from "../../../Components/NavbarUserAdmin/NavbarUserAdmin";
import "./Tickets.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/user`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
          .token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTickets(data);
      });
  }, []);
  const authContext = useContext(AuthContext)

  return (
    <>
      <NavbarUserAdmin />
      <div className="containerSize">
        <div className="userData_right1">
          <span className="main__title-text">
            <span className="main__title-name">
              {authContext.userInfos.name}
            </span>{" "}
            عزیز به پنل کاربری خوش اومدی
          </span>
        </div>
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
                  strokeWidth="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2"
                />
              </svg>
            </div>
            <div className="boxShowUserPanel_titels">
              <span className="boxShowUserPanel_title">تیکت های باز</span>
              <div className="boxShowUserPanel_title2">0 عدد </div>
            </div>
          </div>

          <div className="boxShowUserPanel3 boxShowUserPanel">
            <div className="boxShowUserPanel_icon boxShowUserPanel_icon3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.856 6.84a.75.75 0 0 0-1.106.66V17a.75.75 0 0 0 1.5 0V8.756l5.394 2.904c.222.12.49.12.712 0l5.394-2.904V17a.75.75 0 0 0 1.5 0V7.5a.75.75 0 0 0-1.106-.66L12 10.148z"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M17.31 3.722a59.632 59.632 0 0 0-10.62 0l-1.518.135a3.53 3.53 0 0 0-3.179 3.006a35.508 35.508 0 0 0 0 10.274a3.53 3.53 0 0 0 3.18 3.005l1.516.136c3.534.316 7.088.316 10.622 0l1.517-.136a3.53 3.53 0 0 0 3.179-3.005a35.508 35.508 0 0 0 0-10.274a3.53 3.53 0 0 0-3.18-3.006zM6.824 5.216a58.133 58.133 0 0 1 10.354 0l1.517.136a2.03 2.03 0 0 1 1.829 1.728a34.005 34.005 0 0 1 0 9.84a2.03 2.03 0 0 1-1.829 1.728l-1.517.136c-3.444.308-6.91.308-10.354 0l-1.517-.136a2.03 2.03 0 0 1-1.829-1.728a34.008 34.008 0 0 1 0-9.84a2.03 2.03 0 0 1 1.829-1.728z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="boxShowUserPanel_titels">
              <span className="boxShowUserPanel_title"> پاسخ داده شده </span>
              <div className="boxShowUserPanel_title2">3 تیکت</div>
            </div>
          </div>

          <div className="boxShowUserPanel2 boxShowUserPanel">
            <div className="boxShowUserPanel_icon boxShowUserPanel_icon2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 15 15"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                />
              </svg>
            </div>
            <div className="boxShowUserPanel_titels">
              <span className="boxShowUserPanel_title"> بسته</span>
              <div className="boxShowUserPanel_title2">2 تیکت</div>
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
              <span className="boxShowUserPanel_title"> پاسخ داده شده </span>
              <div className="boxShowUserPanel_title2">3 تیکت</div>
            </div>
          </div>
        </div>
      </div>

      <div id="home-content" className="container-fluid sec_course">
        <div className="container">
          <div className="ticket">
            <div className="ticket-header">
              <div className="home-title titleAdmin">
                <span className="titleAdmin2">همه تیکت ها</span>
              </div>
              <Link
                className="ticket-header__link"
                to="/my-account/send-ticket"
              >
                ارسال تیکت جدید
              </Link>
            </div>

            <div className="ticket-filter">
              <form action="#" className="ticket-filter__form">
                <select className="ticket-filter__select">
                  <option className="ticket-filter__option" value="">
                    همه
                  </option>
                  <option className="ticket-filter__option" value="">
                    فرستاده شده
                  </option>
                  <option className="ticket-filter__option" value="">
                    دریافتی
                  </option>
                </select>
                <select className="ticket-filter__select ">
                  <option className="ticket-filter__option" value="">
                    همه
                  </option>
                  <option className="ticket-filter__option" value="">
                    باز
                  </option>
                  <option className="ticket-filter__option" value="">
                    بسته
                  </option>
                  <option className="ticket-filter__option" value="">
                    پاسخ داده شده
                  </option>
                  <option className="ticket-filter__option" value="">
                    پایان یافته
                  </option>
                </select>
                <select className="ticket-filter__select">
                  <option className="ticket-filter__option" value="">
                    تاریخ پاسخ
                  </option>
                  <option className="ticket-filter__option" value="">
                    تاریخ ایجاد
                  </option>
                </select>
                <button className="ticket-filter__btn" type="submit">
                  اعمال
                </button>
              </form>
            </div>
            <div className="ticket-content">
              <span className="ticket-content__title">نمایش تیکت</span>

              {tickets.map((ticket) => (
                <Ticket {...ticket} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
