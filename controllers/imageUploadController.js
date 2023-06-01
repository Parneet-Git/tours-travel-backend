const GridFSBucket = require('mongodb').GridFSBucket;
const ObjectID = require('mongodb').ObjectId;
const mongoose = require('mongoose');
let gfs;
mongoose.connection.once("open", () => {
    gfs = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'photos'
    });
})

const uploadImage = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.send("You must select a file");
        }
        res.status(201).json(req.file.filename);
    } catch (error) {
        res.send(error);
    }
}

const getImage = async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        const readStream = gfs.openDownloadStreamByName(file[0].filename);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(404).send("Image not found");
    }
}

const deleteImage = async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();
        const id = file[0]._id;
        await gfs.delete(new ObjectID(id));
        res.status(200).send("Image Successfully deleted");
    } catch (error) {
        res.status(500).send("Image not deleted");
    }
}

module.exports = {
    uploadImage,
    getImage,
    deleteImage
};