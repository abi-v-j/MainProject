import React from 'react'
import { Link } from 'react-router'
import style from './Navbar.module.css'

const Navbar = () => {
  return (
    
    <div className={style.container}>
    
      <div><Link to="/guest/login">< div className={style.dis}>Login</div></Link></div>
      <div><Link to="/guest/userReg">< div className={style.reg}>UserRegistration</div></Link></div>
    </div>
  )
}
    

export default Navbar