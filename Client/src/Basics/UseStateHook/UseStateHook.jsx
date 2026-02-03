import React, { useState } from 'react'

const UseStateHook = () => {
    const[car,setcar]=useState("BMW ");
  return (
    <div>

    <div>{car}</div>
    <input type="button" value="Change Name" onClick={()=>{setcar("Benz")}}/>
    </div>
  )
}

export default UseStateHook