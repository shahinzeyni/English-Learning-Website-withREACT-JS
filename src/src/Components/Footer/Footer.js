import React from "react";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";
import Input from "./../../Components/Form/Input";
import { emailValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";
import swal from "sweetalert";

import "./Footer.css";

export default function Footer() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const addNewEmail = event => {
    event.preventDefault();
    const newEmail = {
      email: formState.inputs.email.value
    };

    fetch("http://localhost:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEmail)
    }).then(res => {
      if (res.ok) {
        swal({
          title: "ایمیل شما با موفقیت در خبرنامه ثبت شد",
          icon: "success",
          buttons: "خیلی هم عالی"
        });
      }
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="درباره ما">
              <p className="footer-widgets__text">
                آکادمی انگلیسی در خصوص آموزش زبان انگلیسی با هدف تحصیل در
                بالاترین مقاطع علمی می باشد.
              </p>
            </FooterItem>

            <FooterItem title=" دسترسی سریع">
              <div className="footer-widgets__links">
                <a href="#" className="footer-widgets__link">
                  قوانین و مقررات
                </a>
                <a href="#" className="footer-widgets__link">
                  ارسال تیکت
                </a>
                <a href="#" className="footer-widgets__link">
                  همه دوره ها
                </a>
              </div>
            </FooterItem>

            <FooterItem title="لینک های مفید">
              <div className="row">
                <div className="col-12">
                  <a href="#" className="footer-widgets__link">
                    آموزش Ielts
                  </a>
                </div>

                <div className="col-12">
                  <a href="#" className="footer-widgets__link">
                    آموزش Tofel
                  </a>
                </div>

                <div className="col-12">
                  <a href="#" className="footer-widgets__link">
                    آموزش Speaking
                  </a>
                </div>
                <div className="col-12 FooterIcon1">
                  <a href="#" className="footer-widgets__link">
                    آموزش Writing
                  </a>
                </div>
              </div>
            </FooterItem>
            <FooterItem title="ارتباط با ما">
              <div className="col-6 FooterIcon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                >
                  <g fill="none">
                    <rect
                      width="256"
                      height="256"
                      fill="url(#skillIconsInstagram0)"
                      rx="60"
                    />
                    <rect
                      width="256"
                      height="256"
                      fill="url(#skillIconsInstagram1)"
                      rx="60"
                    />
                    <path
                      fill="white"
                      d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                    />
                    <defs>
                      <radialGradient
                        id="skillIconsInstagram0"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fd5" />
                        <stop offset=".1" stopColor="#fd5" />
                        <stop offset=".5" stopColor="#ff543e" />
                        <stop offset="1" stopColor="#c837ab" />
                      </radialGradient>
                      <radialGradient
                        id="skillIconsInstagram1"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#3771c8" />
                        <stop offset=".128" stopColor="#3771c8" />
                        <stop offset="1" stopColor="#60f" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </g>
                </svg>
                <span className="footerLinkSocial">English@</span>
              </div>
              <div className="col-6 FooterIcon2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                >
                  <defs>
                    <linearGradient
                      id="logosTelegram0"
                      x1="50%"
                      x2="50%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2aabee" />
                      <stop offset="100%" stopColor="#229ed9" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#logosTelegram0)"
                    d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"
                  />
                  <path
                    fill="white"
                    d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"
                  />
                </svg>
                <span className="footerLinkSocial">English@</span>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <span className="footer__copyright-text">
          کلیه حقوق برای شاهین زینی{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
          >
            <g fill="none">
              <path
                fill="#f8312f"
                d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"
              />
              <path
                fill="#ca0b4a"
                d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04c.254-.193.516-.4.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.706 9.706 0 0 1 3.087-.827"
              />
              <ellipse
                cx="23.477"
                cy="12.594"
                fill="#f37366"
                rx="2.836"
                ry="4.781"
                transform="rotate(30 23.477 12.594)"
              />
            </g>
          </svg>{" "}
          محفوظ است.
        </span>
      </div>
    </footer>
  );
}
