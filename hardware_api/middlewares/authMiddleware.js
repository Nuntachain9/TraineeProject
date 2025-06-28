require('dotenv').config();

const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const authMiddleware = async (req, res, next) => {
    const database = req.app.locals.database;
    const encryptToken = req.header('userToken');
    const api_key = req.header('api_key');
    
    if (!encryptToken) {
        return res.status(403).json({ message: 'No Token Provided' });
    }

    try {
        const decryptToken = CryptoJS.AES.decrypt(encryptToken, process.env.ENCRYPT_TOKEN_SECRET);
        const decryptedToken = decryptToken.toString(CryptoJS.enc.Utf8);

        const decoded = jwt.verify(decryptedToken, process.env.ACCESS_TOKEN_SECRET);

        const isMatch = await database.collection("users").findOne({ 
            username: decoded.username, 
            api_key: api_key
        });
        
        if (!isMatch){
            return res.status(401).json({ message: 'UserToken or API Key Are Wrong' });
        }

        req.data = { "user": decoded };
        
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid Token' });
    }

};

module.exports = authMiddleware;