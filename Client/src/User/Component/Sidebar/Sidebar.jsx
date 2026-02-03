import React from 'react'
import style from './Sidebar.module.css'
import { Link } from 'react-router'
const Sidebar = () => {
  return (
     
    
    <div className={style.container}>
    
      <div><Link to="/user/MyProfile">< div className={style.dis}>MyProfile</div></Link></div>
      
    </div>
  )
}

export default Sidebar

