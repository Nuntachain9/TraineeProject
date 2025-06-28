const Express = require("express");
const multer = require("multer");
const router = Express.Router();

// // Vehicle Format
// // {
// //     "unit_id": 1231,
// //     "vendor_id": 1,
// //     "vehicle_brand": "BYD",
// //     "vehicle_model": "Seal",
// //     "vehicle_type": "4 ล้อ",
// //     "vehicle_chassis_no": '',
// //     "vehicle_plate": '2กก 2345',
// //     "province_code": 'กทม',
// //     "camera_status": '',
// //     "camera_count": 3,
// //     "card_reader": '',
// //     "voice_alert": '',
// //     "simcard_number": '',
// //     "create_at": "2025-02-11T14:30:00Z",     * From System
// //     "create_by": "username",                 * From System
// //     "update_at": "2025-02-11T14:32:00Z",     * From System
// //     "update_by": "username"                  * From System
// // };

router.get('/GetVehicles', async (req, res) => {
    const database = req.app.locals.database;
    const authVendorID = req.user.vendor_id;
    const authRole = req.user.role_id;

    try {
        let result;

        // if( authRole === 1){
        //     result = await database.collection("vehicles").find({}).toArray();
        //     return res.status(200).json(result);
        // }

        result = await database.collection("vehicles").find({ vendor_id: authVendorID }).toArray();

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.get('/GetVehicleByUnit_id', async (req, res) => {
    const database = req.app.locals.database;
    const authVendorID = req.user.vendor_id;

    const { unit_id } = req.query;

    try {
        const result = await database.collection("vehicles").findOne({ unit_id: Number(unit_id), vendor_id: authVendorID });

        if(result){
            return res.status(200).json(1);
        } else {
            return res.status(200).json(0);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.post('/AddVehicle', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;
    const API_Key = req.header('x-api-key');

    const {
        unit_id,
        vendor_id,
        vehicle_brand,
        vehicle_model,
        vehicle_type,
        vehicle_chassis_no,
        vehicle_plate,
        province_code,
        camera_status,
        camera_count,
        card_reader,
        voice_alert,
        simcard_number
    } = req.body;

    if (
        typeof unit_id !== 'number' ||
        typeof vendor_id !== 'number' ||
        typeof vehicle_brand !== 'string' ||
        typeof vehicle_model !== 'string' ||
        typeof vehicle_type !== 'string' ||
        typeof vehicle_chassis_no !== 'string' ||
        typeof vehicle_plate !== 'string' ||
        typeof province_code !== 'string' ||
        typeof camera_status !== 'string' ||
        typeof camera_count !== 'number' ||
        typeof card_reader !== 'string' ||
        typeof voice_alert !== 'string' ||
        typeof simcard_number !== 'string'
    ) {
        return res.status(400).send("Data is incorrect");
    }

    const create_at = new Date();
    const update_at = new Date();
    let create_by;
    let update_by;

    if (authUsername) {
        create_by = authUsername;
        update_by = authUsername;

        try {
            const result = await database.collection("users").findOne({ username: authUsername });

            if (API_Key !== result.api_key) {
                return res.status(401).json({ error: "UnAuthorized" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Failed to Connecting Server" });
        }
    } else {
        create_by = "Postman";
        update_by = "Postman";
    }

    const newVehicle = {
        "unit_id": unit_id,
        "vendor_id": vendor_id,
        "vehicle_brand": vehicle_brand,
        "vehicle_model": vehicle_model,
        "vehicle_type": vehicle_type,
        "vehicle_chassis_no": vehicle_chassis_no,
        "vehicle_plate": vehicle_plate,
        "province_code": province_code,
        "camera_status": camera_status,
        "camera_count": camera_count,
        "card_reader": card_reader,
        "voice_alert": voice_alert,
        "simcard_number": simcard_number,
        "create_at": create_at,
        "create_by": create_by,
        "update_at": update_at,
        "update_by": update_by
    }

    try {
        await database.collection("vehicles").insertOne(newVehicle);

        return res.status(201).json({
            message: "Insert Vehicle Successfully",
            data: newVehicle
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.patch('/UpdateVehicle', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;

    const { vehicle } = req.body;

    const update_at = new Date();
    let update_by;

    if (authUsername) {
        update_by = authUsername;
    } else {
        update_by = "Postman";
    }

    try {
        const vehicleUpdate = await database.collection("vehicles").updateOne(
            { unit_id: vehicle.unit_id },
            {
                $set:
                {
                    "vehicle_brand": vehicle.vehicle_brand,
                    "vehicle_model": vehicle.vehicle_model,
                    "vehicle_type": vehicle.vehicle_type,
                    "vehicle_chassis_no": vehicle.vehicle_chassis_no,
                    "vehicle_plate": vehicle.vehicle_plate,
                    "province_code": vehicle.province_code,
                    "camera_status": vehicle.camera_status,
                    "camera_count": vehicle.camera_count,
                    "card_reader": vehicle.card_reader,
                    "voice_alert": vehicle.voice_alert,
                    "simcard_number": vehicle.simcard_number,
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );

        if (vehicleUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        return res.status(200).json({
            message: "updated vehicle data successfully",
            data: vehicleUpdate
        });

    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
})

router.delete('/DeleteVehicle', async (req, res) => {
    const database = req.app.locals.database;

    const { unit_id } = req.body;

    try {
        const result = await database.collection("vehicles").deleteOne({ unit_id: unit_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
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