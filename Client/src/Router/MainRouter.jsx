import React from 'react'
import { Route, Routes } from 'react-router'
import AdminHome from '../Admin/Pages/AdminHome/AdminHome'
import GuestHome from '../Guest/Pages/GuestHome/GuestHome'
import BasicsHome from '../Basics/BasicsHome/BasicsHome'
import InstructorHome from '../Instructor/Pages/InstructorHome/InstructorHome'
import UserHome from '../User/Pages/UserHome/UserHome'

const MainRouter = () => {
  return (
    <div>
        <Routes>

            <Route path="/admin/*"element={<AdminHome/>}/>
             <Route path="/guest/*"element={<GuestHome/>}/>
             <Route path="/basics/*"element={<BasicsHome/>}/>
             <Route path="/instructor/*"element={<InstructorHome/>}/>
             <Route path="/user/*"element={<UserHome/>}/>
        </Routes>
    </div>
  )
}

export default MainRouter