import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING!)
        console.log(connect.connection.host, connect.connection.name);

    }
    catch(err)
    {
        console.log("Unable to connect to database ", err);
        process.exit(1); //Exit process with failure
    }
}




