import React, { useState, useEffect, memo } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

import './Session.css'

export default memo(function Session() {
  const { courseName, sessionID } = useParams();
  const [session, setSession] = useState({})
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }).then(res => res.json())
      .then(data => {
        setSession(data.session)
        setSessions(data.sessions)
      })
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="breadcrumb">
        <div className="container">
          <div className="breadcrumb__content">
          <Link to="/" className="breadcrumb__home-content-icon breadcrumb__home-icon">
          
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
                <li className="breadcrumb__item">آموزش انگلیسی</li>
              </div>
              <div className="breadCrumb_li3">
                <li className="breadcrumb__item">
                  <Link
                    to={`/course-info/${courseName}`}
                    className="breadcrumb__itemLink"
                  >
                    {courseName}
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </section>
    <div className="container">

      <div className="row">
        <div className="col-12 ">
          <div className="episode">
            <div className="episode-content">
              <video
                className="episode-content__video"
                controls
                src={`http://localhost:4000/courses/covers/${session.video}`}
              ></video>
              <Link className="episode-content__video-link" to="#">
                دانلود ویدئو
              </Link>
              <div className="episode-content__bottom">
                <Link
                  className="episode-content__backward episode-content__backward-icon"
                  to="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path d="m12.052 14.829l1.414 1.414L17.71 12l-4.243-4.243l-1.414 1.415L13.88 11H6.343v2h7.537z" />
                      <path
                        fillRule="evenodd"
                        d="M1 19a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4zm4 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                  <p>قبلی</p>
                </Link>
                <Link
                  className="episode-content__forward episode-content__backward-icon"
                  to="#"
                >
                  <p>بعدی</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path d="m11.948 14.829l-1.414 1.414L6.29 12l4.243-4.243l1.414 1.415L10.12 11h7.537v2H10.12z" />
                      <path
                        fillRule="evenodd"
                        d="M23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4zm-4 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="sidebar">
            <div className="sidebar__header">
              <Link className="sidebar__header-link sidebar__haeder-icon" to="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
	<path fill="currentColor" d="M7 0a2 2 0 0 0-2 2h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
	<path fill="currentColor" d="M13 20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2zM9 5h4v5H9zM4 5h4v1H4zm0 2h4v1H4zm0 2h4v1H4zm0 2h9v1H4zm0 2h9v1H4zm0 2h9v1H4z" />
</svg>
               <p> سر فصل جلسات</p>
              </Link>
            </div>
            <div className="sidebar-topics">
              <div className="sidebar-topics__item">
                <ul className="sidebar-topics__list">
                  {sessions.map((session) => (
                    <Link to={`/${courseName}/${session._id}`}>
                      <li className="sidebar-topics__list-item">
                        <div className="sidebar-topics__list-item-icon sidebar-topics__list-right">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
	<path fill="currentColor" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M1.5 8a6.5 6.5 0 1 0 13 0a6.5 6.5 0 0 0-13 0m4.879-2.773l4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215" />
</svg>
                          <Link
                            className="sidebar-topics__list-item-link"
                            to="#"
                          >
                          
                            {session.title}
                          </Link>
                        </div>
                        <div className="sidebar-topics__list-left">
                          <span className="sidebar-topics__list-item-time">
                        
                            {session.time}
                            :00
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <Footer />
    </>
  );
})