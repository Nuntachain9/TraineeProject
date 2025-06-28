const Express = require("express");
const multer = require("multer");
const router = Express.Router();

router.post('/insert', async (req, res) => {
    const database = req.app.locals.database;

    const {
        unit_id,
        gps_time,
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
        return res.status(400).json({ error: "Data type is incorrect"});
    }

    const gpsTime = new Date(gps_time);

    const receive_time = new Date();
    const create_at = new Date();

    const newGPSData = {
        "unit_id": unit_id,
        "gps_time": gpsTime,
        "receive_time": receive_time,
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
})

module.exports = router;