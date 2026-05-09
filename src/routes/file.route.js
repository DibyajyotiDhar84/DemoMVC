import { Router } from "express";
import { downloadFile, fileUpload } from "../controllers/file.controller.js";

import multer from 'multer';
const storage=multer.memoryStorage();
const upload = multer({storage});

const router = Router();

router.post('/upload',upload.single('myfile'),fileUpload);
router.get('/download/:id',downloadFile);


export default router;