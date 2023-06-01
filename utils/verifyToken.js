const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    // token expired 
    if(!token) {
        return res.status(401).send({ success: false, message: 'User not authorized'});
    }
    // verifying token
    else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            // invalid token
            if(err) {
                return res.status(401).send({ success: false, message: 'Token is Invalid' });
            }
            // token verified
            req.user = user;
            next();
        })
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        next();
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(401).send('User not authorized');
        }
    });
}

module.exports = {
    verifyUser,
    verifyAdmin
}