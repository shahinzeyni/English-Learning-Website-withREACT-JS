import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { useForm } from "../../hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import AuthContext from "../../context/authContext";

import "./Register.css";
import swal from "sweetalert";

export default function Register() {
  const authContext = useContext(AuthContext);
  const [isShowPassword,setIsShowPassword] = useState(false)
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
      phone: {
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
    },
    false
  );

  const registerNewUser = (event) => {
    event.preventDefault();

    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {

        if(res.ok) {
          return res.json()
        } else {
          if (res.status === 403) {
            swal({
              title: 'این شماره تماس مسدود شده',
              icon: 'error',
              buttons: 'ای بابا'
            })
          }
        }
      })
      .then((result) => {
        authContext.login(result.user, result.accessToken);
      });
  };
  
  const toggleChekerPassword = (event) => {
    event.preventDefault()


    if (isShowPassword) {
      setIsShowPassword(false);
    } else {
      setIsShowPassword(true);
    }
  }

  return (
    <>
      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <Link className="login__new-member-link" to="/">
            صفحه اصلی
          </Link>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="loginInputData">
              <div className="login-form__username">
                <Input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="login-form__username-input"
                  element="input"
                  id="name"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(6),
                    maxValidator(20)
                  ]}
                />
                <svg
                  className="login-form__username-icon"
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
                    strokeWidth={1.65}
                  >
                    <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                    <circle cx={10} cy={8} r={5}></circle>
                    <path d="M19 16v6m3-3h-6"></path>
                  </g>
                </svg>
              </div>
              <div className="login-form__username">
                <Input
                  type="text"
                  placeholder="نام کاربری"
                  className="login-form__username-input"
                  element="input"
                  id="username"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20)
                  ]}
                />
                <svg
                  className="login-form__username-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="6" r="4" />
                    <path
                      strokeLinecap="round"
                      d="M19.998 18c.002-.164.002-.331.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
                    />
                  </g>
                </svg>
              </div>
              <div className="login-form__username">
                <Input
                  type="text"
                  placeholder="شماره تماس"
                  className="login-form__username-input"
                  element="input"
                  id="phone"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(10), maxValidator(12)]}
                />
                <svg
                  className="login-form__username-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.733 2.043c1.217-1.21 3.221-.995 4.24.367l1.262 1.684c.83 1.108.756 2.656-.229 3.635l-.238.238a.653.653 0 0 0-.008.306c.063.408.404 1.272 1.832 2.692c1.428 1.42 2.298 1.76 2.712 1.824a.668.668 0 0 0 .315-.009l.408-.406c.876-.87 2.22-1.033 3.304-.444l1.91 1.04c1.637.888 2.05 3.112.71 4.445l-1.421 1.412c-.448.445-1.05.816-1.784.885c-1.81.169-6.027-.047-10.46-4.454c-4.137-4.114-4.931-7.702-5.032-9.47l.749-.042l-.749.042c-.05-.894.372-1.65.91-2.184zm3.04 1.266c-.507-.677-1.451-.731-1.983-.202l-1.57 1.56c-.33.328-.488.69-.468 1.036c.08 1.405.72 4.642 4.592 8.492c4.062 4.038 7.813 4.159 9.263 4.023c.296-.027.59-.181.865-.454l1.42-1.413c.578-.574.451-1.62-.367-2.064l-1.91-1.039c-.528-.286-1.146-.192-1.53.19l-.455.453l-.53-.532c.53.532.529.533.528.533l-.001.002l-.003.003l-.007.006l-.015.014a1.11 1.11 0 0 1-.136.106c-.08.053-.186.112-.319.161c-.27.101-.628.155-1.07.087c-.867-.133-2.016-.724-3.543-2.242c-1.526-1.518-2.122-2.66-2.256-3.526c-.069-.442-.014-.8.088-1.07a1.527 1.527 0 0 1 .238-.42l.032-.035l.014-.015l.006-.006l.003-.003l.002-.002l.53.53l-.53-.531l.288-.285c.428-.427.488-1.134.085-1.673z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="login-form__password">
                <Input
                  type="text"
                  placeholder="آدرس ایمیل"
                  className="login-form__username-input"
                  element="input"
                  id="email"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    maxValidator(25),
                    emailValidator()
                  ]}
                />
                <svg
                  className="login-form__username-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.729 7.59l7.205 4.13a3.956 3.956 0 0 0 3.975 0l7.225-4.13"
                    />
                  </g>
                </svg>
              </div>
              <div className="login-form__password">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  className="login-form__password-input"
                  element="input"
                  id="password"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18)
                  ]}
                />
                <button
                  className="passwordBtn"
                  onClick={(event) => toggleChekerPassword(event)}
                >
                {isShowPassword ? (
                  <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      d="M4.5 6.5v-3a3 3 0 0 1 6 0V4m-8 2.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
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
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" />
                        <path
                          strokeLinecap="round"
                          d="M6 10V8a6 6 0 1 1 12 0v2"
                        />
                      </g>
                    </svg>
                  </>
               
                )}
                </button>
              </div>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
