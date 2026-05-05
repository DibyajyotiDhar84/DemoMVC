import { EmpModel } from "../models/Employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js";


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

   const createdEmployee = await EmpModel.findById(newEmp._id).select("-password -refreshToken");
   if(!createdEmployee){
    throw new ApiError(500,"something went wrong while creating new Employee");
   }

   return res.status(201).json(
        new ApiResponse(201,"employee registered succesfully",createdEmployee,true)
   )

});


export const authenticateEmp= asyncHandler(async (req,res)=>{

    const {email,password}=req.body;

    if([email,password].some((field)=>field?.trim ==='')){
        throw new ApiError(400,"need email and password to proceed")
    }
    const emp = await  EmpModel.findOne({email});
    if(!emp){
    throw new ApiError(409,"employee doesn't exists with this email");
   }

   if(!await emp.isCorrectPassword(password)){

    throw new ApiError(400,"Incorrect password");

   }

   const token = await emp.getAccessJWT();
   if(!token){
    throw new ApiError(400,"something went wrong in token creation");
   }

   return res.status(200).json(
    new ApiResponse(200,"employee logged in successfully",token,true)
   )

});

