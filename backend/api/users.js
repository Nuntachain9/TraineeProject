const Express = require("express");
const multer = require("multer");
const router = Express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

// User Format
// {
//     "user_id": 1,
//     "vendor_id": 1,
//     "role_id": 1,
//     "firstname": "Nuntachai",
//     "lastname": "Nakprasert",
//     "username": "nuntachain9",
//     "password": "1234",
//     "phone": 658473261,
//     "email": "nuntachai@gmail.com",
//     "api_key": 'Random hex ',
//     "create_at": "2025-02-11T14:30:00Z", * From System
//     "create_by": "username",             * From System
//     "update_at": "2025-02-11T14:32:00Z", * From System
//     "update_by": "username"              * From System
// }

router.get('/GetUsers', async (req, res) => {
    const database = req.app.locals.database;

    try {
        const result = await database.collection("users").find({}).toArray();
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.get('/Getprofile', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    try {
        const result = await database.collection("users").findOne({ username: authUsername });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.post('/AddUser', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username || null;

    const {
        vendor_id,
        role_id,
        firstname,
        lastname,
        username,
        password,
        phone,
        email
    } = req.body;

    if (
        typeof vendor_id !== 'number' ||
        typeof role_id !== 'number' ||
        typeof firstname !== 'string' ||
        typeof lastname !== 'string' ||
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof phone !== 'number' ||
        typeof email !== 'string'
    ) {
        return res.status(400).send("Data is incorrect");
    }

    let lastUser;
    try {
        const checkUsername = await database.collection("users").findOne({ username: username });

        if (checkUsername) {
            return res.status(409).json({ error: "The username is already used" });
        }

        lastUser = await database.collection("users").find().sort({ user_id: -1 }).limit(1).project({ user_id: 1 }).toArray();
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }

    const user_id = lastUser.length > 0 ? lastUser[0].user_id + 1 : 1;
    const api_key = crypto.randomBytes(32).toString("hex");
    const create_at = new Date();
    const update_at = new Date();
    const encodePassword = await bcrypt.hash(password, 10);
    let create_by;
    let update_by;

    if (authUsername) {
        create_by = authUsername;
        update_by = authUsername;
    } else {
        create_by = "Postman";
        update_by = "Postman";
    }

    const newUser = {
        "user_id": user_id,
        "vendor_id": vendor_id,
        "role_id": role_id,
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "password": encodePassword,
        "phone": phone,
        "email": email,
        "secret_key": secret_key,
        "api_key": api_key,
        "create_at": create_at,
        "create_by": create_by,
        "update_at": update_at,
        "update_by": update_by
    }

    try {
        await database.collection("users").insertOne(newUser);

        return res.status(201).json({
            "Message": "Insert User Successfully",
            "Data": newUser
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.post('/Login', async (req, res) => {
    const database = req.app.locals.database;

    const { username, password } = req.body;

    try {
        const user = await database.collection("users").findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const permission_inrole = await database.collection("roles").findOne({ role_id: user.role_id });
        const permission = await database.collection("functions").find({ function_id: permission_inrole.function_id }).project({ _id: 0 }).toArray();

        const tokenData = {
            "username": username,
            "vendor_id": user.vendor_id,
            "role_id": user.role_id,
            "permissions": permission
        }

        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const encryptToken = CryptoJS.AES.encrypt(token, process.env.ENCRYPT_TOKEN_SECRET).toString();

        res.cookie('userToken', encryptToken, {
            httpOnly: false,
            secure: true,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000 // หลักเวลาแต่ละหน่วย (วัน * ชั่วโมง * นาที * วินาที * มิลลิวินาที) Max
        });

        return res.status(200).send(encryptToken);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
})

router.patch('/ReAPI_Key', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const newAPI_Key = crypto.randomBytes(32).toString('hex');
    const update_at = new Date();
    const update_by = authUsername;

    try {
        const userUpdate = await database.collection("users").updateOne(
            { username: authUsername },
            {
                $set:
                {
                    "api_key": newAPI_Key,
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );

        if (userUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "User not found or API key not updated" });
        }

        return res.status(200).json({
            message: "updated user data successfully",
            newAPI_Key: newAPI_Key
        });

    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
})

router.patch('/Update_Account', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const { firstname, lastname, email, phone } = req.body;

    const update_at = new Date();
    const update_by = authUsername;

    try {
        const userUpdate = await database.collection("users").updateOne(
            { username: authUsername },
            {
                $set:
                {
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone": phone,
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );

        if (userUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "updated user data successfully",
            Data: userUpdate
        });

    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
})

router.patch('/Update_Password', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const { old_password, new_password} = req.body;

    const user = await database.collection("users").findOne({ username: authUsername});
    
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
        return res.json({ message: "Old password is wrong" });
    }

    const encodePassword = await bcrypt.hash(new_password, 10);
    const update_at = new Date();
    const update_by = authUsername;

    try {
        const userUpdate = await database.collection("users").updateOne(
            { username: authUsername },
            {
                $set:
                {
                    "password": encodePassword,
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );

        if (userUpdate.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "updated user data successfully",
            Data: userUpdate
        });

    } catch (error) {
        return res.status(500).json({ message: "Failed to Connecting Server" });
    }
})
module.exports = router;