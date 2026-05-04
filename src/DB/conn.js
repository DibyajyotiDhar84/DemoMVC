import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'
import env from "dotenv"
env.config()

const connectDB= async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("connection Success");
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;