const upload = require('../middlewares/imageUpload');
const { uploadImage, getImage, deleteImage } = require('../controllers/imageUploadController');
const router = require('express').Router();

// upload an image to db
router.post('/', upload.single("file"), uploadImage);
// get an image from db
router.get('/:filename', getImage);
// delete an image from db
router.delete('/:filename', deleteImage);

module.exports = router;