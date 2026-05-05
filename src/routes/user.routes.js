import { Router } from "express";
import {registeredEmp} from '../controllers/employee.controller.js'


const router = Router();
router.route('/registerEmp').post(registeredEmp);


export default router;