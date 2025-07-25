import {Company} from "../models/company.model.js";
import mongoose from "mongoose";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany= async (req,res)=>{
    try{
        
        const {companyName}= req.body;
        
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
                return res.status(400).json({
                    message:"You cannot register the same company ",
                    success:false
                })
        };
        company = await Company.create({
            name:companyName,
            userId: req.user._id
        });
        return res.status(201).json({
            message:"Company registered successfully ",
            company,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
} 

export const getCompany= async(req, res)=>{
    try{
        const userId = req.user._id;//logged i user id 
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message:"companies not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"compnaies found",
            companies,
            success:true
        })
}

    catch(error){
        console.log("Error in registerCompany:", error);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false,
            error: error.message // This will help in debugging
        });
    }
}

//get company by id 
export const getCompanybyId = async(req, res)=>{
    try{
        const companyId=req.params.id;
        const company = await Company.findOne({ _id: companyId });

        if(!company){
            return res.status(404).json({
                message:"Copany not found",
                success:false 
            })
             
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
              message: "Invalid company ID",
              success: false,
            });
          }
        return res.status(200).json({
            company,
            success:true
        })
    }
    catch(error){

    }
}

export const updateCompany= async(req,res)=>{
    try{
        const {name, description,website,location}=req.body;
        const file= req.file;
        //cloudianry 

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const logo = cloudResponse.secure_url;
        
        const updateData={name, description,website,location,logo};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
              message: "Invalid company ID",
              success: false,
            });
          }
          return res.status(200).json({
            message: "Company information updated",
            success: true, // <-- THIS is crucial
    
          });
    }
    catch(error){
        console.log(error);
    }
}