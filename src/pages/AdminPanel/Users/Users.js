import React, { useEffect, useId, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../../validators/rules";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        setUsers(allUsers);
      });
  }

  const removeUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
              buttons: "تایید",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "تایید",
            });
          }
        });
      }
    });
  };

  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: `${formState.inputs.name.value}`,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        swal({
          title: "کاربر مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        });
        getAllUsers();
      });
  };

  const changeRole = (userID) => {

    swal({
      title: "لطفا نقش جدید را وارد نمایید:",
      content: 'input'
    }).then(value => {
      if(value.length) {
        const reqBodyInfos = {
          role: value,
          id: userID
        }

        fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          if(res.ok) {
            swal({
              title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
              icon: "success",
              buttons: "خیلی هم عالی"
            })
          }
        })
      }
    })

    
  }

  return (
    <>
      <div id="home-content" className="container-fluid sec_course">
        <div className="container">
          <div className="home-title titleAdmin">
            <span className="titleAdmin2">افزودن کاربر جدید</span>
          </div>
          <form className="form">
            <div className="col-md-6 col-12">
              <div className="name input">
                <div className="input-group">
                  <label className="input-group__label">
                    نام و نام خانوادگی
                  </label>
                  <Input
                    type="text"
                    className=""
                    id="name"
                    element="input"
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20)
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="family input">
                <div className="input-group">
                  <label className="input-group__label">نام کاربری</label>
                  <Input
                    type="text"
                    className=""
                    id="username"
                    element="input"
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20)
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا نام کاربری را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="email input">
                <div className="input-group">
                  <label className="input-group__label">ایمیل</label>
                  <Input
                    type="text"
                    className=""
                    id="email"
                    element="input"
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20),
                      emailValidator()
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا ایمیل کاربر را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="password input">
                <div className="input-group">
                  <label className="input-group__label">رمز عبور</label>
                  <Input
                    type="text"
                    className=""
                    id="password"
                    element="input"
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20)
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="phone input">
                <div className="input-group">
                  <label className="input-group__label">شماره تلفن</label>
                  <Input
                    type="text"
                    className=""
                    id="phone"
                    element="input"
                    validations={[
                      requiredValidator(),
                      minValidator(8),
                      maxValidator(20)
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                  />
                  <span className="error-message text-danger"></span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form tickBtnOk">
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
                    onClick={registerNewUser}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="کاربران">
        <table className="table">
          <thead className="table_th">
            <tr className="table_tr1">
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تغییر سطح</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="table_tr">
                <p className="table_tdIndex">{index + 1}</p>
                <td>{user.name}</td>

                <td className="table_colorText">{user.email}</td>
                <td className="table_colorText">
                  {user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
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
                    onClick={() => removeUser(user._id)}
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
                <td>
                  <button
                    type="button"
                    className="btn btn-ban"
                    onClick={() => banUser(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="currentColor"
                        d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2M4 18a13.93 13.93 0 0 1 3.43-9.15l19.72 19.72A14 14 0 0 1 4 18m24.57 9.15L8.85 7.43a14 14 0 0 1 19.72 19.72"
                        class="clr-i-outline clr-i-outline-path-1"
                      />
                      <path fill="none" d="M0 0h36v36H0z" />
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
