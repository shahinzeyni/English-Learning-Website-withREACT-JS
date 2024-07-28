import React, { useEffect, useState, useRef } from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import CourseBoxSwiper from "../CourseBoxSwiper/CourseBoxSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./PopularCourses.css";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then(res => res.json())
      .then(popularCourses => {
        setCourses(popularCourses);
      });
  }, []);

  const swiperRef = useRef(null);

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />

        <div className="">
          <Swiper
            ref={swiperRef}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0
              },
              1290: {
                slidesPerView: 4,
                spaceBetween: 0
              },
              1670: {
                slidesPerView: 4,
                spaceBetween: 0
              }
            }}
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseBoxSwiper {...course} isSlider={true} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiperBtns">
            <button
              id="previousButton"
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="swiperBtnPrev "
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 12l-6-6m6 6l-6 6m6-6H5"></path>
</svg>
            </button>
            <button
              id="nextButton"
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="swiperBtnNext"
            >
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12l6 6m-6-6l6-6"></path>
</svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
