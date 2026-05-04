import express, { urlencoded } from 'express';
import cors from 'cors'
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


export default app;