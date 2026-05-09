
import {Schema,model } from "mongoose";
import { type } from "node:os";

const fileschema =   new Schema({

    fileName:{
        type:String,
    },
    storeName:{
        type:String,
    },
    contentType:{
        type:String,
    },
    data:{
        type:Buffer,
    },
    hash:{
        type:String,
        unique:true,
    },
    uploadedAt:{
        type:Date,
        default:Date.now,
    }
});

export default model("file",fileschema); 