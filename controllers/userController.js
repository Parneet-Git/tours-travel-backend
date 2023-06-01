const User = require('../models/User');

// update user
const updateUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            $set: req.body
        }, { new: true });
        res.status(200).send({ success: true, message: 'User successfully updated', data: updatedUser });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to update user', err });
    }
}

// delete user
const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        await User.findByIdAndDelete(_id);
        res.status(200).send({ success: true, message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to delete user', err });
    }
}

// get single user
const getSingleUser = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        res.status(200).send({ success: true, data: user });
    } catch (err) {
        res.status(404).send({ success: false, message: 'Failed to get user', err });
    }
}

// get all users
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send({ success: true, data: users });
    } catch (err) {
        res.status(404).send({ success: false, message: 'Failed to get users', err });
    }
}

const usersCount = async (req, res) => {
    try {
        const count = await User.countDocuments({});
        res.status(200).send({ success: true, data: count });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Failed to get users count', error });
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    usersCount
}