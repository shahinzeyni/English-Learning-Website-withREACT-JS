import React, { createContext,useContext ,useState,useEffect, useMemo} from "react";

import AuthContext from "../../../context/authContext";
import ProductShowDiscrbe from "../../../Components/ProductShowDiscrbe/ProductShowDiscrbe";
import isShowToggleContext from "./IsShowToggleContext";
import NavbarUserAdmin from "../../../Components/NavbarUserAdmin/NavbarUserAdmin";

import "../Courses/Courses.css";

export default function Index() {
  const authContext = useContext(AuthContext);
  const [ordersPrices, setOrdersPrices] = useState([]);
  const [countFreePrices,setcountFreePrices] = useState(0)
  const [countProducts,setCountProducts] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrdersPrices(data);
      });
    }, []);


    const price = useMemo(() => {
      let sum = 0
      ordersPrices.forEach(product => {
      sum += product.course.price

    })
    return sum 
    }, [ordersPrices])

    const countFree = useMemo(() => {
      let freeProduct = 0
      ordersPrices.forEach(product => {
      if(product.course.price === 0){
        freeProduct += 1
      }
    })
    return freeProduct 
    }, [ordersPrices])


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
    <>

      <NavbarUserAdmin />
      <div className="containerSize">
      <div className="userData_right1">
          <span className="main__title-text">
            <span className="main__title-name">
              {authContext.userInfos.name}
            </span>{" "}
            عزیز به پنل کاربری خوش اومدی
          </span>
        </div>
      </div>
      <ProductShowDiscrbe />

      <div className="containerSizeFlex">
      <div className="containerSizeUserPanel ">
        <div className="home-title titleAdmin">
          <span className="titleAdmin2">دوره های ثبت نام شده</span>
        </div>

        <div className="col-12 ">
          <div className="col-12">
            <div className="courses-header__panel">
              <ul className="courses-header__list">
                <li
                  className="courses-header__item"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowCourseState("all");
                    filterCourses("all");
                  }}
                >
                  <a
                    class={`courses-header__link__panel ${
                      showCourseState === "all"
                        ? "courses-header__link-active"
                        : null
                    }`}
                    href="#"
                  >
                    همه دوره ها
                  </a>
                </li>
                <li
                  className="courses-header__item"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowCourseState("free");
                    filterCourses("free");
                  }}
                >
                  <a
                    class={`courses-header__link__panel ${
                      showCourseState === "free"
                        ? "courses-header__link-active"
                        : null
                    }`}
                    href="#"
                  >
                    دوره های رایگان
                  </a>
                </li>
                <li
                  className="courses-header__item"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowCourseState("money");
                    filterCourses("money");
                  }}
                >
                  <a
                    class={`courses-header__link__panel ${
                      showCourseState === "money"
                        ? "courses-header__link-active"
                        : null
                    }`}
                    href="#"
                  >
                    دوره های پولی
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="courses1">
            <div className="main">
              <div className="row">
                <div className="col-12">
                  {shownCourses.length !== 0 ? (
                    <>
                      {shownCourses.map((item) => (
                        <div className="shopBoxes colmainBoxProduct">
                          <div className="shopBoxUser1">
                            <div className="shopBox_right">
                              <img
                                src={`http://localhost:4000/courses/covers/${item.course.cover}`}
                                alt=""
                                className="shopBoxImage"
                              />
                              <div className="shopBoxRight_content">
                                <p className="shopCourseTitleName">
                                  {item.course.name}
                                </p>
                                <p className="shopCourseTitleCreator">
                                  <div className="main__box-all">
                                    <span className="main__box-all-text">
                                      وضعیت:
                                    </span>
                                    <span className="main__box-all-value">
                                      {item.course.isComplete === 1
                                        ? "تکمیل شده"
                                        : "در حال برگزاری"}
                                    </span>
                                  </div>
                                </p>
                              </div>
                            </div>

                            <div className="shopBox_left">
                              <div className="shopLeft_price"></div>

                              <div className="shopLeftTrash">
                                <div className="main__box-completed">
                                  <span className="main__box-completed-text">
                                    مبلغ:
                                  </span>
                                  <span className="main__box-completed-value">
                                    {item.course.price === 0
                                      ? "رایگان"
                                      : `${item.course.price.toLocaleString()}تومان
                                    `}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="alert alert-danger">
                      دوره‌ای جهت نمایش برای این فیلتر وجود ندارد
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
