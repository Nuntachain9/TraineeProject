const Express = require("express");
const multer = require("multer");
const router = Express.Router();

// Vendor Format
// {
//     "vendor_id": 1,
//     "name": "บริษัท ดี.ที.ซี. เอ็นเตอร์ไพร์ส จำกัด (มหาชน)",
//     "create_at": "2025-02-11T14:30:00Z", * From System
//     "create_by": "username",             * From System
//     "update_at": "2025-02-11T14:32:00Z", * From System
//     "update_by": "username"              * From System
// }

router.get('/GetVendors', async (req, res) => {
    const database = req.app.locals.database;

    try {
        const result = await database.collection("vendors").find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.post('/AddVendor', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const {
        name
    } = req.body;

    if (
        typeof name !== 'string'
    ) {
        return res.status(400).json("Data is incorrect");
    }

    let lastVendor;
    try {
        lastVendor = await database.collection("vendors").find().sort({ vendor_id: -1 }).limit(1).project({ vendor_id: 1 }).toArray();

    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }

    const vendor_id = lastVendor.length > 0 ? lastVendor[0].vendor_id + 1 : 1;
    const create_at = new Date();
    const update_at = new Date();
    let create_by;
    let update_by;

    if (authUsername) {
        create_by = authUsername;
        update_by = authUsername;
    } else {
        create_by = "Postman";
        update_by = "Postman";
    }

    const newVendor = {
        "vendor_id": vendor_id,
        "name": name,
        "create_at": create_at,
        "create_by": create_by,
        "update_at": update_at,
        "update_by": update_by
    }

    try {
        await database.collection("vendors").insertOne(newVendor);

        return res.status(201).json({
            message: "Insert Vendor Successfully",
            data: newVendor
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.patch('/UpdateVendor', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const { vendor_id, name } = req.body;

    const update_at = new Date();
    let update_by;

    if (authUsername) {
        update_by = authUsername;
    } else {
        update_by = "Postman";
    }

    try {
        const vendorUpdate = await database.collection("vendors").updateOne(
            { vendor_id: vendor_id },
            {
                $set:
                {
                    "name": name,
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );

        if (vendorUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        return res.status(200).json({
            message: "updated vendor data successfully",
            data: vendorUpdate
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.delete('/DeleteVendor', async (req, res) => {
    const database = req.app.locals.database;

    const { vendor_id } = req.body;

    try {
        const result = await database.collection("vendors").deleteOne({ vendor_id: vendor_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        return res.status(200).json({ 
            message: "Vendor deleted successfully",
            data: result
         });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

module.exports = router;