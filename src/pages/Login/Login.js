import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";

import "./Login.css";

export default function Login() {
  const [isShowPassword,setIsShowPassword] = useState(false)
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)

  const [formState, onInputHandler] = useForm(
    {
      username: {
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

  const userLogin = (event) => {
    event.preventDefault();

    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        
        swal({
          title: "با موفقیت لاگین شدید",
          icon: "success",
          buttons: "ورود به پنل",
        }).then((value) => {
          navigate("/");
        });
        authContext.login({}, result.accessToken);
      })
      .catch((err) => {
        swal({
          title: "همچین کاربری وجود ندارد",
          icon: "error",
          buttons: "تلاش دوباره",
        });
      });
  };

  const onChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
  }
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
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <Link className="login__new-member-link" to="/">
              صفحه اصلی
            </Link>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام کنید
            </Link>
          </div>
          <form action="#" className="login-form">
          <div className="loginInputData">

            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                id="username"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20)
                ]}
                onInputHandler={onInputHandler}
              />

              <svg
                className="login-form__username-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#434668"
                  fillRule="evenodd"
                  d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0M12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414M4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339c-1.974 0-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="login-form__password">
              <Input
                element="input"
                id="password"
                type={isShowPassword ? "text" : "password"}
                className="login-form__password-input"
                placeholder="رمز عبور"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18)
                ]}
                onInputHandler={onInputHandler}
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
            <div className="login-form__password recaptcha-parent">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div>
          <Button
              className={`login-form__btn ${
                formState.isFormValid && isGoogleRecaptchaVerify
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={userLogin}
              disabled={!formState.isFormValid || !isGoogleRecaptchaVerify}
            >
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <Link className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </Link>
              </label>
            </div>
          </div>
          </form>
        </div>
      </section>
    </>
  );
}
