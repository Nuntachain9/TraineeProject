import axios from 'axios';
import { MongoClient } from 'mongodb';

const url = "mongodb+srv://readonly:read12345@cluster0.3tc7i.mongodb.net/project?retryWrites=true&w=majority";
const dbName = "project";
const collectionName = 'test_data';

const username = "nun";
const password = "admin";

let accessToken = null;
let accessTokenExpiration = null;

let datalists;
let datalists2;

const convertSerialDateToDate = (serialDate) => {
    const excelStartDate = new Date(1900, 0, 1);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    return new Date(excelStartDate.getTime() + (serialDate - 2) * millisecondsInDay);
};

async function fetchDataFromMongoDB() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // ดึงข้อมูล 30 record แรกจาก collection และเรียงตาม gps_time
        const data = await collection.find({})
            .sort({ r_time: 1 })  // เรียงข้อมูลตาม gps_time (r_time) จากน้อยไปมาก
            .limit(5000)
            .toArray();

        // แปลง gps_time (serial date) ให้เป็นวันที่เข้าใจได้
        const transformedData = data.map(item => {
            // แปลง gps_time เป็น serial date
            if (item.r_time) {
                item.r_time = convertSerialDateToDate(item.r_time);
            }
            return item;
        });

        return transformedData;
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
    } finally {
        await client.close();
    }
}

async function login() {
    try {
        const res = await axios.post('http://localhost:5039/api/gettoken/login', {
            "username": username,
            "password": password
        });

        accessToken = res.data;
        accessTokenExpiration = res.data.expires;
        return res.data;
    } catch (error) {
        //console.error('Error:', error.response.data);
        return error.response.data;
    }
}

async function getAccessToken() {
    if (new Date().getTime() > accessTokenExpiration) {
        console.log('Token expired or not available, logging in again...');
        await login();
    }

    console.log('Already Have Token')
    return accessToken;
}

async function sendDataToAPI(data) {

    try {
        const response = await axios.post('http://localhost:5039/api/gps_data/insert', data,
            {
                withCredentials: true,  // ถ้า API ใช้ session หรือ cookie
                headers: {
                    'Content-Type': 'application/json',
                    'userToken': accessToken.userToken,   // ส่ง userToken ไปใน Header
                    'api_key': accessToken.api_key           // ส่ง api_key ไปใน Header
                }
            }
        );

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.log('Request Failed:', error);  // ถ้ามี error ใน response
            return error.response.data.error;
        } else {
            // หากไม่มีก็จะมีข้อผิดพลาดอื่นๆ ที่ไม่ใช่จาก API
            console.log('Network or Unknown Error:', error.message);
            return error.message;
        }
    }
}

async function main() {
    const token = await getAccessToken();
    console.log('Current Access Token:', token);
    
    datalists = await fetchDataFromMongoDB();

    datalists2 = [
        { lat: 13.59828, lng: 100.61015 },
        { lat: 13.59799, lng: 100.61050 },
        { lat: 13.59770, lng: 100.61025 },
        { lat: 13.59733, lng: 100.61066 },
        { lat: 13.59696, lng: 100.61088 },
        { lat: 13.59729, lng: 100.61143 },
        { lat: 13.59791, lng: 100.61199 },
        { lat: 13.59907, lng: 100.61239 },
        { lat: 13.60092, lng: 100.61277 },
        { lat: 13.60132, lng: 100.61290 },
        { lat: 13.60170, lng: 100.61295 },
        { lat: 13.60330, lng: 100.61364 },
        { lat: 13.60481, lng: 100.61432 },
        { lat: 13.60631, lng: 100.61501 },
        { lat: 13.60705, lng: 100.61542 },
        { lat: 13.60777, lng: 100.61587 },
        { lat: 13.60836, lng: 100.61628 },
        { lat: 13.60948, lng: 100.61699 },
        { lat: 13.61115, lng: 100.61801 },
        { lat: 13.61227, lng: 100.61866 },
        { lat: 13.61446, lng: 100.62001 },
        { lat: 13.61562, lng: 100.62066 },
        { lat: 13.61734, lng: 100.62157 },
        { lat: 13.62028, lng: 100.62304 },
        { lat: 13.62319, lng: 100.62451 },
        { lat: 13.62439, lng: 100.62511 },
        { lat: 13.62494, lng: 100.62531 },
        { lat: 13.62642, lng: 100.62606 },
        { lat: 13.62725, lng: 100.62648 },
        { lat: 13.62779, lng: 100.62645 },
        { lat: 13.62927, lng: 100.62371 },
        { lat: 13.63179, lng: 100.61898 },
        { lat: 13.63562, lng: 100.61188 },
        { lat: 13.63768, lng: 100.60805 },
        { lat: 13.64115, lng: 100.60400 },
        { lat: 13.64367, lng: 100.60036 },
        { lat: 13.64544, lng: 100.59528 },
        { lat: 13.64892, lng: 100.59672 },
        { lat: 13.65083, lng: 100.59751 },
        { lat: 13.65402, lng: 100.59880 },
        { lat: 13.65619, lng: 100.59973 },
        { lat: 13.65995, lng: 100.60123 },
        { lat: 13.66415, lng: 100.60300 },
        { lat: 13.66720, lng: 100.60424 },
        { lat: 13.67146, lng: 100.60595 },
        { lat: 13.67290, lng: 100.60653 },
        { lat: 13.67314, lng: 100.60637 },
        { lat: 13.67365, lng: 100.60364 },
        { lat: 13.67378, lng: 100.60366 },
        { lat: 13.67352, lng: 100.60505 },
        { lat: 13.67390, lng: 100.60509 },
        { lat: 13.67495, lng: 100.60387 },
        { lat: 13.67555, lng: 100.60361 },
        { lat: 13.67683, lng: 100.60340 },
        { lat: 13.67686, lng: 100.60348 }
    ];
    while (datalists.length > 0) {
        // const newGPSData = {
        //     "unit_id": 2,
        //     "gps_time": datalists[0].r_time,
        //     "lat": datalists[0].r_lat,
        //     "lng": datalists[0].r_lon,
        //     "alt": 15,
        //     "speed": datalists[0].r_speed,
        //     "direction": 999,
        //     "gps_status": 1,
        //     "satellite": 999,
        //     "hdop": datalists[0].hdop,
        //     "base_station": 'Test',
        //     "engine_status": datalists[0].ecu_status,
        //     "license": "999",
        //     "ext_power": 999,
        //     "ext_power_status": 9,
        //     "mileage": datalists[0].r_distance,
        //     "location": `${datalists[0].tambol}, ${datalists[0].amphur}, ${datalists[0].province}`,
        //     "event_code": datalists[0].r_status,
        //     "event_name": "Test",
        //     "event_value": 999,
        //     "event_threshold": 999,
        //     "event_remark": "Test",
        //     "sensor": [
        //         {
        //             "name": "Temperature",
        //             "value": 24.5
        //         },
        //         {
        //             "name": "Humidity",
        //             "value": 63
        //         }
        //     ]
        // }

        const newGPSData = {
            "unit_id": 2,
            "gps_time": new Date(),
            "lat": datalists2[0].lat,
            "lng": datalists2[0].lng,
            "alt": 15,
            "speed": 999,
            "direction": 999,
            "gps_status": 1,
            "satellite": 999,
            "hdop": 1.0,
            "base_station": 'Test',
            "engine_status": 1,
            "license": "999",
            "ext_power": 999,
            "ext_power_status": 9,
            "mileage": 20000,
            "location": 'ศรีนครินทร์ม, สมุทรปราการ',
            "event_code": 999,
            "event_name": "Test",
            "event_value": 999,
            "event_threshold": 999,
            "event_remark": "Test",
            "sensor": [
                {
                    "name": "Temperature",
                    "value": 24.5
                },
                {
                    "name": "Humidity",
                    "value": 63
                }
            ]
        }

        console.log(newGPSData);
        const success = sendDataToAPI(newGPSData);
        if (success) {
            datalists2.shift(); // ลบ index แรกออก
            console.log(`🗑️    ลบข้อมูล index แรก, คงเหลือ: ${datalists2.length}`);
        } else {
            console.error("❌ หยุดลูป เนื่องจากเกิดข้อผิดพลาดในการส่งข้อมูล");
            break;
        }
        break;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();