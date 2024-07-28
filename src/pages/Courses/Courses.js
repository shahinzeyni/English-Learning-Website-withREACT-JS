import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from './../../Components/Pagination/Pagination'

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb title="دوره ها" name="آموزش" />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row courseBoxRow">
                {shownCourses.map((course) => (
                  <CourseBox {...course} key={course._id} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={4}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
}
