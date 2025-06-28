require('dotenv').config();

const Express = require("express");
const multer = require("multer");
const router = Express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

router.post('/Login', async (req, res) => {
    const database = req.app.locals.database;

    const { username, password } = req.body;
    
    if (
        typeof username !== 'string' ||
        typeof password !== 'string'
    ) {
        return res.status(400).json({ error: "Data type is incorrect" });
    }
    
    try {
        const user = await database.collection("users").findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Username or Password are wrong" });
        }

        const tokenData = {
            "username": username,
            "vendor_id": user.vendor_id,
        }

        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const userToken = CryptoJS.AES.encrypt(token, process.env.ENCRYPT_TOKEN_SECRET).toString();

        const api_key = user.api_key;

        const time = jwt.decode(token);
        return res.status(200).json(
            {
                "userToken": userToken,
                "api_key": api_key,
                "expires": time.exp * 1000
            }
        );
    } catch (error) {

        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
})

module.exports = router;