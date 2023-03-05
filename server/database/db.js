import mongoose from "mongoose";

async function Connection(username , password){
    const URL = `mongodb://${username}:${password}@ac-xafndd4-shard-00-00.wsr2igd.mongodb.net:27017,ac-xafndd4-shard-00-01.wsr2igd.mongodb.net:27017,ac-xafndd4-shard-00-02.wsr2igd.mongodb.net:27017/?ssl=true&replicaSet=atlas-mnsqod-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL ,{useNewUrlParser : true});
        console.log("Database connection established");
    } catch(error) {
        console.log("Error connecting" , error);
    }

}
export default Connection;
