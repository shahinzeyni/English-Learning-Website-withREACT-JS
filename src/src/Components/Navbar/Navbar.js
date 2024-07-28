import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
import "./Navbar.css";


export default function Navbar() {
  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate()
  const [hambergerMenu,setHambergerMenu] = useState(false)


  const [isShowUserPanelHover,setIsShowUserPanelHover] = useState(false)
  const [issubMenuHamber,setIsSubMenuHamber] = useState(false)
  useEffect(() => {
    console.log(isShowUserPanelHover);
  },[])
  const isShowUserPanelHoverHandler = () => {
    if(isShowUserPanelHover){
      setIsShowUserPanelHover(false)
    }else{
      setIsShowUserPanelHover(true)
    }
  }

  const logOutHandler = (event) => {
    event.preventDefault()
    swal({
      title:"آیا از خروج اطمینان دارید؟",
      icon:"warning",
      buttons:['نه','آره'],
    }).then((result) => {
      if(result){
        swal({
          title: "با موفقیت خارج شدید",
          icon: "success",
          buttons: "اتمام",
        }).then(() => {
          authContext.logout();
          navigate("/");
        }
        )
      }
    })
  }
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus);

      });
  }, []);

  const [searchValue, setSearchValue] = useState('')

  

  const goToSearchPage = () => {
    navigate(`/search/${searchValue}`)
  }

  let menuRef = useRef()
  useEffect(()=>{
    let handler = (e) => {
      if(!menuRef.current.contains(e.target)){
        setHambergerMenu(false)
      
      }
    }
    document.addEventListener("mousedown",handler)
  },[])


  return (
    <div className="main-header" ref={menuRef}>
      <div
        className={`${
          isShowUserPanelHover
            ? "backgroundDropFilter active"
            : "backgroundDropFilter"
        }`}
        onClick={() => setIsShowUserPanelHover(false)}
      ></div>
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <div
              className="navBarIconMenu"
              onClick={() => {
                setHambergerMenu(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m6 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <ul
              className={`${
                hambergerMenu
                  ? "main-header__menu "
                  : "main-header__menu active"
              }`}
            >
              <div
                className="topbarIconClose "
                onClick={() => {
                  setHambergerMenu(false);
                }}
              >
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
                    strokeWidth="2"
                    d="M12 21a9 9 0 1 1 0-18a9 9 0 0 1 0 18zM9 9l6 6m0-6l-6 6"
                  />
                </svg>
              </div>
              <li className="main-header__item main-header__itemMainlink   ">
                <Link to="/" className="main-header__link1">
                  <span>صفحه اصلی</span>
                </Link>
              </li>

              {allMenus.map((menu, index) => (
                <li
                  className="main-header__item main-header__itemRes"
                  key={menu._id}
                  onClick={() => {
                    setIsSubMenuHamber(menu._id);
                  }}
                >
                  {hambergerMenu ? (
                    <>
                      <div className="main-header__link1" key={menu._id}>
                        <span className="main-header__link1">{menu.title}</span>
                        {menu.submenus.length !== 0 && (
                          <>
                            {menu._id === issubMenuHamber ? (
                              <>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"
                                  />
                                </svg>
                              </>
                            ) : (
                              <>
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
                                    strokeWidth="2.5"
                                    d="m14 7l-5 5m0 0l5 5"
                                  />
                                </svg>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      {menu._id === issubMenuHamber &&
                        menu.submenus.length !== 0 && (
                          <ul className="main-header__dropdownHamber">
                            {menu.submenus.map((submenu) => (
                              <li className="main-header__dropdown-item">
                                <Link
                                  to={`/category-info/english/1`}
                                  className="main-header__dropdown-link"
                                >
                                  {submenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </>
                  ) : (
                    <>
                      <Link
                        key={menu._id}
                        to={`/category-info${menu.href}/1`}
                        className="main-header__link1"
                      >
                        {menu.title}
                        {menu.submenus.length !== 0 && (
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 20 20"
                            >
                              <g fill="currentColor">
                                <path d="m15.68 7.116l-6 5l.64.768l6-5z" />
                                <path d="m16.32 7.884l-6 5c-.512.427-1.152-.341-.64-.768l6-5c.512-.427 1.152.341.64.768" />
                                <path d="m3.68 7.884l6 5l.64-.768l-6-5z" />
                                <path d="m4.32 7.116l6 5c.512.427-.128 1.195-.64.768l-6-5c-.512-.427.128-1.195.64-.768" />
                              </g>
                            </svg>
                            <ul className="main-header__dropdown">
                              {menu.submenus.map((submenu) => (
                                <li className="main-header__dropdown-item">
                                  <Link
                                    to={`/category-info/english/1`}
                                    className="main-header__dropdown-link"
                                  >
                                    {submenu.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Link>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__left">
            <div className="landing__searchbar">
              <input
                type="text"
                className="landing__searchbar-input"
                placeholder="چی  دوست داری یاد بگیری ..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button
                className="landing__searchbar-btn"
                type="submit"
                onClick={goToSearchPage}
              >
                <svg
                  className="landing__searchbar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975z"
                  />
                </svg>
              </button>
            </div>

            <Link to="/my-account/shop" className="main-header__cart-btn">
              <svg
                className="main-header__cart-icon"
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
                  strokeWidth="2"
                  d="M3 3h.268c.474 0 .711 0 .905.085c.17.076.316.197.42.351c.12.174.163.407.248.871L7 16h10.422c.453 0 .68 0 .868-.08a.998.998 0 0 0 .415-.331c.12-.165.171-.385.273-.826v-.003l1.57-6.8v-.001c.154-.669.232-1.004.147-1.267a1.001 1.001 0 0 0-.44-.55C20.019 6 19.676 6 18.99 6H5.5M18 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2M8 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                />
              </svg>
            </Link>

            {authContext.isLoggedIn ? (
              <div className="main-header__profile">
                <button
                  className="main-header__profile-text"
                  onClick={() => isShowUserPanelHoverHandler()}
                >
                  <svg
                    className="main-header__profileIconsUser"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="6" r="4" />
                      <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                    </g>
                  </svg>

                  <span>{authContext.userInfos.name}</span>
                </button>
                <ul
                  className={`${
                    isShowUserPanelHover
                      ? "mainHeader-profile-list active"
                      : "mainHeader-profile-list"
                  }`}
                >
                  <li className="mainHeader-profile-item">
                  
                    <Link
                      className="mainHeader-profile-itemLink"
                      to="/my-account"
                    >
                      <svg
                    href="/my-account"
                      className="mainHeader-profile-itemIcon1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M8.998 2.388a1.5 1.5 0 0 1 2.005 0l5.5 4.942A1.5 1.5 0 0 1 17 8.445v.956a3 3 0 0 0-1-.36v-.596a.5.5 0 0 0-.166-.371l-5.5-4.942a.5.5 0 0 0-.668 0l-5.5 4.942A.5.5 0 0 0 4 8.445V15.5a.5.5 0 0 0 .5.5H7a.5.5 0 0 0 .5-.5V12A1.5 1.5 0 0 1 9 10.5h2a1.5 1.5 0 0 1 1.5 1.5v2.207a2.5 2.5 0 0 0-1 .792v-3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5v3.5A1.5 1.5 0 0 1 7 17H4.5A1.5 1.5 0 0 1 3 15.5V8.446c0-.425.18-.83.498-1.115zM17.5 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S12 17.75 12 16.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5"
                      />
                    </svg>
                      پنل کاربری
                    </Link>{" "}
                  </li>
                  <li className="mainHeader-profile-item">
                    <Link
                      className="mainHeader-profile-itemLink"
                      to="/my-account/edit-account"
                    >
                    <svg
                      className="mainHeader-profile-itemIcon1"
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
                        strokeWidth={1.3}
                        d="M22 15.5h-8m8 3h-8m4 3h-4m-7-15h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827C22 8.59 22 9.893 22 12M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535c1.3 1.3 3.304 1.447 7.036 1.463"
                        color="currentColor"
                      ></path>
                    </svg>
                      جزئیات حساب{" "}
                    </Link>{" "}
                  </li>
                  <li className="mainHeader-profile-item">
                    <Link
                      className="mainHeader-profile-itemLink"
                      to="/my-account/tickets"
                    >
                    <svg
                      className="mainHeader-profile-itemIcon1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M14.39 4.114A3.5 3.5 0 0 1 17 7.5v2.1a5.5 5.5 0 0 1 1 .657V7.5A4.5 4.5 0 0 0 13.5 3h-7c-.818 0-1.544.393-2 1h9a3.5 3.5 0 0 1 .89.114M16 7.5v1.707a5.5 5.5 0 0 0-1-.185V7.5A1.5 1.5 0 0 0 13.5 6h-9A1.5 1.5 0 0 0 3 7.5v6A1.5 1.5 0 0 0 4.5 15H6v1.995L8.73 15h.292q.047.516.185 1h-.15L6.59 17.803A1 1 0 0 1 5 16.995V16h-.5A2.5 2.5 0 0 1 2 13.5v-6A2.5 2.5 0 0 1 4.5 5h9A2.5 2.5 0 0 1 16 7.5m3 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.146-1.854a.5.5 0 0 0-.708 0L13.5 15.293l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708"
                      ></path>
                    </svg>
                     
                      تیکت{" "}
                    </Link>{" "}
                  </li>
                  <li
                    className="mainHeader-profile-item mainHeader-profile-itemExit"
                    onClick={logOutHandler}
                  >
                    <svg
                      className="mainHeader-profile-itemIcon2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M12 1v8M6.994 4.52a9.044 9.044 0 0 0-1.358 1.116a9 9 0 1 0 11.37-1.117"
                      />
                    </svg>
                    خروج
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="main-header__profile1">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
