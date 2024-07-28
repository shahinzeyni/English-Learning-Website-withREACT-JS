import React, { useEffect, useState,useContext } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import "./SendTicket.css";
import NavbarUserAdmin from "../../../Components/NavbarUserAdmin/NavbarUserAdmin";
import ProductShowDiscrbe from "../../../Components/ProductShowDiscrbe/ProductShowDiscrbe";

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [ticketTypeID, setTicketTypeID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [body, setBody] = useState("");
  const [courseID, setCourseID] = useState("");
  const authContext = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then(res => res.json())
      .then(data => setDepartments(data));

    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
          .token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
      });
  }, []);

  const getDepartmentsSub = departmentID => {
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then(res => res.json())
      .then(subs => setDepartmentsSubs(subs));
  };

  const sendTicket = event => {
    event.preventDefault();

    const newTicketInfos = {
      departmentID,
      departmentSubID: ticketTypeID,
      title,
      priority,
      body,
      course: courseID.length ? courseID : undefined
    };

    fetch(`http://localhost:4000/v1/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
          .token}`
      },
      body: JSON.stringify(newTicketInfos)
    }).then(res => {
      if (res.ok) {
        swal({
          title: "تیکت با موفقیت ثبت شد",
          icon: "success",
          buttons: "خیلی هم عالی"
        }).then(() => {
          navigate("/my-account/tickets");
        });
      }
    });
  };

  return (
    <div className="containe">
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

      <div id="home-content container" className="container-fluid sec_course">
        <div className="container">
          <div className="ticket">
            <div className="ticket-header">
              <div className="home-title titleAdmin">
                <span className="titleAdmin2">ارسال تیکت جدید</span>
              </div>
              <Link className="ticket-header__link" to="/my-account/tickets">
                همه تیکت ها
              </Link>
            </div>
            <form className="ticket-form" action="#">
              <div className="row">
                <div className="col-md-6 col-12 ">
                  <div className="input-group">
                    <label className="input-group__label">
                      دپارتمان را انتخاب کنید:
                    </label>
                    <select
                      className="select-group"
                      onChange={(event) => {
                        getDepartmentsSub(event.target.value);
                        setDepartmentID(event.target.value);
                      }}
                    >
                      <option className="ticket-form__option">
                        لطفا یک مورد را انتخاب نمایید.
                      </option>
                      {departments.map((department) => (
                        <option value={department._id}>
                          {department.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="input-group">
                    <label className="input-group__label">
                      نوع تیکت را انتخاب کنید:
                    </label>
                    <select
                      className="select-group"
                      onChange={(event) => setTicketTypeID(event.target.value)}
                    >
                      <option className="ticket-form__option">
                        لطفا یک مورد را انتخاب نمایید.
                      </option>
                      {departmentsSubs.map((sub) => (
                        <option value={sub._id}>{sub.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="input-group">
                    <label className="input-group__label">
                      عنوان تیکت را وارد کنید:
                    </label>
                    <input
                      type="text"
                      placeholder="عنوان تیکت را وارد کنید..."
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="input-group">
                    <label className="input-group__label">
                    سطح اولویت تیکت :
                    </label>
                    <select
                      className="select-group"
                      onChange={(event) => setPriority(event.target.value)}
                    >
                      <option className="ticket-form__option">
                        لطفا یک مورد را انتخاب نمایید.
                      </option>
                      <option value="3">کم</option>
                      <option value="2">متوسط</option>
                      <option value="1">بالا</option>
                    </select>
                  </div>
                </div>
                {ticketTypeID === "637753247b52cb74cad00e27" && (
                  <div className="col-6">
                    <label className="ticket-form__label">
                      دوره را انتخاب کنید:
                    </label>
                    <select
                      className="ticket-form__select"
                      onChange={(event) => setCourseID(event.target.value)}
                    >
                      <option className="ticket-form__option">
                        لطفا یک مورد را انتخاب نمایید.
                      </option>
                      {courses.map((course) => (
                        <option value={course.course._id} key={course._id}>
                          {course.course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="col-12">
                  <label className="ticket-form__label">
                    محتوای تیکت را وارد نمایید:
                  </label>
                  <textarea
                    className="ticket-form__textarea"
                    onChange={(event) => setBody(event.target.value)}
                  />
                </div>
                <div className="col-12">
                  <div className="ticket-form__file">
                    <span className="ticket-form__file-max">
                      حداکثر اندازه: 6 مگابایت
                    </span>
                    <span className="ticket-form__file-format">
                      فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                    </span>
                    <div className="file">
                      <div className="uploadInp">
                        <input
                          className="ticket-form__file-input fileInpuploader"
                          type="file"
                        />
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
                              d="M12 15V2m0 0l3 3.5M12 2L9 5.5"
                            />
                            <path d="M8 22h8c2.828 0 4.243 0 5.121-.878C22 20.242 22 18.829 22 16v-1c0-2.828 0-4.242-.879-5.121c-.768-.768-1.946-.865-4.121-.877m-10 0c-2.175.012-3.353.109-4.121.877C2 10.758 2 12.172 2 15v1c0 2.829 0 4.243.879 5.122c.3.3.662.497 1.121.627" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 tickBtnOk">
                  <button className="ticket-form__btn" onClick={sendTicket}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M14.25 8.75c-.5 2.5-2.385 4.854-5.03 5.38A6.25 6.25 0 0 1 3.373 3.798C5.187 1.8 8.25 1.25 10.75 2.25" />
                        <path d="m5.75 7.75l2.5 2.5l6-6.5" />
                      </g>
                    </svg>
                    ارسال تیکت
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
