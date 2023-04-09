import mongoose  from "mongoose";

const Schema= mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:"User",//we need to mention collection name for refrence
    required: true,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
