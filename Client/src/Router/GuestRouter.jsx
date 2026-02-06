import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../Guest/Pages/Login/Login'
import Registration from '../Guest/Pages/User/UserReg'
import InstructorReg from '../Guest/Pages/Instructor/InstructorReg'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/login"element={<Login/>}/>
            <Route path="/UserReg"element={<Registration/>}/>
            <Route path="/instuctor"element={<InstructorReg/>}/>

        </Routes>
    </div>
  )
}

export default GuestRouter