import React from 'react'
import { Link } from 'react-router'
import AdminRouter from '../../../Router/AdminRouter'
import Sidebar from '../../Component/Sidebar/Sidebar'
import Navbar from '../../Component/Navbar/Navbar'
import Style from './AdminHome.module.css'


const AdminHome = () => {
  return (
    <div className={Style.container}>

      {/* <Sidebar /> */}

      {/* <Navbar /> */}

      <main className={Style.content}><AdminRouter /></main>

    </div>

  )
}

export default AdminHome