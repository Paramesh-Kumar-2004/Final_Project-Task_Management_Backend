import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./CloudinaryConfig.js";




const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        public_id: (req, file) => {
            return Date.now() + "-" + file.originalname;
        }
    }
});

const upload = multer({ storage });

export default upload;