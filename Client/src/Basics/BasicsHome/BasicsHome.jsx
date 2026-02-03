import React from 'react'
import BasicRouter from '../../Router/BasicRouter'
import { Link } from 'react-router'

const BasicsHome = () => {
  return (
    <div>BasicsHome

        <div>
           <div><Link to="/basics/usestatehook">UseStateHook</Link></div>
             <div><Link to="/basics/counter">counter</Link></div>
             <div><Link to="/basics/Registerlist">Registerlist</Link></div>
            <BasicRouter/>
        </div>
    </div>
  )
}

export default BasicsHome