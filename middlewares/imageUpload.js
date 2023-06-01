const dotenv = require('dotenv');
dotenv.config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        const filename = file.originalname.replace(/\s/g, '-');
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-tour-image-${filename}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-tour-image-${filename}`,
        };
    },
});

module.exports = multer({ storage });