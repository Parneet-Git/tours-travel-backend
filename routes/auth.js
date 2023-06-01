const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/authController')

// route for registering new user
router.post('/register', registerUser);

// route for authenticating existing user
router.post('/login', loginUser);

module.exports = router;