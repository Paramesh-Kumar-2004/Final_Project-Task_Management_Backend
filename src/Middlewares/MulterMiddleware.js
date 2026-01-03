import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "./CloudinaryConfig.js";



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: "auto",   // auto-detect image, pdf, doc, xls, etc...
        folder: "uploads",
    }
});

const upload = multer({ storage });

export default upload;