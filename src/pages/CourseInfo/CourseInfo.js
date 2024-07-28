import React, { useState, useEffect, useContext } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { useParams, Link } from "react-router-dom";
import swal from "sweetalert";
import { toast,  Toaster } from 'react-hot-toast';
import AuthContext from "../../context/authContext";

import "./CourseInfo.css";

export default function CourseInfo() {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({});
  const [courseCategory, setCourseCategory] = useState({});
  const [courseCover, setCourseCover] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [toggleBtn,setToggleBtn] = useState(false)

  const userBagProduct = useContext(AuthContext)

  

  const { courseName } = useParams();

  useEffect(() => {
    getCourseDetails();

    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((allData) => {
    
        setRelatedCourses(allData);
      });
  }, []);

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem("token"));

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
  
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseDetails(courseInfo);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator);
        setCourseCategory(courseInfo.categoryID);
        setCourseCover(courseInfo.cover)
        setCoursePrice(courseInfo.price)
        

      });
  }


  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "کامنت موردنظر با موفقیت ثبت شد",
          icon: "success",
          buttons: "تایید",
        });
      });
  };


  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
           
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "تایید",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
              
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "تایید",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                

                  if (res.status == 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else if (res.status == 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else {
                    return res.json();
                  }
                })
                .then((code) => {
                  fetch(
                    `http://localhost:4000/v1/courses/${course._id}/register`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("user")).token
                        }`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price:
                          course.price - (course.price * code.percent) / 100,
                      }),
                    }
                  ).then((res) => {
                 
                    if (res.ok) {
                      swal({
                        title: "ثبت نام با موفقیت انجام شد",
                        icon: "success",
                        buttons: "تایید",
                      }).then(() => {
                        getCourseDetails();
                      });
                    }
                  });
                });
            }
          });
        }
      });
    }
  };
  const ToggleBtnHandler = () => {
    if(toggleBtn){
      setToggleBtn(false)
    }else{
      setToggleBtn(true)
    }
  }

  const notify = () => toast.success("با موفقیت افزوده شد.",{
    position: 'top-center',
    className:"toastsucces"
  })
    
 
  const notify2 = () => toast.error('قبلا افزوده شده است!',{
    className: 'toastError',
    position:"top-right"
  });
  return (
    <>
      <Toaster />
      <Topbar />
      <Navbar />

      <Breadcrumb title="دوره ها" name={courseDetails.name} />
      <section className="main_sec" id="course">
        <section className="course-info-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12 order-1 order-lg-0 courseInfoSection">
                <Link href="#" className="course-info__link">
                  {courseCategory.title}
                </Link>
                <h1 className="course-info__title">{courseDetails.name}</h1>

                <p className="course-info__text">
                  کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و سالانه
                  چندین کتابخانه جدید نیز به این لیست اضافه می شود که در به شدت
                  از آن ها استفاده می شود و اگر بدون بلد بودن وارد شوید، خیلی
                  اذیت خواهید شد و حتی ممکن است ناامید شوید!
                </p>
                <div className="course-info11">
                  <div className="course-info__register">
                    {courseDetails.isUserRegisteredToThisCourse === true ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <div className="courseInfo_price">
                        <div className="courseInfo_price_right">
                          <span
                            className="course-info__register-title"
                            onClick={() => {
                              let oldItems =
                                JSON.parse(localStorage.getItem("shopList")) ||
                                [];

                              let isUserAdded = oldItems.some(
                                (e) => e.title === courseDetails.name
                              );
                              if (!isUserAdded) {
                                let productDataBagShop = {
                                  id: courseDetails._id,
                                  title: courseDetails.name,
                                  price: coursePrice,
                                  teacherCourse: courseTeacher.name,
                                  img: courseCover
                                };

                                oldItems.push(productDataBagShop);
                                localStorage.setItem(
                                  "shopList",
                                  JSON.stringify(oldItems)
                                );

                                notify();
                              } else {
                                notify2();
                              }
                            }}
                          >
                            ثبت نام در دوره
                          </span>
                        </div>
                        <div className="courseInfo_price_left">
                          <span className="courseInfo_priceCourse">
                            {coursePrice.toLocaleString()}
                          </span>

                          <svg
                            className="ms-4"
                            width="25"
                            height="25"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="text-gray-880 dark:text-white"
                              d="M1.14878 6.91843C1.44428 6.91843 1.70285 6.87142 1.92447 6.77739C2.15282 6.68337 2.34422 6.55577 2.49869 6.39458C2.65316 6.2334 2.77069 6.04535 2.85128 5.83044C2.93187 5.62224 2.97888 5.40062 2.99231 5.16556H1.98492C1.6424 5.16556 1.36033 5.12862 1.1387 5.05474C0.917077 4.98087 0.742461 4.87341 0.614858 4.73238C0.487254 4.59134 0.396588 4.42344 0.34286 4.22868C0.295849 4.0272 0.272343 3.80221 0.272343 3.55372C0.272343 3.29852 0.309281 3.05674 0.383156 2.8284C0.457032 2.60005 0.564488 2.39857 0.705523 2.22396C0.846559 2.04934 1.02117 1.91167 1.22937 1.81093C1.44428 1.70347 1.68941 1.64974 1.96477 1.64974C2.1864 1.64974 2.39795 1.68668 2.59943 1.76056C2.80091 1.83443 2.97888 1.95196 3.13335 2.11315C3.28782 2.26761 3.40871 2.47245 3.49601 2.72766C3.59004 2.97615 3.63705 3.27837 3.63705 3.63431V4.47045H4.60415C4.68474 4.47045 4.73847 4.50068 4.76533 4.56112C4.79891 4.61485 4.8157 4.6988 4.8157 4.81297C4.8157 4.93386 4.79891 5.02452 4.76533 5.08497C4.73847 5.13869 4.68474 5.16556 4.60415 5.16556H3.6169C3.60347 5.49464 3.53631 5.80693 3.41542 6.10244C3.30125 6.39794 3.14007 6.65651 2.93187 6.87813C2.72368 7.09976 2.47518 7.27438 2.1864 7.40198C1.89761 7.5363 1.57188 7.60346 1.20922 7.60346H0.141381L0.0809373 6.91843H1.14878ZM0.896929 3.51343C0.896929 3.68133 0.913719 3.82572 0.947299 3.94661C0.987594 4.0675 1.0514 4.16823 1.1387 4.24883C1.23273 4.3227 1.35697 4.37979 1.51144 4.42008C1.66591 4.45366 1.86067 4.47045 2.09573 4.47045H3.00239V3.71491C3.00239 3.21792 2.90501 2.86198 2.71024 2.64707C2.51548 2.43215 2.24684 2.3247 1.90433 2.3247C1.58196 2.3247 1.33347 2.43215 1.15885 2.64707C0.984237 2.86198 0.896929 3.15076 0.896929 3.51343ZM6.26895 4.47045C6.35626 4.47045 6.41335 4.50068 6.44021 4.56112C6.47379 4.61485 6.49058 4.6988 6.49058 4.81297C6.49058 4.93386 6.47379 5.02452 6.44021 5.08497C6.41335 5.13869 6.35626 5.16556 6.26895 5.16556H4.60675C4.51944 5.16556 4.46235 5.13869 4.43549 5.08497C4.40191 5.03124 4.38512 4.94729 4.38512 4.83312C4.38512 4.71223 4.40191 4.62156 4.43549 4.56112C4.46235 4.50068 4.51944 4.47045 4.60675 4.47045H6.26895ZM7.93155 4.47045C8.01886 4.47045 8.07594 4.50068 8.10281 4.56112C8.13639 4.61485 8.15318 4.6988 8.15318 4.81297C8.15318 4.93386 8.13639 5.02452 8.10281 5.08497C8.07594 5.13869 8.01886 5.16556 7.93155 5.16556H6.26935C6.18204 5.16556 6.12495 5.13869 6.09809 5.08497C6.06451 5.03124 6.04772 4.94729 6.04772 4.83312C6.04772 4.71223 6.06451 4.62156 6.09809 4.56112C6.12495 4.50068 6.18204 4.47045 6.26935 4.47045H7.93155ZM9.59415 4.47045C9.68146 4.47045 9.73854 4.50068 9.76541 4.56112C9.79899 4.61485 9.81578 4.6988 9.81578 4.81297C9.81578 4.93386 9.79899 5.02452 9.76541 5.08497C9.73854 5.13869 9.68146 5.16556 9.59415 5.16556H7.93194C7.84464 5.16556 7.78755 5.13869 7.76069 5.08497C7.72711 5.03124 7.71032 4.94729 7.71032 4.83312C7.71032 4.71223 7.72711 4.62156 7.76069 4.56112C7.78755 4.50068 7.84464 4.47045 7.93194 4.47045H9.59415ZM11.2567 4.47045C11.3441 4.47045 11.4011 4.50068 11.428 4.56112C11.4616 4.61485 11.4784 4.6988 11.4784 4.81297C11.4784 4.93386 11.4616 5.02452 11.428 5.08497C11.4011 5.13869 11.3441 5.16556 11.2567 5.16556H9.59454C9.50723 5.16556 9.45015 5.13869 9.42328 5.08497C9.3897 5.03124 9.37291 4.94729 9.37291 4.83312C9.37291 4.71223 9.3897 4.62156 9.42328 4.56112C9.45015 4.50068 9.50723 4.47045 9.59454 4.47045H11.2567ZM12.1638 4.47045C12.4257 4.47045 12.6339 4.39994 12.7884 4.2589C12.9496 4.11787 13.0302 3.9231 13.0302 3.67461V2.2844H13.685V3.67461C13.685 4.15144 13.5506 4.52082 13.282 4.78275C13.0201 5.03795 12.6608 5.16556 12.2041 5.16556H11.2571C11.1698 5.16556 11.1127 5.13869 11.0859 5.08497C11.0523 5.03124 11.0355 4.94729 11.0355 4.83312C11.0355 4.71223 11.0523 4.62156 11.0859 4.56112C11.1127 4.50068 11.1698 4.47045 11.2571 4.47045H12.1638ZM13.7857 0.994934H12.9798V0.279683H13.7857V0.994934ZM12.5063 0.994934H11.7004V0.279683H12.5063V0.994934ZM5.64177 12.9641C5.64177 13.3267 5.58468 13.6659 5.47051 13.9815C5.35634 14.3039 5.1918 14.5826 4.97689 14.8177C4.76198 15.0595 4.50005 15.2509 4.19112 15.3919C3.8889 15.5329 3.54638 15.6035 3.16357 15.6035H2.56921C1.81702 15.6035 1.23273 15.3718 0.816337 14.9084C0.399946 14.445 0.191751 13.8103 0.191751 13.0044V11.2414H0.836485V12.9842C0.836485 13.273 0.870065 13.5349 0.937225 13.77C1.0111 14.0051 1.12191 14.2065 1.26967 14.3744C1.42413 14.549 1.61554 14.6834 1.84388 14.7774C2.07223 14.8714 2.34758 14.9184 2.66995 14.9184H3.1132C3.42885 14.9184 3.70421 14.8647 3.93927 14.7572C4.17433 14.6565 4.36909 14.5188 4.52356 14.3442C4.68474 14.1696 4.80227 13.9648 4.87615 13.7297C4.95674 13.4946 4.99703 13.2495 4.99703 12.9943V10.2844H5.64177V12.9641ZM3.21394 10.0628H2.36773V9.32738H3.21394V10.0628ZM8.24526 13.1656C8.07064 13.1656 7.90274 13.1421 7.74156 13.095C7.58038 13.0413 7.43598 12.954 7.30838 12.8331C7.18749 12.7122 7.09011 12.5544 7.01624 12.3596C6.94236 12.1582 6.90542 11.9097 6.90542 11.6142V6.9197H7.56023V11.4933C7.56023 11.7754 7.62067 12.0104 7.74156 12.1985C7.86916 12.3798 8.074 12.4705 8.35607 12.4705H8.52733C8.67508 12.4705 8.74896 12.5846 8.74896 12.813C8.74896 13.048 8.67508 13.1656 8.52733 13.1656H8.24526ZM8.69324 12.4705C8.95516 12.4705 9.15328 12.4067 9.2876 12.279C9.42192 12.1514 9.48908 11.9802 9.48908 11.7653V11.3825C9.48908 10.7982 9.63683 10.3415 9.93233 10.0124C10.2346 9.68332 10.6509 9.51878 11.1815 9.51878C11.4569 9.51878 11.6986 9.56243 11.9068 9.64974C12.115 9.73705 12.2863 9.8613 12.4206 10.0225C12.5616 10.1837 12.6657 10.3751 12.7329 10.5967C12.8001 10.8183 12.8336 11.0635 12.8336 11.3321C12.8336 11.9097 12.6825 12.3596 12.3803 12.682C12.0781 13.0044 11.6651 13.1656 11.1412 13.1656C10.8726 13.1656 10.614 13.1152 10.3655 13.0144C10.117 12.907 9.92226 12.7189 9.78123 12.4503C9.72078 12.6048 9.64691 12.729 9.5596 12.823C9.47229 12.9171 9.38162 12.9909 9.2876 13.0447C9.19358 13.0917 9.09284 13.1253 8.98538 13.1454C8.88464 13.1588 8.78726 13.1656 8.69324 13.1656H8.53205C8.44475 13.1656 8.38766 13.1387 8.3608 13.085C8.32722 13.0312 8.31043 12.9473 8.31043 12.8331C8.31043 12.7122 8.32722 12.6216 8.3608 12.5611C8.38766 12.5007 8.44475 12.4705 8.53205 12.4705H8.69324ZM12.1889 11.3925C12.1889 11.0433 12.1117 10.7612 11.9572 10.5463C11.8027 10.3247 11.5375 10.2139 11.1614 10.2139C10.4629 10.2139 10.1137 10.6202 10.1137 11.4328C10.1137 11.7754 10.2077 12.0339 10.3957 12.2085C10.5905 12.3831 10.839 12.4705 11.1412 12.4705C11.4837 12.4705 11.7423 12.3764 11.9169 12.1884C12.0982 12.0003 12.1889 11.7351 12.1889 11.3925Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-12 order-0 order-lg-1">
                <div className="video_CorseInfo">
                  <video
                    src=""
                    poster={`http://localhost:4000/courses/covers/${courseCover}`}
                    className="course-info__video"
                    controls
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="main">
          <div className="container">
            <div className="row">
              <div className=" col-lg-8 col-md-12 col-12">
                <div className="course">
                  <div className="course-boxes">
                    <div className="container">
                      <div className="row">
                        <CourseDetailBox
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                            >
                              <path
                                fill="currentColor"
                                d="M248 128a56 56 0 0 1-95.6 39.6l-.33-.35l-59.95-67.7a40 40 0 1 0 0 56.9l8.52-9.62a8 8 0 1 1 12 10.61l-8.69 9.81l-.33.35a56 56 0 1 1 0-79.2l.33.35l59.95 67.7a40 40 0 1 0 0-56.9l-8.52 9.62a8 8 0 1 1-12-10.61l8.69-9.81l.33-.35A56 56 0 0 1 248 128"
                              />
                            </svg>
                          }
                          title="وضعیت دوره"
                          text={
                            courseDetails.isComplete === 1
                              ? "به اتمام رسیده"
                              : "در حال برگزاری"
                          }
                        />
                        <CourseDetailBox
                          icon={
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
                                <path d="M12 6v6h6" />
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
                              </g>
                            </svg>
                          }
                          title="مدت زمان دوره"
                          text="40 ساعت"
                        />
                        <CourseDetailBox
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.194-.013h4.112c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.05.375.084.784.107 1.23a.747.747 0 0 1 .019.46c.027.801.027 1.712.027 2.743v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.031 0-1.942.027-2.744a.75.75 0 0 1 .02-.46c.022-.445.056-.854.106-1.229c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75m-4.237 8c-.013.653-.013 1.396-.013 2.25v2c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-2c0-.854 0-1.597-.013-2.25zm18.405-1.5H2.832c.016-.19.035-.369.058-.54c.135-1.005.389-1.585.812-2.008c.423-.423 1.003-.677 2.009-.812c1.028-.138 2.382-.14 4.289-.14h4c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812c.423.423.677 1.003.812 2.009c.023.17.042.35.058.539m-10.381 4.057a.75.75 0 0 1 .463.693v4a.75.75 0 0 1-1.5 0v-2.19l-.22.22a.75.75 0 0 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .817-.163M14 13.75a.25.25 0 0 0-.25.25v2a.25.25 0 1 0 .5 0v-2a.25.25 0 0 0-.25-.25m-1.75.25a1.75 1.75 0 1 1 3.5 0v2a1.75 1.75 0 1 1-3.5 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          }
                          title="آخرین بروزرسانی"
                          text={updatedAt.slice(0, 10)}
                        />
                        <CourseDetailBox
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0"
                              />
                            </svg>
                          }
                          title="روش پشتیبانی"
                          text="آنلاین"
                        />
                        <CourseDetailBox
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.25em"
                              height="1em"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm320 0v256h256V128zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4zM160 233.2l19 42.8h-38zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6l.5.5c12.4-13.1 22.5-28.3 29.8-45H376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"
                              />
                            </svg>
                          }
                          title="پیش نیاز"
                          text="انگلیسی در سطح متوسط"
                        />
                        <CourseDetailBox
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 28 28"
                            >
                              <path
                                fill="currentColor"
                                d="M5.75 6A3.75 3.75 0 0 0 2 9.75v8.5A3.75 3.75 0 0 0 5.75 22h9.5A3.75 3.75 0 0 0 19 18.25v-.503l4.252 2.936c1.16.801 2.744-.03 2.744-1.44V8.753c0-1.41-1.584-2.242-2.744-1.44L19 10.249V9.75A3.75 3.75 0 0 0 15.25 6zM19 12.071l5.104-3.524a.25.25 0 0 1 .392.206v10.49a.25.25 0 0 1-.392.206L19 15.923zM3.5 9.75A2.25 2.25 0 0 1 5.75 7.5h9.5a2.25 2.25 0 0 1 2.25 2.25v8.5a2.25 2.25 0 0 1-2.25 2.25h-9.5a2.25 2.25 0 0 1-2.25-2.25z"
                              />
                            </svg>
                          }
                          title="نوع مشاهده"
                          text="آنلاین"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Start Introduction */}
                  <div className="introduction">
                    <div
                      className={`${
                        toggleBtn
                          ? "intro_sub_height_max"
                          : "intro_sub_height_min introduction_min "
                      }`}
                    >
                      <div className="introduction__item">
                        <div className="introduction__topic_title titleAdminCourse introduction__topic_titleIcon ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                fill="currentColor"
                                d="M12 7a5 5 0 0 0-2 9.584V19h4v-2.416A5.001 5.001 0 0 0 12 7"
                              />
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.1"
                                d="M21 12h1m-3.5-6.5l1-1M12 3V2M5.5 5.5l-1-1M3 12H2m8 10h4m3-10a5 5 0 1 0-7 4.584V19h4v-2.416A5.001 5.001 0 0 0 17 12"
                              />
                            </g>
                          </svg>
                          توضیحات
                        </div>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <img
                          src="/images/landing/english-books-arrangement.jpg"
                          className="introduction__item_cover1"
                        />
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید کتابخانه های
                          بسیار زیادی برای زبان انگلیسی وجود دارد و سالانه چندین
                          کتابخانه جدید نیز به این لیست اضافه می شود که در به
                          شدت از آن ها استفاده می شود و اگر بدون بلد بودن وارد
                          شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید شوید!
                          شد و حتی ممکن است ناامید شوید!
                        </p>
                      </div>
                      <div className="introduction__item">
                        <span className="introduction__title title">
                          هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و
                          کسب درآمد)
                        </span>
                        <img
                          src="/images/landing/english-books2.jpg"
                          className="introduction__item_cover1"
                        />
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید!
                        </p>
                        <p className="introduction__text">
                          کتابخانه های بسیار زیادی برای زبان انگلیسی وجود دارد و
                          سالانه چندین کتابخانه جدید نیز به این لیست اضافه می
                          شود که در به شدت از آن ها استفاده می شود و اگر بدون
                          بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است
                          ناامید شوید کتابخانه های بسیار زیادی برای زبان انگلیسی
                          وجود دارد و سالانه چندین کتابخانه جدید نیز به این لیست
                          اضافه می شود که در به شدت از آن ها استفاده می شود و
                          اگر بدون بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی
                          ممکن است ناامید شوید! کتابخانه های بسیار زیادی برای
                          زبان انگلیسی وجود دارد و سالانه چندین کتابخانه جدید
                          نیز به این لیست اضافه می شود که در به شدت از آن ها
                          استفاده می شود و اگر بدون بلد بودن وارد شوید، خیلی
                          اذیت خواهید شد و حتی ممکن است ناامید شوید! کتابخانه
                          های بسیار زیادی برای زبان انگلیسی وجود دارد و سالانه
                          چندین کتابخانه جدید نیز به این لیست اضافه می شود که در
                          به شدت از آن ها استفاده می شود و اگر بدون بلد بودن
                          وارد شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید
                          شوید! کتابخانه های بسیار زیادی برای زبان انگلیسی وجود
                          دارد و سالانه چندین کتابخانه جدید نیز به این لیست
                          اضافه می شود که در به شدت از آن ها استفاده می شود و
                          اگر بدون بلد بودن وارد شوید، خیلی اذیت خواهید شد و حتی
                          ممکن است ناامید شوید! کتابخانه های بسیار زیادی برای
                          زبان انگلیسی وجود دارد و سالانه چندین کتابخانه جدید
                          نیز به این لیست اضافه می شود که در به شدت از آن ها
                          استفاده می شود و اگر بدون بلد بودن وارد شوید، خیلی
                          اذیت خواهید شد و حتی ممکن است ناامید شوید!
                        </p>
                      </div>
                    </div>
                    <div className="intro_btn_item1">
                      <button
                        href="#"
                        className="introduction__btns-item1 introduction__btns-item1_icon"
                        onClick={() => ToggleBtnHandler()}
                      >
                        مشاهده مطلب بیشتر
                        {toggleBtn ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16V8m0 0l3 3m-3-3l-3 3"
                              />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12.02 15.385l3.288-3.289l-.689-.688l-2.1 2.1V8.596H11.5v4.912l-2.1-2.1l-.688.688zM12.002 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Finish Introduction */}

                  <div className="introduction__topic">
                    <h2 className="introduction__topic_title titleAdminCourse introduction__topic_titleIcon ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 12 12"
                      >
                        <path
                          fill="currentColor"
                          d="M5.16 2.189a1.96 1.96 0 0 1 1.68 0l4.874 2.309a.5.5 0 0 1 .008.9l-4.85 2.406a1.96 1.96 0 0 1-1.744 0L1 5.756V8a.5.5 0 0 1-1 0V4.975a.5.5 0 0 1 .286-.477zM2 7.369V9a.5.5 0 0 0 .147.354l.002.003l.023.021l.06.056q.075.07.217.187c.187.153.457.355.794.558C3.913 10.58 4.877 11 6 11s2.088-.42 2.757-.821a6.7 6.7 0 0 0 1.012-.745l.06-.056l.016-.016l.006-.006l.001-.001l.002-.001A.5.5 0 0 0 10 9V7.368L7.316 8.7a2.96 2.96 0 0 1-2.632 0z"
                        />
                      </svg>
                      سر فصل
                    </h2>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header className="accHeader accHeader_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M5 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1.586l2.293 2.293A1 1 0 0 0 22 16V8a1 1 0 0 0-1.707-.707L18 9.586V8a3 3 0 0 0-3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          جلسات دوره{" "}
                        </Accordion.Header>
                        {sessions.length ? (
                          <>
                            {sessions.map((session, index) => (
                              <Accordion.Body
                                key={session._id}
                                className="introduction__accordion-body"
                              >
                                {session.free === 1 ||
                                courseDetails.isUserRegisteredToThisCourse ? (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className=" introduction__accordion-count">
                                        {index + 1}
                                      </span>
                                      <Link
                                        to={`/${courseName}/${session._id}`}
                                        className="introduction__accordion-link curser_pointer"
                                      >
                                        {session.title}
                                      </Link>
                                    </div>
                                    <div className="introduction__accordion-left introduction__accordion-iconPlay">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                        :00
                                      </span>
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
                                          color="currentColor"
                                        >
                                          <circle cx="12" cy="12" r="10" />
                                          <path d="M15.453 12.395c-.151.627-.867 1.07-2.3 1.955c-1.383.856-2.075 1.285-2.633 1.113a1.4 1.4 0 0 1-.61-.393c-.41-.45-.41-1.324-.41-3.07s0-2.62.41-3.07c.17-.186.38-.321.61-.392c.558-.173 1.25.256 2.634 1.112c1.432.886 2.148 1.329 2.3 1.955a1.7 1.7 0 0 1 0 .79" />
                                        </g>
                                      </svg>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">
                                        {index + 1}
                                      </span>

                                      <span className="introduction__accordion-link">
                                        {session.title}
                                      </span>
                                    </div>
                                    <div className="introduction__accordion-left introduction__accordion-icon">
                                      <span className="introduction__accordion-time">
                                        {session.time}
                                        :00
                                      </span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                      >
                                        <g fill="none" stroke="currentColor">
                                          <path d="M4.5 13.5c0-1.886 0-2.828.586-3.414C5.672 9.5 6.614 9.5 8.5 9.5h7c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v1c0 2.828 0 4.243-.879 5.121c-.878.879-2.293.879-5.121.879h-3c-2.828 0-4.243 0-5.121-.879C4.5 18.743 4.5 17.328 4.5 14.5z" />
                                          <path
                                            strokeLinecap="round"
                                            d="M16.5 9.5V8A4.5 4.5 0 0 0 12 3.5v0A4.5 4.5 0 0 0 7.5 8v1.5"
                                          />
                                        </g>
                                      </svg>
                                    </div>
                                  </>
                                )}
                              </Accordion.Body>
                            ))}
                          </>
                        ) : (
                          <div className="alert alert-danger">
                            ویدیو ها بزودی ...
                          </div>
                        )}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  {/* Start Teacher Details */}
                  <div className="techer-details">
                    <div className="techer-details__header">
                      <div className="techer-details__header-right">
                        <div className="headerCretorIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                              <path
                                fill="currentColor"
                                d="M11 4a3 3 0 1 0 0 6a3 3 0 0 0 0-6M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7M4.413 17.601c-.323.41-.413.72-.413.899c0 .122.037.251.255.426c.249.2.682.407 1.344.582C6.917 19.858 8.811 20 11 20c.222 0 .441-.002.658-.005a1 1 0 0 1 .027 2c-.226.003-.455.005-.685.005c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C6.425 13.695 8.605 13 11 13c.447 0 .887.024 1.316.07a1 1 0 0 1-.211 1.989C11.745 15.02 11.375 15 11 15c-2.023 0-3.843.59-5.136 1.379c-.647.394-1.135.822-1.45 1.222Zm14.451-3.604a1 1 0 0 0-1.728 0l-.91 1.562l-1.766.382a1 1 0 0 0-.534 1.644l1.204 1.348l-.182 1.798a1 1 0 0 0 1.398 1.016l1.654-.73l1.654.73a1 1 0 0 0 1.398-1.016l-.182-1.799l1.204-1.347a1 1 0 0 0-.534-1.644l-1.766-.382zm-1.131 2.949l.267-.46l.267.46a1 1 0 0 0 .653.474l.52.112l-.355.397a1 1 0 0 0-.25.767l.054.528l-.486-.214a1 1 0 0 0-.806 0l-.486.214l.053-.528a1 1 0 0 0-.25-.767l-.353-.397l.52-.112a1 1 0 0 0 .652-.474"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="techer-details__header-titles">
                          <Link className="techer-details__header-link">
                            {courseTeacher.name}
                          </Link>
                          <span className="techer-details__header-skill">
                            English Teacher
                          </span>
                        </div>
                      </div>
                      <div className="techer-details__header-left">
                        <span className="techer-details__header-name">
                          مدرس
                        </span>
                      </div>
                    </div>
                    <p className="techer-details__footer">
                      اول از همه زبان انگلیسی رو شروع کردم و نزدیک به 2 سال
                      بصورت پیشرفته کار میکردم .بعد تصمیم گرفتم در زمینه آموزش
                      های آنلاین فعالیت داشته باشم.و..
                    </p>
                  </div>
                  {/* Finish Teacher Details */}
                  <CommentsTextArea
                    comments={comments}
                    submitComment={submitComment}
                  />
                </div>
              </div>

              <div className=" col-lg-4 col-md-12 col-12">
                <div className="courses-info">
                  <div className="course-info1">
                    <div className="course-info__total">
                      <div className="course-info__bottom">
                        <div className="course-info__total-comment course-info__total-comment-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
                            />
                          </svg>

                          <span className="course-info__total-comment-text">
                            5.0
                          </span>
                        </div>
                        <div className="course-info__top">
                          <div className="course-info__total-sale course-info__total-sale-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.25em"
                              height="1em"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M211.2 96a64 64 0 1 0-128 0a64 64 0 1 0 128 0M32 256c0 17.7 14.3 32 32 32h85.6c10.1-39.4 38.6-71.5 75.8-86.6c-9.7-6-21.2-9.4-33.4-9.4H96c-35.3 0-64 28.7-64 64m461.6 32H576c17.7 0 32-14.3 32-32c0-35.3-28.7-64-64-64h-96c-11.7 0-22.7 3.1-32.1 8.6c38.1 14.8 67.4 47.3 77.7 87.4m-102.4-61.6c-6.9-1.6-14.2-2.4-21.6-2.4h-96c-8.5 0-16.7 1.1-24.5 3.1c-30.8 8.1-55.6 31.1-66.1 60.9c-3.5 10-5.5 20.8-5.5 32c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32c0-11.2-1.9-22-5.5-32c-10.8-30.7-36.8-54.2-68.9-61.6zM563.2 96a64 64 0 1 0-128 0a64 64 0 1 0 128 0m-241.6 96a80 80 0 1 0 0-160a80 80 0 1 0 0 160M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32h576c17.7 0 32-14.3 32-32s-14.3-32-32-32z"
                              />
                            </svg>
                            <span className="course-info__total-sale-text">
                              دانشجو
                            </span>
                            <span className="course-info__total-sale-number">
                              {courseDetails.courseStudentsCount}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="course-info__top1">
                        <div className="course-info__total-sale">
                          <div className="course-progress">
                            <div className="course-progress__header">
                              <span className="course-progress__title">
                                درصد تکمیل دوره: %25
                              </span>
                            </div>
                            <div className="progress course-progress__bar">
                              <div
                                className="progress-bar "
                                role="progressbar"
                                aria-label="Animated striped example"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="course-info2">
                    <div className="course-info__header-short-url">
                      <i className="fas fa-link course-info__short-url-icon"></i>
                      <span className="course-info__short-url-text">
                        لینک کوتاه
                      </span>
                    </div>
                    <span className="course-info__short-url">
                      https://EnglishLearning.ir/?p=117472
                    </span>
                  </div>

                  {relatedCourses.length !== 0 && (
                    <div className="course-info-2">
                      <span className="course-info__courses-title">
                        دوره های مرتبط
                      </span>
                      <ul className="course-info__courses-list">
                        {relatedCourses.map((course) => (
                          <li className="course-info__courses-list-item">
                            <Link
                              to={`/course-info/${course.shortName}`}
                              className="course-info__courses-link"
                            >
                              <img
                                src={`http://localhost:4000/courses/covers/${course.cover}`}
                                alt="Course Cover"
                                className="course-info__courses-img"
                              />
                              <span className="course-info__courses-text">
                                {course.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
