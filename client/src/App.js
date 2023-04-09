import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store';
import HomePage from './components/HomePage.jsx';
function App() {
  const dispatch=useDispatch();
  const isLoggedIn =useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn)
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main >
        <Routes>
        <>
        <Route path="/auth" element={<Auth/>} />
        {!isLoggedIn ? ( <Route path="/" element={<HomePage />}/>) :
         
        ( <>

           <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/add" element={<AddBlog />} />
         </>)
        }
        </>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
