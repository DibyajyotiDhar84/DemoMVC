import { Router } from "express";
import {authenticateEmp, registeredEmp} from '../controllers/employee.controller.js'


const router = Router();
router.route('/registerEmp').post(registeredEmp);
router.route('/authEmp').post(authenticateEmp);


export default router;