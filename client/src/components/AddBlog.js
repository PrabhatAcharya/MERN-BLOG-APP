import { Box,Typography, InputLabel, TextField, Button } from "@mui/material";
import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyle={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}

function AddBlog() {

  const URL = "https://mernblogbackend-2rv0.onrender.com";


 const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange=(event)=>{
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
   const sendRequest=async ()=>{
    const res = await axios
      .post(`${URL}/api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((error) => {
        console.log(error);
      });
   const data = await res.data;
   return data;
    
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
   
    sendRequest()
      .then((data) => {
        console.log(data);
      })
      .then(() => navigate("/blogs"));
  }
  return (
    <div>
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
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            value={inputs.imageURL}
            name="imageURL"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button sx={{mt:2,borderRadius:4}}  type="submit" variant="contained">Post</Button>
        </Box>
      </form>
    </div>
  );
}

export default AddBlog
