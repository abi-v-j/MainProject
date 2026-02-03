import React from 'react'


import InstructorRouter from '../../../Router/InstructorRouter'
import Navbar from '../../Components/Navbar/Navbar'


const InstructorHome = () => {
  return (
    <div>
        <Navbar/>
        <InstructorRouter/>
    </div>
  )
}

export default InstructorHome