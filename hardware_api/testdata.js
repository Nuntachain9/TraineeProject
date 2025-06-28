const { MongoClient } = require('mongodb');
const xlsx = require('xlsx');

// URL สำหรับเชื่อมต่อกับฐานข้อมูล MongoDB
const url = "mongodb+srv://readonly:read12345@cluster0.3tc7i.mongodb.net/project?retryWrites=true&w=majority"
const dbName = "project";

// การเชื่อมต่อ MongoDB
async function connectToDatabase() {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('test_data');

        return { client, collection };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// การแทรกข้อมูลลง MongoDB
async function insertData(data) {
    const { client, collection } = await connectToDatabase();

    try {
        // แทรกข้อมูลลงใน collection
        const result = await collection.insertMany(data);
        console.log('Inserted documents:', result.insertedCount);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // ปิดการเชื่อมต่อ
        client.close();
    }
}

// การดึงข้อมูลจาก MongoDB
async function fetchData() {
    const { client, collection } = await connectToDatabase();

    try {
        const data = await collection.find({}).toArray();  // ดึงข้อมูลทั้งหมดจาก collection
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // ปิดการเชื่อมต่อ
        client.close();
    }
}

// ฟังก์ชันสำหรับอ่านไฟล์ Excel และแทรกข้อมูลลง MongoDB
async function importExcelToMongo() {
    const workbook = xlsx.readFile('C:/Work/Info/zc02001040500000002data.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const sheet = workbook.Sheets[sheet_name_list[0]];  // เลือกแผ่นงานแรก

    const data = xlsx.utils.sheet_to_json(sheet);  // แปลงข้อมูลเป็น JSON

    // แทรกข้อมูลลง MongoDB
    await insertData(data);
}

// เรียกใช้ฟังก์ชัน
importExcelToMongo();
