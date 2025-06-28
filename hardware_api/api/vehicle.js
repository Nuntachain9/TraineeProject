const Express = require("express");
const multer = require("multer");
const router = Express.Router();

router.post('/register', async (req, res) => {
    const database = req.app.locals.database;
    const user = req.data.user;
    console.log(req.data.user)
    const {
        unit_id,
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
        return res.status(400).json({ error: "Data type is incorrect" });
    }

    const create_at = new Date();
    const update_at = new Date();

    const create_by = user.username;
    const update_by = user.username;

    const vendor_id = user.vendor_id;

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

router.patch('/update', async (req, res) => {
    const database = req.app.locals.database;
    const user = req.data.user;

    const {
        unit_id,
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
        return res.status(400).json({ error: "Data type is incorrect" });
    }

    const update_at = new Date();
    const update_by = user.username;

    try {
        const vehicleUpdate = await database.collection("vehicles").updateOne(
            {
                "vendor_id": user.vendor_id,
                "unit_id": unit_id
            },
            {
                $set:
                {
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
                    "update_at": update_at,
                    "update_by": update_by
                }
            }
        );
        console.log(vehicleUpdate)
        if (vehicleUpdate.modifiedCount === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        return res.status(200).json({
            message: "Updated Vehicle Data Successfully",
            data: vehicleUpdate
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.delete('/delete', async (req, res) => {
    const database = req.app.locals.database;
    const user = req.data.user;

    const {
        unit_id
    } = req.body;

    if (typeof unit_id !== 'number') {
        return res.status(400).json({ error: "Data type is incorrect" });
    }


    try {
        const result = await database.collection("vehicles").deleteOne({ unit_id: unit_id, vendor_id: user.vendor_id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        return res.status(200).json({
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});


module.exports = router;