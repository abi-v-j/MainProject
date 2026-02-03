import React from 'react'

import style from './UserHome.module.css'
import UserRouter from '../../../Router/UserRouter'
import Sidebar from '../../Component/Sidebar/Sidebar'



const UserHome = () => {
  return (
    <div className={style.container}>
    
     
     {/* <Sidebar/> */}
    
  
    <main className={style.content}><UserRouter /></main>
  
    </div>

  )
}

export default UserHome