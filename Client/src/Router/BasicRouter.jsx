import React from 'react'
import { Route, Routes } from 'react-router'
import UseStateHook from '../Basics/UseStateHook/UseStateHook'
import Counter from '../Basics/UseStateHook/Counter'
import Registerlist from '../Basics/UseStateHook/Registerlist'

const BasicRouter = () => {
  return (
    <div>BasicRouter

        <Routes>
            <Route path="usestatehook" element={<UseStateHook/>}/>
            <Route path="counter" element={<Counter/>}/>
             <Route path="Registerlist" element={<Registerlist/>}/>


        </Routes>
    </div>
  )
}

export default BasicRouter