import {v2 as cloudinary} from 'cloudinary';
// import { log } from 'console';
const dotenv = require('dotenv');
import fs from 'fs'

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async(localFilePath) => {
    try {
            
        if(!localFilePath){
            //send message
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //send message uploaded
        console.log("file uploaded",response.url)
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove file from server if error
        //return something
    }
}


