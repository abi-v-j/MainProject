import React, { useState } from 'react'

const Registerlist = () => {
    const[name,setName]=useState(" ");
     const[email,setEmail]=useState(" ");
     const[password,setpassword]=useState(" ");
    
    
  return (
    <div>
        <div>{name}</div>
       < div><label>Name:</label>
        <input type="text" name="txt_name" onChange={(a)=>{setName(a.target.value)}}/></div>
        <div>{email}</div>
        <div><label>Email:</label>
        <input type="text" name="txt_email"onChange={(b)=>{setEmail(b.target.value)}}/></div>
        <div>{password}</div>
        <div><label>Password:</label>
        <input type="text" name="txt_pass"onChange={(c)=>{setpassword(c.target.value)}}/></div>


  </div>      
  )
}

export default Registerlist