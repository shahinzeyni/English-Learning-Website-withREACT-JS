import React, { useEffect, useState } from "react";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import { minValidator, requiredValidator } from "../../../validators/rules";
import swal from "sweetalert";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";

export default function Offs() {
  const [courses, setCourses] = useState([]);
  const [offs, setOffs] = useState([]);
  const [offCourse, setOffCourse] = useState("-1");
  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllOffs();

    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);

  function getAllOffs() {
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        setOffs(allOffs);
      });
  }

  const createOff = (event) => {
    event.preventDefault();

    const newOffInfos = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
    };

    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {

      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت ایجاد شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllOffs();
        });
      }
    });
  };

  const removeOff = (offID) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کد تخفیف مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllOffs();
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
                  <label className="input-group__label">کد تخفیف</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    type="text"
                    id="code"
                    validations={[minValidator(5)]}
                    placeholder="لطفا کد تخفیف را وارد نمایید"
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="price input">
                <div className="input-group">
                  <label className="input-group__label">درصد تخفیف</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    type="text"
                    id="percent"
                    validations={[requiredValidator()]}
                    placeholder="لطفا درصد تخفیف را وارد نمایید"
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="name input">
                <div className="input-group">
                  <label className="input-group__label">حداکثر استفاده</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    type="text"
                    id="max"
                    validations={[requiredValidator()]}
                    placeholder="حداکثر استفاده از کد تخفیف"
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="price input">
                <div className="input-group">
                  <label
                    className="input-group__label"
                    style={{ display: "block" }}
                  >
                    دوره
                  </label>
                  <select
                    className="select-group"
                    onChange={(event) => setOffCourse(event.target.value)}
                  >
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form tickBtnOk">
                <div  className= "tickBtnOkmake tickBtnOk ticket-form__btn">
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
                  <input className=" ticket-form__btn2" type="submit" value="افزودن" onClick={createOff} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کد های تخفیف">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr className="table_tr" key={off._id}>
                <p className="table_tdIndex">{index + 1}</p>
                <td>{off.code}</td>
                <td className="table_colorText">{off.percent}</td>
                <td className="table_colorText">{off.max}</td>
                <td className="table_colorText">{off.uses}</td>
                <td className="table_colorText">{off.creator}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-trash"
                    onClick={() => removeOff(off._id)}
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
