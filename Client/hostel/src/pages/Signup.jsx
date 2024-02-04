// import { useState } from "react";
import { useState } from 'react';
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
// import {usenavigate} from "react-router-dom"

function Signup(){
  const [fname, setFirstName]= useState()
  const [lname, setLastName]= useState()
  const [phone, setPhone]= useState()
  const [email, setEmail]= useState()
  const [password, setPassword]= useState()
  const navigate = useNavigate()

  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/signup',{fname,lname,phone,email,password})
    .then(result=> {console.log(result)
    navigate('/Login')
    })
    .catch(err=> console.log(err) )
  }
    return(
        <>
        <div className="whole-container">
          <div className="left-container">

          </div>
        <div className="right-container">
        <form className="container" onSubmit={handleSubmit}>

    <div className="mb-3">
        <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
        <input type="text" className="form-control" id="exampleInputFirstName" aria-describedby="Fname" onChange={(e)=>setFirstName(e.target.value)}/>
        
  </div>         
  <div className="mb-3">
    <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
    <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="Lname" onChange={(e)=>setLastName(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label htmlFor="phoneNum" className="form-label">Phone Number</label>
    <input type="number" className="form-control" id="phoneNum" aria-describedby="phoneNum" onChange={(e)=>setPhone(e.target.value)} />
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} /> 
  </div>
  
  <button type="submit" className="btn btn-primary">Signup</button>
  
</form>
<p>Already have account?</p>
<Link to="/login" type="submit" className="btn btn-primary">Login</Link>

</div>
</div>
        </>
    )
}
export default Signup