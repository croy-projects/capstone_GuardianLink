const multer = require("multer");
const path = require("path");
const AppError = require('../errors/AppError');

// storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// file filter types accepted (pdf) 
const fileFilter = (req, file, cb) => {
    //regular expression (pattern) for allowed types
    const allowedTypes = /pdf/;
    // get extension of the file
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    
    const isValidMime = mime === "application/pdf";

    //  finds a match, otherwise false
    if (allowedTypes.test(ext) && isValidMime) {
        cb(null, true);
    } else {
        cb(new AppError("Only PDF allowed", 400));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;