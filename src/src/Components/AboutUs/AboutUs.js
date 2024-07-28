import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از شروع مسیر کنارتیم نمیذاریم آب تو دلت تکون بخوره"
        />

        <div className="container">
          <div className="row">
            <AboutUsBox
              icon={
                <div className="iconParent1 iconParent">
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
                        d="M6 15.8L7.143 17L10 14M6 8.8L7.143 10L10 7"
                      />
                      <path d="M13 9h5m-5 7h5m4-4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536" />
                    </g>
                  </svg>
                </div>
              }
              title="سراغ حرفه ای ها رفتیم"
              animation={"animate__animated animate__zoomIn"}
              desc="به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید."
            />
            <AboutUsBox
              icon={
                <div className="iconParent2 iconParent">
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
                      <path d="M7 14a3 3 0 1 0 1 5.83" />
                      <path d="M4.264 15.605a4 4 0 0 1-.874-6.636m.03-.081A2.5 2.5 0 0 1 7 5.5m.238.065A2.5 2.5 0 1 1 12 4.5V20m-4 0a2 2 0 1 0 4 0m0-13a3 3 0 0 0 3 3m5.61-1.031A3.99 3.99 0 0 1 22 12c0 .703-.181 1.364-.5 1.938m-.92-5.05A2.5 2.5 0 0 0 17 5.5m-5-1a2.5 2.5 0 1 1 4.762 1.065M14 22a2 2 0 0 1-2-2m6.667-4L17 19h4l-1.667 3" />
                    </g>
                  </svg>
                </div>
              }
              title="تضمین کاملترین محتوا"
              animation={"animate__animated animate__zoomIn"}
              desc="بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری."
            />

            <AboutUsBox
              icon={
                <div className="iconParent3 iconParent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="currentColor"
                      d="M36.06 17.837c.868 0 1.601-.752 1.601-1.6V12.07c0-.887-.733-1.6-1.6-1.6c-.887 0-1.62.713-1.62 1.6v4.166c0 .848.733 1.6 1.62 1.6M24.858 21.54c.636.636 1.697.617 2.294 0c.58-.617.598-1.62 0-2.237l-2.988-2.97a1.583 1.583 0 0 0-2.237 0a1.606 1.606 0 0 0 0 2.256Zm20.113 0c.598.617 1.639.636 2.275 0l2.931-2.95a1.606 1.606 0 0 0 0-2.257a1.583 1.583 0 0 0-2.237 0l-2.97 2.97c-.616.617-.597 1.62 0 2.237M8.176 49.405h20.865c5.573 0 9.893-4.223 9.893-9.661v-.155c3.895-1.272 6.653-4.86 6.653-9.14a9.501 9.501 0 0 0-9.526-9.546a9.486 9.486 0 0 0-9.102 6.653c-2.314-2.642-5.554-4.184-9.218-4.184c-6.383 0-11.724 4.936-12.36 11.28C2.16 35.656 0 38.433 0 41.943c0 4.339 3.259 7.463 8.176 7.463M36.061 23.72c3.76 0 6.691 2.95 6.691 6.73c0 2.892-1.735 5.322-4.281 6.306c-1.234-3.684-4.724-6.268-9.121-6.538c.116-3.663 3.027-6.498 6.71-6.498M8.098 46.32c-3.278 0-5.014-1.89-5.014-4.3c0-2.044 1.196-3.857 4.03-4.609c.926-.25 1.274-.655 1.35-1.639c.444-5.4 4.455-9.295 9.276-9.295c3.741 0 6.653 2.064 8.446 5.65c.405.83.887 1.119 1.87 1.119c4.976 0 7.792 3.008 7.792 6.595c0 3.587-2.932 6.48-6.75 6.48Zm42.154-14.27h4.166c.867 0 1.581-.713 1.581-1.6a1.59 1.59 0 0 0-1.581-1.582h-4.166c-.867 0-1.6.714-1.6 1.582c0 .887.733 1.6 1.6 1.6M47.94 44.603c.617.617 1.62.598 2.237-.02c.618-.616.618-1.638 0-2.236l-2.97-2.95c-.616-.598-1.62-.618-2.236 0a1.607 1.607 0 0 0 0 2.256Z"
                    />
                  </svg>
                </div>
              }
              title="پشتیبانی دائمی"
              animation={"animate__animated animate__zoomIn"}
              desc="هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی."
            />

            <AboutUsBox
              icon={
                <div className="iconParent4 iconParent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path
                        strokeLinecap="round"
                        d="M21 16c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-3m13-8.998c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v2M8 4.002c-2.175.012-3.353.109-4.121.877c-.769.768-.865 1.946-.877 4.121M9 17.5h6"
                      />
                      <path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z" />
                      <path
                        strokeLinecap="round"
                        d="M8 14h1m7 0h-4m5-3.5h-2m-3 0H7"
                      />
                    </g>
                  </svg>
                </div>
              }
              title="پروژه محور در راستای بازار کار"
              animation={"animate__animated animate__zoomIn"}
              desc="کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
