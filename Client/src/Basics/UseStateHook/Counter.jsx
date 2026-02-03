import React, { useState } from 'react'

const Counter = () => {
     const[count,setcount]=useState(0);
  return (
    <div>
    <div>{count}</div>
<input type="button" value="Change " onClick={()=>{setcount(count+1)}}/>

    </div>

  )
}

export default Counter