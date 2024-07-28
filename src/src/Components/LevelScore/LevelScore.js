import React from "react";
import { Link } from "react-router-dom";
import "./LevelScore.css";
import SectionHeader from "../SectionHeader/SectionHeader";
export default function LevelScore() {
  return (
    <section className="levelScore_section">
      <div className="container">
        <div className="row">
          <div className="col-6 order-lg-0 order-1 col-lg-6 col-12">
            <div className="levelScore_right animate__animated  animate__bounceInRight  ">
              <div className="levelScore_content">
                <h2 className="levelScore_title">آزمون تعیین سطح آنلاین</h2>
                <p className="levelScore_discribe">
                  این آزمون ، سطح حدودی دانش زبان انگلیسی شما را تعیین می کند.
                  بنابراین برای ثبت نام در دوره های زبان انگلیسی قابل اتکا نیست.
                </p>
                <button to="/" className="levelScore_btn">
                  شروع کنید
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m48-88a8 8 0 0 1-8 8h-60.69l18.35 18.34a8 8 0 0 1-11.32 11.32l-32-32a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 11.32L107.31 120H168a8 8 0 0 1 8 8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 order-lg-1 order-0 col-lg-6  col-12">
            <div className="levelScore_left animate__animated  animate__bounceInLeft  ">
              <img
                src="./images/landing/levelScore_person.svg"
                alt="pic_levelScore_person"
                className="levelScore_img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
