import React, {useState, useEffect } from 'react'
import axios from 'axios';
import BlogCard from './BlogCard';
const UserBlogs = () => {
    const URL = "https://mernblogbackend-2rv0.onrender.com";
  const id=localStorage.getItem('userId');
      const [user, setUser] = useState([]);

  const sendRequest=async () => {
    const res = await axios
      .get(`${URL}/api/blog/user/${id}`)
      .catch((err) => {
        console.error(err);
      });
  const data=await res.data;
  return data;
  }
  useEffect(() =>{
   sendRequest().then((data) => setUser(data.user));
  },[])
 console.log("YoYo", user.blog);
  return (
    <div>
      {user && user.blog &&
        user.blog.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              myid={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={user.name}
            />
          );
        })}
    </div>
  );
}

export default UserBlogs;
