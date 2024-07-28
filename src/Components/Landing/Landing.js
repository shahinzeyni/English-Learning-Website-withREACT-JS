import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import LandingCounter from "../LandingCounter/LandingCounter";

import "./Landing.css";

export default function Landing({ info }) {
  return (
    <section className="landing">
      <div className="container">
        <div className="row">
          <div className=" col-lg-6 col-md-12 order-lg-1 order-2">
            <div className="animate__animated  animate__bounceInRight landingcontents">
              <h1 className="landing__title">
                <span>یادگیری و آموزش زبان</span>
                <p> ساده تر از اونیـــــــه که فکرشو میکنـــــــی</p>
              </h1>
              <h2 className="landing__subtitle">
                زبان آموز، در راستــــای امــر ارتقــــاء سطــــح آمـوزش زبان‌
                ترکــی استانبولـــی، فرانسه، آلــمانی و زبان انگلیسی؛ تلاش بر
                این دارد تا یادگیری این زبان‌ها را با ابزارهـــــای
                کاربــــــــــردی و هم‌چنین پشتیبانـــــی قوی، برای
                زبان‌آمــــوزان راحـــت‌تر کند.
              </h2>
              <div className="landing_btns">
                <button className="landing_btn1">
                  <Typewriter
                    onInit={(typeWriter) => {
                      typeWriter
                        .typeString("شروع یادگیری")
                        .start()
                        .pauseFor(2000)
                        .deleteAll();
                    }}
                    options={{
                      loop: true
                    }}
                  />
                </button>
                <Link className="landing_btn2" to="/category-info/english/1">دوره ها</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-lg-2 order-1">
            <div className="landing_pic">
              <img
                src="/images/landing/person1.svg"
                className="land_pic"
                alt="landing_pic"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
