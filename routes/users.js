const router = require('express').Router();
const { updateUser, deleteUser, getSingleUser, getAllUsers, usersCount } = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

// update user
router.put('/:id', verifyUser, updateUser);
// delete user
router.delete('/:id', verifyUser, deleteUser);
// get single user
router.get('/:id', verifyUser, getSingleUser);
// get all users
router.get('/', verifyAdmin, getAllUsers);
// get users count
router.get('/user/count', verifyAdmin, usersCount);

module.exports = router;