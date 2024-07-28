import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState({});
  const [sessions, setSessions] = useState([]);
  const [isSessionFree, setIsSessionFree] = useState(0)

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSessions();

    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }, []);

  function getAllSessions() {
    fetch("http://localhost:4000/v1/courses/sessions")
      .then((res) => res.json())
      .then((allSessions) => {
        setSessions(allSessions);
      });
  }

  const createSession = (event) => {
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));

    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("time", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", isSessionFree);

    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    }).then((res) => {
      res.json()
      if (res.ok) {
        swal({
          title: "جلسه مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then((result) => {
          getAllSessions();
        });
      }
    })
  };

  const removeSession = (sessionID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف جلسه اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "جلسه مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then((result) => {
              getAllSessions();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="container-fluid sec_course" id="home-content">
        <div className="container">
          <div className="home-title titleAdmin">
            <span className="titleAdmin2">افزودن جلسه جدید</span>
          </div>
          <form className="form">
          <div className="col-md-6 col-12">
              <div className="price input">
                <div className="input-group">
                  <label className="input-group__label">دوره انتخابی</label>
                  <select
                    className=" select-group"
                    onChange={(event) => setSessionCourse(event.target.value)}
                  >
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                    {courses.map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="name input">
                <div className="input-group">
                  <label className="input-group__label">عنوان جلسه</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    type="text"
                    id="title"
                    validations={[minValidator(5)]}
                    placeholder="لطفا نام جلسه را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="price input">
                <div className="input-group">
                  <label className="input-group__label">مدت زمان جلسه</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    type="text"
                    id="time"
                    validations={[minValidator(5)]}
                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>


            <div className="col-md-6 col-12">
              <div className="bottom-form">
                <div className="condition">
                <div className="input-grou">

                  <label className="input-group__label2">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <p className="radiusBtns">غیر رایگان</p>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <p className="radiusBtns">رایگان</p>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="file fileUploadBox">
                <label className="input-title2 ">آپلود عکس دوره </label>
                <div className="uploadInp">
            
                  <input
                    type="file"
                    className="fileInpuploader"
                    onChange={(event) => setSessionVideo(event.target.files[0])}
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
         
            <div className="col-12">
              <div className="bottom-form tickBtnOk">
                <div className= "tickBtnOkmake tickBtnOk ticket-form__btn">
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
                  <input type="submit" className=" ticket-form__btn2" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="جلسات">
        <table className="table">
          <thead className="table_th">
            <tr  className="table_tr1">
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr  className="table_tr" key={session._id}>
                <p  className="table_tdIndex">{index + 1}</p>
                <td>{session.title}</td>
                <td  className="table_colorText">{session.time}</td>
                <td  className="table_colorText">{session.course.name}</td>
                <td  >
                  <button
                    type="button"
                    className="btn btn-trash "
                    onClick={() => removeSession(session._id)}
                  >
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
                        d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
