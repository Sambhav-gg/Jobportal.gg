import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { getCompany,getCompanybyId,registerCompany,updateCompany } from "../controllers/company.controller.js";

import { singleUpload } from "../middlewares/multer.js";

const router =express.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanybyId);
router.route("/update/:id").put(singleUpload, isAuthenticated, updateCompany);



export default router;