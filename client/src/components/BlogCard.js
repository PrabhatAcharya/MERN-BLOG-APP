import * as React from "react";
import { styled,Box } from "@mui/material/";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({myid,title,description,imageURL,userName,isUser}) {
  // console.log(title,isUser)
    const URL = "https://mernblogbackend-2rv0.onrender.com";
 const navigate = useNavigate();
  // console.log("BlogCard-id", myid);
  const handleEdit = () => {
    // console.log("handleEdit", myid);
    navigate(`/myBlogs/${myid}`);
  };
  const deleteRequest=async () => {
    const res = await axios.delete(`${URL}/api/blog/${myid}`).catch(err => console.log(err));
    const data=await res.data;
    return data;
  
  }
  const handleDelete =()=>{
    deleteRequest().then(()=>navigate("/"))
  }

  return (
    <div>
      {""}
      <Card
        sx={{
          width: "35%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": { boxShadow: "15px 15px 25px #ccc" },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              onClick={() => handleEdit()}
              sx={{ marginLeft: "auto" }}
            >
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          //   subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" image={imageURL} alt="image" />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>
            {":"}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
