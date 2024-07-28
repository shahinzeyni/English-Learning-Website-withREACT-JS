import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

import "./CommentsTextArea.css";

export default function CommentsTextArea({ comments, submitComment }) {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState("-1");
  const [createCommentToggle,setCreateCommentToggle] = useState(false)
  const authContext = useContext(AuthContext);
  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value);
  };


  return (
    <div className="comments">
      <div className="comments__header ">
        <div className="comments__header-icon-content introduction__topic_title titleAdminCourse introduction__topic_titleIcon comments__header-icon  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.5 2A1.5 1.5 0 0 0 8 3.5v1A1.5 1.5 0 0 0 9.5 6h5A1.5 1.5 0 0 0 16 4.5v-1A1.5 1.5 0 0 0 14.5 2z"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.5 4.037c-1.258.07-2.052.27-2.621.84C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122v-6c0-2.828 0-4.242-.879-5.121c-.569-.57-1.363-.77-2.621-.84V4.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3zM7 13.75a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="comments__header-title">نظرات</span>
        </div>

        <button
          onClick={() => {
            setCreateCommentToggle(true);
          }}
          className="createCommentBtn"
        >
          ثبت نظر جدید
        </button>
      </div>

      {createCommentToggle && authContext.isLoggedIn === true ? (
        <>
          <div className="comments__respond">
            <div className="comments__respond_title comments__respond_titleIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M4 22h16" opacity="0.5" />
                  <path d="m14.63 2.921l-.742.742l-6.817 6.817c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626l-.213.641a.848.848 0 0 0 1.073 1.073l.641-.213l2.625-.875c.62-.207.93-.31 1.221-.45a5.19 5.19 0 0 0 .969-.598c.255-.199.485-.43.947-.891l6.817-6.817l.742-.742a3.146 3.146 0 0 0-4.45-4.449Z" />
                  <path
                    d="M13.888 3.664S13.98 5.24 15.37 6.63c1.39 1.39 2.966 1.483 2.966 1.483m-12.579 9.63l-1.5-1.5"
                    opacity="0.5"
                  />
                </g>
              </svg>
              {authContext.userInfos.name}
            </div>

            <div className="comments__respond-content">
              <div className="comments__respond-title" id="comment"></div>
              <textarea
                className="comments__score-input-respond"
                onChange={onChangeHandler}
              >
                {newCommentBody}
              </textarea>
              <div className="comments__score">
                <span className="comments__score-title">امتیاز شما</span>
                <div className="col-6">
                  <select
                    className=" select_comment form-select form-control font-bold"
                    onChange={(event) => setCommentScore(event.target.value)}
                  >
                    <option value="-1" className="form-control">
                      امتیاز خود را انتخاب کنید
                    </option>
                    <option value="5">عالی</option>
                    <option value="4">خیلی خوب</option>
                    <option value="3">خوب</option>
                    <option value="2">ضعیف</option>
                    <option value="1">بد</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="btns_comments">
              <button
                className="comments__respond-btn1"
                onClick={() => setCreateCommentToggle(false)}
              >
                لغو
              </button>
              <button
                type="submit"
                className="comments__respond-btn"
                onClick={() => submitComment(newCommentBody, commentScore)}
              >
                ارسال
              </button>
            </div>
          </div>
        </>
      ) : (
         
          <div className="alert alert-danger">
            برای ثبت کامنت باید
            <Link to="/login">لاگین کنید</Link>
          </div>
        
      )}

      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده!
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div className="comments__item" key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <div className="comments__question-name comment-name">
                        <p className="comIcon">
                          {comment.creator.role === "Admin" ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  fill="currentColor"
                                  d="M16 4c-3.855 0-7 3.145-7 7c0 2.379 1.21 4.484 3.031 5.75C7.926 18.352 5 22.352 5 27h2c0-4.398 3.191-8.074 7.375-8.844L15 20h2l.625-1.844C21.809 18.926 25 22.602 25 27h2c0-4.648-2.926-8.648-7.031-10.25C21.789 15.484 23 13.379 23 11c0-3.855-3.145-7-7-7m0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5s-5-2.227-5-5s2.227-5 5-5m-1 15l-1 6h4l-1-6z"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <circle cx="12" cy="6" r="4" />
                                  <path
                                    strokeLinecap="round"
                                    d="M19.998 18c.002-.164.002-.331.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
                                  />
                                </g>
                              </svg>
                            </>
                          )}
                        </p>
                        <p>{comment.creator.name}</p>
                      </div>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#comment"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 21q-1.664 0-3.118-.626T6.34 18.66t-1.714-2.542T4 13h1q0 2.925 2.038 4.963T12 20t4.963-2.037T19 13t-2.037-4.962T12 6h-.38l1.626 1.627l-.708.72L9.692 5.48l2.885-2.866l.708.72L11.619 5H12q1.664 0 3.118.626T17.66 7.34t1.714 2.542T20 13t-.626 3.118t-1.714 2.543t-2.542 1.713T12 21"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {comment.answerContent && (
                    <div className=" comments__item1">
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              <span className="comIcon">
                                {comment.answerContent.creator.role ===
                                "Admin" ? (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 24 24"
                                    >
                                      <g
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      >
                                        <circle cx="12" cy="6" r="4" />
                                        <path
                                          strokeLinecap="round"
                                          d="M19.998 18c.002-.164.002-.331.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
                                        />
                                      </g>
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 32 32"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M16 4c-3.855 0-7 3.145-7 7c0 2.379 1.21 4.484 3.031 5.75C7.926 18.352 5 22.352 5 27h2c0-4.398 3.191-8.074 7.375-8.844L15 20h2l.625-1.844C21.809 18.926 25 22.602 25 27h2c0-4.648-2.926-8.648-7.031-10.25C21.789 15.484 23 13.379 23 11c0-3.855-3.145-7-7-7m0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5s-5-2.227-5-5s2.227-5 5-5m-1 15l-1 6h4l-1-6z"
                                      />
                                    </svg>
                                  </>
                                )}
                              </span>

                              {comment.answerContent.creator.name}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator.role === "ADMIN"
                                ? "مدیر"
                                : "کاربر"}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.createdAt.slice(0, 10)}
                            </span>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item"></li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="comments__pagantion-link
                  comments__pagantion-link--active
                  "
                  >
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link ">
                    3
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
