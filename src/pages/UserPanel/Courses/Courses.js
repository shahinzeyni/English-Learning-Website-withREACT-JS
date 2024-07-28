import React, { useEffect, useState } from "react";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showCourseState, setShowCourseState] = useState("all");
  const [shownCourses, setShownCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setShownCourses(data);
      });
  }, []);

  const filterCourses = (state) => {
    switch (state) {
      case "all": {
        setShownCourses(courses);
        break;
      }
      case "free": {
        const filteredCourses = courses.filter(
          (course) => course.course.price === 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      case "money": {
        const filteredCourses = courses.filter(
          (course) => course.course.price !== 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      default: {
        setShownCourses(courses);
      }
    }
  };

  return (
  <></>
  );
}

