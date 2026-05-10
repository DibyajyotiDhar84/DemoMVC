import { Schema, model } from 'mongoose';

const EmpSkillsSchema = new Schema(
    {
        isPermanentEmp: { type: Boolean, default: true },
        skillset: { type: [String], default: [] }
    },
    { timestamps: true }
);

export const skillsModel = model('EmpSkills', EmpSkillsSchema);