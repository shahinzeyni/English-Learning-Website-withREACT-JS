import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'

export default function PAdminPrivate({ children }) {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
      if( authContext.userInfos.name && authContext.userInfos.role !== "ADMIN"){
        navigate("/login")
      }
    },[authContext, navigate])

  return (
      <>
        {
            authContext.userInfos.role === 'ADMIN' ? <>{children}</> : null
        }
      </>
  )
}
