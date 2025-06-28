const Express = require("express");
const multer = require("multer");
const router = Express.Router();

// GPS Data Format
// {
//     "unit_id": 1231,
//     "gps_time": "2025-02-11T14:30:00Z",
//     "receive_time": "2025-02-11T14:45:00Z",
//     "lat": 13.72563,
//     "lng": 100.51018,
//     "alt": 15,
//     "speed": 50,
//     "direction": 90,
//     "gps_status": 1,
//     "satellite": 12,
//     "hdop": 1.0,
//     "base_station": "Station 01",
//     "engine_status": 1,
//     "license": "AB123CD",
//     "ext_power": 12,
//     "ext_power_status": 1,
//     "mileage": 25000,
//     "location": "Bangkok, Thailand",
//     "event_code": 1,
//     "event_name": "Over Speed",
//     "event_value": 70,
//     "event_threshold": 60,
//     "event_remark": "Speed exceeded limit",
//     "sensor": [
//         {
//             "name": "Temperature",
//             "value": 24.5
//         },
//         {
//             "name": "Humidity",
//             "value": 63
//         }
//     ],
//     "create_at": "2025-02-11T14:30:00Z"  * From System
// }

router.get('/history/:unit_id', async (req, res) => {
    const database = req.app.locals.database;
    const unit_id = Number(req.params.unit_id);

    try {
        const result = await database.collection("gps_data").find({ unit_id: unit_id }).sort({ gps_time: -1 }).toArray();
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.get('/GetLastGPS_Data', async (req, res) => {
    const database = req.app.locals.database;
    const authVendorID = req.user.vendor_id;

    try {
        let result;

        const vehiclesByvendor_Id = await database.collection("vehicles").find({ vendor_id: authVendorID }).project({ _id: 0, unit_id: 1 }).toArray();
        const vehiclesList = vehiclesByvendor_Id.map(vehicle => vehicle.unit_id);

        result = await database.collection("vehicles").aggregate([
            {
                $match: { unit_id: { $in: vehiclesList } }  // กรองเฉพาะรถที่อยู่ใน vehiclesList
            },
            {
                $lookup: {
                    from: "gps_data",  // ดึงข้อมูลจาก gps_data
                    localField: "unit_id",  // field ใน vehicles
                    foreignField: "unit_id",  // field ใน gps_data
                    as: "gps_info"
                }
            },
            {
                $unwind: {
                    path: "$gps_info",  // ถ้ามีข้อมูล gps ขึ้นมา
                    preserveNullAndEmptyArrays: true // ถ้าไม่มี GPS ให้เป็น null
                }
            },
            {
                $addFields: {
                    "gps_info.gps_time": { $toDate: "$gps_info.gps_time" }  // แปลง gps_time เป็น Date
                }
            },
            {
                $sort: { "gps_info.gps_time": -1 }  // เรียงตามเวลาล่าสุด
            },
            {
                $group: {
                    _id: "$unit_id",  // กลุ่มตาม unit_id
                    latestGps: { $first: "$gps_info" }  // เลือกข้อมูล GPS ล่าสุด
                }
            },
            {
                $lookup: {
                    from: "vehicles",  // ดึงข้อมูลจาก vehicles มาเพิ่ม
                    localField: "_id",  // ใช้ unit_id
                    foreignField: "unit_id",
                    as: "vehicle_info"
                }
            },
            {
                $unwind: { path: "$vehicle_info", preserveNullAndEmptyArrays: true }  // ถ้าไม่มีข้อมูลจาก vehicles ให้เป็น null
            },
            {
                $addFields: {
                    "vehicle_info.unit_id": "$_id"  // ใส่ unit_id ลงใน vehicle_info
                }
            },
            {
                $lookup: {
                    from: "vendors",  // ดึงข้อมูลจาก vendors คอลเลกชัน
                    localField: "vehicle_info.vendor_id",  // ใช้ vendor_id จาก vehicle_info
                    foreignField: "vendor_id",  // ค้นหาตรงกับ vendor_id ใน vendors
                    as: "vendor_info"  // เก็บข้อมูล vendor ไว้ใน vendor_info
                }
            },
            {
                $unwind: { path: "$vendor_info", preserveNullAndEmptyArrays: true }  // ถ้าไม่มีข้อมูลจาก vendors ให้เป็น null
            },
            {
                $addFields: {
                    "vehicle_info.vendor_name": "$vendor_info.name"  // ใส่ชื่อ vendor ลงใน vehicle_info
                }
            },
            {
                $project: {
                    _id: 0,  // เอา _id ออก
                    vehicle_info: 1,  // ข้อมูลจาก vehicles
                    last_gps: "$latestGps"  // ข้อมูล GPS ล่าสุด
                }
            },
            {
                $sort: { "vehicle_info.unit_id": 1 }  // เรียงตาม unit_id
            }
        ]).toArray();

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

router.post('/Addgps_data', async (req, res) => {
    const database = req.app.locals.database;
    const authUsername = req.user.username;
    const API_Key = req.header('x-api-key');

    const {
        unit_id,
        gps_time,
        receive_time,
        lat,
        lng,
        alt,
        speed,
        direction,
        gps_status,
        satellite,
        hdop,
        base_station,
        engine_status,
        license,
        ext_power,
        ext_power_status,
        mileage,
        location,
        event_code,
        event_name,
        event_value,
        event_threshold,
        event_remark,
        sensor
    } = req.body;

    if (
        typeof unit_id !== 'number' ||
        typeof gps_time !== 'string' ||
        typeof receive_time !== 'string' ||
        typeof lat !== 'number' ||
        typeof lng !== 'number' ||
        typeof alt !== 'number' ||
        typeof speed !== 'number' ||
        typeof direction !== 'number' ||
        typeof gps_status !== 'number' ||
        typeof satellite !== 'number' ||
        typeof hdop !== 'number' ||
        typeof base_station !== 'string' ||
        typeof engine_status !== 'number' ||
        typeof license !== 'string' ||
        typeof ext_power !== 'number' ||
        typeof ext_power_status !== 'number' ||
        typeof mileage !== 'number' ||
        typeof location !== 'string' ||
        typeof event_code !== 'number' ||
        typeof event_name !== 'string' ||
        typeof event_value !== 'number' ||
        typeof event_threshold !== 'number' ||
        typeof event_remark !== 'string' ||
        !Array.isArray(sensor) || sensor.some(s => typeof s !== 'object' || typeof s.name !== 'string' || typeof s.value !== 'number')
    ) {
        return res.status(400).send("Data is incorrect");
    }

    const create_at = new Date();

    if (authUsername) {

        try {
            const result = await database.collection("users").findOne({ username: authUsername });

            if (API_Key !== result.api_key) {
                return res.status(401).json({ error: "UnAuthorized" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Failed to Connecting Server" });
        }

    }

    const gpsTime = new Date(gps_time);
    const receiveTime = new Date(receive_time);
    const newGPSData = {
        "unit_id": unit_id,
        "gps_time": gpsTime,
        "receive_time": receiveTime,
        "lat": lat,
        "lng": lng,
        "alt": alt,
        "speed": speed,
        "direction": direction,
        "gps_status": gps_status,
        "satellite": satellite,
        "hdop": hdop,
        "base_station": base_station,
        "engine_status": engine_status,
        "license": license,
        "ext_power": ext_power,
        "ext_power_status": ext_power_status,
        "mileage": mileage,
        "location": location,
        "event_code": event_code,
        "event_name": event_name,
        "event_value": event_value,
        "event_threshold": event_threshold,
        "event_remark": event_remark,
        "sensor": sensor,
        "create_at": create_at
    };

    try {
        await database.collection("gps_data").insertOne(newGPSData);

        return res.status(201).json({
            message: "Insert GPS_Data Successfully",
            data: newGPSData
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Connecting Server" });
    }
});

module.exports = router;