import mongoose from "mongoose";

async function Connection(username, password) {
  const URL = `mongodb://${username}:${password}@ac-kiocn1t-shard-00-00.tiwbgmp.mongodb.net:27017,ac-kiocn1t-shard-00-01.tiwbgmp.mongodb.net:27017,ac-kiocn1t-shard-00-02.tiwbgmp.mongodb.net:27017/?ssl=true&replicaSet=atlas-gkoysm-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting", error);
  }
}
export default Connection;
