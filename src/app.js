import express, { urlencoded } from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import env from 'dotenv'
env.config();

const app = express();
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors({origin:process.env.ORIGIN_URI}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send('true');
});

//routers-->>>
app.use('/user',userRouter);


export default app;