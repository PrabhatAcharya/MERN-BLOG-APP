import { Box,Button,TextField,Typography } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import {authActions} from "../store/index.js";
import {useNavigate} from "react-router-dom"

const Auth = () => {

    const URL = "https://mernblogbackend-2rv0.onrender.com";
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:"",
    
  })
  const handleChange=(event)=>{
    setInputs((prevState)=>({
      ...prevState,
      [event.target.name]:event.target.value,
    }))
  }
  const sendRequest=async(type="login")=>{
   const res = await axios
     .post(`${URL}/api/user/${type}`, {
      name:inputs.name,
       email: inputs.email,
       password: inputs.password,
     })
     .catch((error) =>{
      console.log("mymessage", error.response.data.message);
      alert(error.response.data.message);
     });
    const data=await res.data;
    // alert("Welcome");
    return data
  }
  const handleSubmit=(event)=>{
    event.preventDefault()
    console.log(inputs)
    if(isSignup){
      sendRequest("signup")
      .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then((data) => console.log(data));
    }else{
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  }
  const [isSignup, setisSignup] =useState(false)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              label="Name"
              margin="normal"
              value={inputs.name}
              onChange={handleChange}
              name="name"
            ></TextField>
          )}
          <TextField
            name="email"
            value={inputs.email}
            type="email"
            label="Email"
            margin="normal"
            onChange={handleChange}
          ></TextField>
          <TextField
            name="password"
            value={inputs.password}
            type="password"
            label="Password"
            margin="normal"
            onChange={handleChange}
          ></TextField>
          <Button type='submit' sx={{ borderRadius: 3, marginTop: 3 }} variant="contained">
            Submit
          </Button>
          <Button
            onClick={() => setisSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
          >
            {isSignup
              ? "Already have an account ! Login"
              : "Don't have an account ! Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth
