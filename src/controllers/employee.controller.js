import { EmpModel } from "../models/Employee.model.js";
import bcrypt from 'bcrypt';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js'

// export const registerEmp=async (fullName,email,password,officeLocation,address)=>{
//     try {

//         const hashedPass = await getHashedPass(password);
//         const emp = new EmpModel({email,fullName,hashedPass,officeLocation,address});
//         const registeredEmp= emp.save();

//         return ApiResponse(200,"Employee registered successfully",registeredEmp,true);
        
//     } catch (error) {
//         let err;
//         if(error?.errorResponse?.errmsg && error?.errorResponse?.errmsg.match("duplicate key")){
//            err =  "user already exists";
//         }else{
//             console.log(error);
            
//             err = "some internal error occured";
//         }
//         return new ApiResponse(400,err);
        
//     }
// }

export const registeredEmp = asyncHandler(async (req, res) => {

    const { fullName, email, password, officeLocation, address } = req.body;

    if ([fullName, email, password, officeLocation].some((field) => field?.trim() === '')
    ) {
        throw new ApiError(400, "All fields are required");
    }

   const emp= await EmpModel.findOne({email});

   if(emp){
    throw new ApiError(409,"employee already exists");
   }

   const newEmp = await EmpModel.create({
        fullName,
        email,
        password,
        officeLocation,
        address
   });

   const createdUser = await EmpModel.findById(newEmp._id).select("-password -refreshToken");
   if(!createdUser){
    throw new ApiError(500,"something went wrong while creating new user");
   }

   return res.status(201).json(
        new ApiResponse(201,"employee registered succesfully",createdUser,true)
   )

});







const getHashedPass= async(password)=>{
    return await bcrypt.hash(password,12);
}