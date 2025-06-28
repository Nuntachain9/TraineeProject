const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const authMiddleware = (req, res, next) => {

    const encryptToken = req.cookies.userToken;
    
    if (!encryptToken) {
        return res.status(403).json({ message: 'No Token provided' });
    }

    try {
        const decryptToken = CryptoJS.AES.decrypt(encryptToken, process.env.ENCRYPT_TOKEN_SECRET);
        const decryptedToken = decryptToken.toString(CryptoJS.enc.Utf8);

        const decoded = jwt.verify(decryptedToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        // if (decoded.exp * 1000 - new Date().getTime() <= 0){
        //     res.clearCookie('userToken');

        //     return res.status(401).json({ message: 'Token expired', redirect: '/login' });
        // }
        // console.log(decoded.exp * 1000, new Date().getTime())

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;