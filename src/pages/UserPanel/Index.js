import React,{useRef,useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/UserPanel/Sidebar/Sidebar'
import isShowToggleContext from './Index/IsShowToggleContext'
import './Index.css'
export default function Index() {
  const [isSidebarShow,setIsSidebarShow] = useState(false)

  const sidebarBtn = (data) => {
    setIsSidebarShow(data)
  }

  return (
    <isShowToggleContext.Provider  value={{ isSidebarShow, sidebarBtn }}>
      <div id="content"  className="contentUserPanel">
        <Sidebar />
        <div id="home" class="col-lg-10 col-12 main_col10sec main_col10sec2 ">
          <div  class="container-fluid home-content-userPanel" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </isShowToggleContext.Provider>
  );
}
