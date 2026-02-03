import React from 'react'
import { Route, Routes } from 'react-router'
import MyProfile from '../User/Pages/MyProfile/MyProfile'
import ChangePassword from '../User/Pages/ChangePassword/ChangePassword'
import EditProfile from '../User/Pages/EditProfile/EditProfile'
import ViewCourse from '../User/Pages/ViewCouse/ViewCouse'
import ViewSections from '../User/Pages/ViewSections/ViewSections'
import ViewMaterials from '../User/Pages/ViewMaterials/ViewMaterials'
import MyCourses from '../User/Pages/MyCourses/MyCourses'

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="chnagepassword" element={<ChangePassword />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="courses" element={<ViewCourse />} />
        <Route path="mycourses" element={<MyCourses />} />
        <Route path="courses/:courseId" element={<ViewSections />} />
        <Route path="sections/:sectionId" element={<ViewMaterials />} />



      </Routes>
    </div>
  )
}

export default UserRouter