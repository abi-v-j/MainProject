import React from 'react'
import { Route, Routes } from 'react-router'
import District from '../Admin/Pages/District/District'
import Category from '../Admin/Pages/Category/Category'
import AdminReg from '../Admin/Pages/Admin/AdminReg'
import SubCategory from '../Admin/Pages/SubCategory/SubCategory'
import Course from '../Admin/Pages/Course/Course'
import Topic from '../Admin/Pages/Topic/Topic'
import InstructorVerify from '../Admin/Pages/InstructorVerify/InstructorVerify'

const AdminRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='District'element={<District/>}></Route>
            <Route path='Category'element={<Category/>}></Route>
            <Route path='Topic'element={<Topic/>}></Route>
            <Route path='AdminReg' element={<AdminReg/>}></Route>
            <Route path='InstructorVerify' element={<InstructorVerify/>}></Route>
            <Route path='SubCategory' element={<SubCategory/>}></Route>
            <Route path='Course' element={<Course/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRouter
