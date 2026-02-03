import React from 'react'
import { Route, Routes } from 'react-router'
import MyProfile from '../Instructor/Pages/MyProfile/MyProfile'
import ChangePassword from '../Instructor/Pages/ChangePassword/ChangePassword'
import EditProfile from '../Instructor/Pages/EditProfile/EditProfile'
import AddCourse from '../Instructor/Pages/AddCourse/AddCourse'
import AddSection from '../Instructor/Pages/AddSection/AddSection'
import AddMaterials from '../Instructor/Pages/AddMaterials/AddMaterials'


const InstructorRouter = () => {
  return (
    <div>InstructorRouter
      <Routes>
        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="chnagepassword" element={<ChangePassword />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="addcourse" element={<AddCourse />} />
        <Route
          path="add-section/:courseId"
          element={<AddSection />}
        />
        <Route
          path="add-materials/:sectionId"
          element={<AddMaterials />}
        />



      </Routes>
    </div>
  )
}

export default InstructorRouter