import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import util from "util";
import env from 'dotenv'
env.config();

const employeeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    officeLocation: {
        type: String,
        required: true,
    },
    address: {

        pincode: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        }
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});

employeeSchema.pre("save",async function () {
   if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
    
});

employeeSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);

};


employeeSchema.methods.getAccessJWT = async function () {

    const signJWT = util.promisify(jwt.sign);
    const payLoad = {
        employee: {
            email: this.email,
            fullname: this.fullName,
            officeloc: this.officeLocation,
            address: {
                pincode: this.address.pincode,
                city: this.address.city,
                state: this.address.state
            }
        }

    }

    return await signJWT(payLoad, process.env.ACCESS_SECRECT_KEY, { expiresIn: process.env.ACCESS_EXPIRY });

}


employeeSchema.methods.getRefreshJWT = async function () {

    const signJWT = util.promisify(jwt.sign);

    const payLoad = {
        employee: {
            email: this.email,
            fullname: this.fullName,
            officeloc: this.officeLocation,
            address: {
                pincode: this.address.pincode,
                city: this.address.city,
                state: this.address.state
            }
        }

    }

    return await signJWT(payLoad, process.env.REFRESH_SECRECT_KEY, { expiresIn: process.env.REFRESH_EXPIRY });

}


export const EmpModel = model('employees', employeeSchema);