import { asyncHandler } from "../utils/asyncHandler.js";
import fileModel from "../models/file.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from 'crypto';

export const fileUpload = asyncHandler(async(req,res)=>{
   
    

    const hash=crypto.createHash('sha256').update(req.file.buffer).digest('hex');

    const existfile= await fileModel.findOne({hash});
    if(existfile){
        throw new ApiError(404,"duplicate file ");
    }
    const storeName=crypto.randomUUID()+`-${req.file.originalname}`;


    await new fileModel({
        fileName:req.file.originalname,
        storeName:storeName,
        contentType:req.file.mimetype,
        data:req.file.buffer,
        hash:hash,
    }).save();

    res.status(201).json(
        new ApiResponse(201,`${req.file.storeName} uploaded Succesfully`,null,true)
    )
});


export const downloadFile = asyncHandler(async(req,res)=>{
    
   const file = await fileModel.findById({_id:req.params.id});
   
   if(!file){
    throw new ApiError(404,"file not Found")
   }

   res.set({
    'Content-Type':file.contentType,
    'Content-Disposition':`attachment; filename=${file.storeName}`
   });

   res.send(file.data);

});