const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user registeration
const registerUser = async (req, res) => {
    try {
        // hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        if (await User.findOne({ email: req.body.email }) || await User.findOne({ username: req.body.username })) {
            return res.status(403).send({ success: false, message: 'User Already Exists' });
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            photo: req.body.photo
        })

        await newUser.save();
        res.status(201).send({ success: true, message: 'Successfully created new user' })
    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to create user', err });
    }
}

// user login
const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        // user does not exist
        if (!user) {
            res.status(404).send({ success: false, message: 'User not found' });
        }
        // user exits in the database
        else {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            // password is incorrect
            if (!isValidPassword) {
                res.status(401).send({ success: false, message: 'Incorrect Credentials' });
            }
            // password is correct
            else {
                const { password, ...rest } = user._doc;
                const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

                // set token in browser cookies & send response to client
                res.cookie('accessToken', jwtToken, { expires: (new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) )})
                    .status(200)
                    .send({ success: true, jwtToken, data: { ...rest } });
            }
        }

    } catch (err) {
        res.status(500).send({ success: false, message: 'Failed to login' });
    }
}

module.exports = {
    registerUser,
    loginUser
}