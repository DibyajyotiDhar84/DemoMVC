import connectDB from "./DB/conn.js";
import app from './app.js';
import env from 'dotenv'
env.config();



connectDB().then(()=>{
    app.listen(parseInt(process.env.PORT),()=>{
        console.log("listing in ",process.env.PORT);
    })
}).catch(err=>{
    console.log(err);
    
})