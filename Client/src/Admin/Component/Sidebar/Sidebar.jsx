import React from 'react'

import { Link } from 'react-router'
import Style from './Sidebar.module.css';
import { FaHandPointRight } from "react-icons/fa6";





const Sidebar = () => {
    return (
        <div>
            <div className={Style.Container}>

                <div>
                    <Link to="/admin/District"><h1 className={Style.dis}><FaHandPointRight />


                        District</h1></Link></div>

                <div className={Style.cat}><Link to="/admin/Category"><h1 className={Style.cat}><FaHandPointRight />


                    Category</h1></Link></div>
                <div className={Style.cat}><Link to="/admin/adminReg"><h1 className={Style.cat}><FaHandPointRight />


                    AdminRegistration</h1></Link></div>


                <div className={Style.cat}><Link to="/admin/InstructorReg"><h1 className={Style.cat}>InstructorRegistration</h1></Link></div>
                <div className={Style.cat}><Link to="/admin/SubCategory"><h1 className={Style.cat}>SubCategory</h1></Link></div>
                <div className={Style.cat}><Link to="/admin/Course"><h1 className={Style.cat}>Course</h1></Link></div>
            </div>
        </div>
    )
}

export default Sidebar