import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";


const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const BlogDetails = () => {
    const URL = "https://mernblogbackend-2rv0.onrender.com";
  const navigate=useNavigate();
  const [blog,setBlog]=useState();
  const id=useParams().id;
  // console.log("ParamId",id)
  const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
      setInputs((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };
  const fetchDetails=async () => {
    const res=await axios.get(`${URL}/api/blog/${id}`).catch(err=>console.log(err))
    const data=await res.data;
    return data;
  }
useEffect(()=>{
fetchDetails().then(data=>{
  setBlog(data.blog);
  setInputs({
    title: data.blog.title,
    description: data.blog.description,
    imageURL: data.blog.image,
  });
})
},[id])
// console.log(blog);
const sendRequest =async ()=>{
  const res=await axios.put(`${URL}/api/blog/update/${id}`,{
    title:inputs.title,
    description:inputs.description,
  }).catch(err => console.log(err));
  const data=await res.data;
}

const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(inputs)
  sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"))
}
  return (
    <div>
    {inputs &&
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor={"green"}
          borderRadius={10}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          display={"flex"}
          flexDirection={"column"}
          width={"50%"}
          margin={"auto"}
          marginTop={10}
        >
          <Typography variant="h4" margin={"auto"} fontWeight={"bold"}>
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            value={inputs.title}
            name="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField
            value={inputs.description}
            name="description"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
         
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            type="submit"
            variant="contained"
          >
            Post
          </Button>
        </Box>
      </form>
    }
    </div>
  );
}

export default BlogDetails;
