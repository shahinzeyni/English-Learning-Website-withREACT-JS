import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validators/rules";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);

      });
  }, []);



  const getAllCourses = () => {
    fetch("http://localhost:4000/v1/courses")
    .then(res => res.json())
    .then((data) => {
      setCourses(data)

    })
  }


  const removeCourse = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دوره موردنظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "حذف دوره با مشکلی مواجه شد",
              icon: "error",
              buttons: "تایید",
            });
          }
        });
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", courseCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", courseStatus);
    formData.append("cover", courseCover);

    if (courseCategory === "-1") {
      swal({
        title: "لطفا دسته بندی دوره را انتخاب کنید",
        icon: "error",
      });
    } else {
      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {

        if (res.ok) {
          swal({
            title: "دوره جدید با موفقیت اضافه شد",
            icon: "success",
            buttons: "تایید",
          }).then(() => {
            getAllCourses();
          });
        }
      });
    }
  };

  return (
    <>
      <div className="">
        <div className="container-fluid sec_course" id="home-content">
          <div className="container ">
            <div className="home-title titleAdmin ">
              <span className="titleAdmin2">افزودن دوره جدید</span>
            </div>
            <form className="form">
              <div className="col-md-6 col-12">
                <div className="name input">
                  <div className="input-group">
                    <label className="input-group__label">نام دوره</label>
                    <Input
                      className="input-group__input"
                      id="name"
                      element="input"
                      onInputHandler={onInputHandler}
                      validations={[minValidator(5)]}
                      type="text"
                      placeholder="لطفا نام دوره را وارد کنید..."
                    />
                  </div>

                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="price input">
                  <div className="input-group">
                    <label className="input-group__label">توضیحات دوره</label>
                    <Input
                      className="input-group__input"
                      id="description"
                      element="input"
                      onInputHandler={onInputHandler}
                      validations={[minValidator(5)]}
                      type="text"
                      placeholder="لطفا توضیحات دوره را وارد کنید..."
                    />
                  </div>
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="number input">
                  <div className="input-group">
                    <label className="input-group__label">Url دوره</label>
                    <Input
                      className="input-group__input"
                      id="shortName"
                      element="input"
                      onInputHandler={onInputHandler}
                      validations={[minValidator(5)]}
                      type="text"
                      isValid="false"
                      placeholder="لطفا Url دوره را وارد کنید..."
                    />
                  </div>
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="price input">
                  <div className="input-group">
                    <label className="input-group__label">قیمت دوره</label>
                    <Input
                      className="input-group__input"
                      id="price"
                      element="input"
                      onInputHandler={onInputHandler}
                      validations={[minValidator(5)]}
                      type="text"
                      isValid="false"
                      placeholder="لطفا قیمت دوره را وارد کنید..."
                    />
                  </div>
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="price input">
                  <div className="input-group">
                    <label className="input-group__label">پشتیبانی دوره</label>
                    <Input
                      className="input-group__input"
                      id="support"
                      element="input"
                      onInputHandler={onInputHandler}
                      validations={[minValidator(5)]}
                      type="text"
                      isValid="false"
                      placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                    />
                  </div>
                  <span className="error-message text-danger"></span>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="number input">
                  <div className="input-group">
                    <label className="input-group__label">دسته بندی دوره</label>

                    <select className="select-group" onChange={selectCategory}>
                      <option value="-1">
                        لطفا دسته بندی را انتخاب نمایید
                      </option>
                      {categories.map((category) => (
                        <option value={category._id}>{category.title}</option>
                      ))}
                    </select>
                  </div>
                  <span className="error-message text-danger"></span>
                </div>
              </div>

              <div className="col-md-6 col-12 ">
                <div className="file fileUploadBox">
                  
                    <label className="input-group_label ">
                      آپلود عکس دوره{" "}
                    </label>
                    <div className="uploadInp">
                      <input
                        className="fileInpuploader"
                        type="file"
                        id="file"
                        onChange={(event) => {
                          setCourseCover(event.target.files[0]);
                        }}
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
              <div className="col-md-6 col-12">
                <div className="bottom-form ">
                  <div className="condition">
                    <div className="input-grop">
                      <label className="input-group__label2">وضعیت دوره</label>
                      <div className="main-radius">
                        <div className="radios">
                          <div className="available">
                            <label>
                              <p className="radiusBtns">در حال برگزاری</p>
                              <input
                                type="radio"
                                value="start"
                                name="condition"
                                checked
                                onInput={(event) =>
                                  setCourseStatus(event.target.value)
                                }
                              />
                            </label>
                          </div>
                        </div>
                        <div className="unavailable">
                          <label>
                            <p className="radiusBtns">پیش فروش</p>
                            <input
                              type="radio"
                              value="presell"
                              name="condition"
                              onInput={(event) =>
                                setCourseStatus(event.target.value)
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 tickBtnOk">
                <div className="tickBtnOkmake tickBtnOk ticket-form__btn">
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
                  <input
                    className=" ticket-form__btn2"
                    type="submit"
                    value="افزودن"
                    onClick={addNewCourse}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr className="table_tr">
                <p className="table_tdIndex">{index + 1}</p>
                <td>{course.name}</td>
                <td className="table_colorText">
                  {course.price === 0
                    ? "رایگان"
                    : `${course.price.toLocaleString()}`}
                </td>
                <td className="table_colorText">
                  {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                </td>
                <td className="table_colorText">{course.shortName}</td>
                <td className="table_colorText">{course.creator}</td>
                <td className="table_colorText">{course.categoryID.title}</td>
                <td>
                  <button type="button" className="btn btn-edit">
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
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                        <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                      </g>
                    </svg>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-trash"
                    onClick={() => removeCourse(course._id)}
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
