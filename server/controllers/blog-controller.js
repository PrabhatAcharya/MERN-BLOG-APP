import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs=async (req, res, next) =>{
    let blogs;
    try{
        blogs=await Blog.find().populate('user');
    }catch(err){
        return console.error(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs found"});
    }
    return res.status(200).json({blogs});
}
export const addBlog=async (req, res, next) =>{

    const {title, description,image,user} = req.body;
    let existingUser;
    try {
        existingUser=await User.findById(user);
    } catch (error) {
        return console.error(error);
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found By the Id of the user"}); 
    }
     const blog = new Blog({
       title,
       description,
       image,
       user,
     });
    try {
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blog.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
    console.error(error);
    return res.status(500).json({message:error});
    }
    return res.status(200).json({blog});
}
export const updateBlog=async (req, res, next) =>{
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
        try {
             blog = await Blog.findByIdAndUpdate(blogId, {
               title,
               description,
             });
        } catch (error) {
            return console.error(error);
        }
        if(!blog){
            return res.status(500).json({message:"Unable to Update Blog"});
        }
        return res.status(200).json({blog});
}
export const getById=async(req, res,next) =>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.error(error);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog});
}
export const deleteBlog=async(req, res, next) =>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        //we need to remove this from user also we have use populate method and pull to remove
        await blog.user.blog.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.error(error);
        
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delte"});
    }
    return res.status(200).json({message:"Successfully deleted blog"});
}
export const getByUserId = async (req, res,next) => {
    let userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blog")
    }catch(error) {
        return console.error(error);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog found"});
    }
    return res.status(200).json({user:userBlogs})
}