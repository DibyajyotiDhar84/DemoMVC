import {Schema,model} from 'mongoose';
import { zip } from 'rxjs';

const EmpOfficeLocSchema = new Schema(
    {
        country: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        building: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        zip: { type: String, required: true, trim: true, },
    },
    { timestamps: true }
);

EmpOfficeLocSchema.index({building:1,zip:1},{unique:true});

export const officeLocationModel=model('EmpOfficeLocation',EmpOfficeLocSchema);