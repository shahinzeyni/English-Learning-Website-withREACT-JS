import React, { useState } from "react";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import LastArticles from "../../Components/LastArticles/LastArticles";
import LastCourses from "../../Components/LastCourses/LastCourses";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import "./Index.css";
import LevelScore from "../../Components/LevelScore/LevelScore";

export default function Index(props) {


  return (
    <>
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <LastArticles />
      <LevelScore/>
      <Footer />
    </>
  );
}
