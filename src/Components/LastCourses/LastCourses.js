import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);

  return (
    <>
      <div className="courses  ">
        <div className="containerSize">
          <div>
            <SectionHeader
              title="جــدیدترین دوره ها"
              desc="سکوی پرتاپ شما به سمت موفقیت"
              btnTitle="تمامی دوره ها"
              btnHref="courses/1"
            />
                <div className="row courseBoxRow courses-content">
                  {courses.splice(0, 4).map((course) => (
                    <CourseBox {...course} key={course._id} />
                  ))}
                </div>
              </div>
        </div>
      </div>
    </>
  );
}

