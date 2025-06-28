
// ข้อมูลจังหวัด
// const provinces = [
//     { province_id: 1, province_name: "กรุงเทพมหานคร", province_shortname: "กทม." },
//     { province_id: 2, province_name: "กระบี่", province_shortname: "กบ" },
//     { province_id: 3, province_name: "กาญจนบุรี", province_shortname: "กจ" },
//     { province_id: 4, province_name: "กาฬสินธุ์", province_shortname: "กส" },
//     { province_id: 5, province_name: "กำแพงเพชร", province_shortname: "กพ" },
//     { province_id: 6, province_name: "ขอนแก่น", province_shortname: "ขก" },
//     { province_id: 7, province_name: "จันทบุรี", province_shortname: "จบ" },
//     { province_id: 8, province_name: "ฉะเชิงเทรา", province_shortname: "ฉช" },
//     { province_id: 9, province_name: "ชลบุรี", province_shortname: "ชบ" },
//     { province_id: 10, province_name: "ชัยนาท", province_shortname: "ชน" },
//     { province_id: 11, province_name: "ชัยภูมิ", province_shortname: "ชย" },
//     { province_id: 12, province_name: "ชุมพร", province_shortname: "ชพ" },
//     { province_id: 13, province_name: "เชียงราย", province_shortname: "ชร" },
//     { province_id: 14, province_name: "เชียงใหม่", province_shortname: "ชม" },
//     { province_id: 15, province_name: "ตรัง", province_shortname: "ตง" },
//     { province_id: 16, province_name: "ตราด", province_shortname: "ตร" },
//     { province_id: 17, province_name: "ตาก", province_shortname: "ตก" },
//     { province_id: 18, province_name: "นครนายก", province_shortname: "นย" },
//     { province_id: 19, province_name: "นครปฐม", province_shortname: "นฐ" },
//     { province_id: 20, province_name: "นครพนม", province_shortname: "นพ" },
//     { province_id: 21, province_name: "นครราชสีมา", province_shortname: "นม" },
//     { province_id: 22, province_name: "นครศรีธรรมราช", province_shortname: "นศ" },
//     { province_id: 23, province_name: "นครสวรรค์", province_shortname: "นว" },
//     { province_id: 24, province_name: "นนทบุรี", province_shortname: "นบ" },
//     { province_id: 25, province_name: "นราธิวาส", province_shortname: "นธ" },
//     { province_id: 26, province_name: "น่าน", province_shortname: "นน" },
//     { province_id: 27, province_name: "บึงกาฬ", province_shortname: "บก" },
//     { province_id: 28, province_name: "บุรีรัมย์", province_shortname: "บร" },
//     { province_id: 29, province_name: "ปทุมธานี", province_shortname: "ปท" },
//     { province_id: 30, province_name: "ประจวบคีรีขันธ์", province_shortname: "ปข" },
//     { province_id: 31, province_name: "ปราจีนบุรี", province_shortname: "ปจ" },
//     { province_id: 32, province_name: "ปัตตานี", province_shortname: "ปน" },
//     { province_id: 33, province_name: "พะเยา", province_shortname: "พย" },
//     { province_id: 34, province_name: "พระนครศรีอยุธยา", province_shortname: "อย" },
//     { province_id: 35, province_name: "พังงา", province_shortname: "พง" },
//     { province_id: 36, province_name: "พัทลุง", province_shortname: "พท" },
//     { province_id: 37, province_name: "พิจิตร", province_shortname: "พจ" },
//     { province_id: 38, province_name: "พิษณุโลก", province_shortname: "พล" },
//     { province_id: 39, province_name: "เพชรบุรี", province_shortname: "พบ" },
//     { province_id: 40, province_name: "เพชรบูรณ์", province_shortname: "พช" },
//     { province_id: 41, province_name: "แพร่", province_shortname: "พร" },
//     { province_id: 42, province_name: "ภูเก็ต", province_shortname: "ภก" },
//     { province_id: 43, province_name: "มหาสารคาม", province_shortname: "มค" },
//     { province_id: 44, province_name: "มุกดาหาร", province_shortname: "มห" },
//     { province_id: 45, province_name: "แม่ฮ่องสอน", province_shortname: "มส" },
//     { province_id: 46, province_name: "ยโสธร", province_shortname: "ยส" },
//     { province_id: 47, province_name: "ยะลา", province_shortname: "ยล" },
//     { province_id: 48, province_name: "ร้อยเอ็ด", province_shortname: "รอ" },
//     { province_id: 49, province_name: "ระนอง", province_shortname: "รน" },
//     { province_id: 50, province_name: "ระยอง", province_shortname: "รย" },
//     { province_id: 51, province_name: "ราชบุรี", province_shortname: "รบ" },
//     { province_id: 52, province_name: "ลพบุรี", province_shortname: "ลบ" },
//     { province_id: 53, province_name: "ลำปาง", province_shortname: "ลป" },
//     { province_id: 54, province_name: "ลำพูน", province_shortname: "ลพ" },
//     { province_id: 55, province_name: "เลย", province_shortname: "ลย" },
//     { province_id: 56, province_name: "ศรีสะเกษ", province_shortname: "ศก" },
//     { province_id: 57, province_name: "สกลนคร", province_shortname: "สน" },
//     { province_id: 58, province_name: "สงขลา", province_shortname: "สข" },
//     { province_id: 59, province_name: "สตูล", province_shortname: "สต" },
//     { province_id: 60, province_name: "สมุทรปราการ", province_shortname: "สป" },
//     { province_id: 61, province_name: "สมุทรสงคราม", province_shortname: "สส" },
//     { province_id: 62, province_name: "สมุทรสาคร", province_shortname: "สค" },
//     { province_id: 63, province_name: "สระแก้ว", province_shortname: "สก" },
//     { province_id: 64, province_name: "สระบุรี", province_shortname: "สบ" },
//     { province_id: 65, province_name: "สิงห์บุรี", province_shortname: "สห" },
//     { province_id: 66, province_name: "สุโขทัย", province_shortname: "สท" },
//     { province_id: 67, province_name: "สุพรรณบุรี", province_shortname: "สพ" },
//     { province_id: 68, province_name: "สุราษฎร์ธานี", province_shortname: "สฎ" },
//     { province_id: 69, province_name: "สุรินทร์", province_shortname: "สร" },
//     { province_id: 70, province_name: "หนองคาย", province_shortname: "นค" },
//     { province_id: 71, province_name: "หนองบัวลำภู", province_shortname: "นภ" },
//     { province_id: 72, province_name: "อ่างทอง", province_shortname: "อท" },
//     { province_id: 73, province_name: "อำนาจเจริญ", province_shortname: "อจ" },
//     { province_id: 74, province_name: "อุดรธานี", province_shortname: "อด" },
//     { province_id: 75, province_name: "อุตรดิตถ์", province_shortname: "อต" },
//     { province_id: 76, province_name: "อุทัยธานี", province_shortname: "อน" },
//     { province_id: 77, province_name: "อุบลราชธานี", province_shortname: "อบ" }
// ];

// const roles = [
//   {role_id: 1, function_id: 1, name: "admin"},
//   {role_id: 2, function_id: 2, name: "vendor"},
// ]

// ฟังก์ชันเชื่อมต่อและนำข้อมูลเข้าสู่ MongoDB
async function importProvinces() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect(); // เชื่อมต่อกับ MongoDB
    console.log('MongoDB connected');

    const db = client.db(dbName); // เลือกฐานข้อมูล
    const collection = db.collection('roles'); // เลือกคอลเลกชัน

    // ทำการ insert ข้อมูลหลายๆ record
    const result = await collection.insertMany(roles);

    console.log(`${result.insertedCount} provinces inserted`);
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    await client.close(); // ปิดการเชื่อมต่อ
  }
}

async function renameField() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect(); // เชื่อมต่อกับ MongoDB
    console.log('MongoDB connected');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ใช้ $rename เพื่อเปลี่ยนชื่อฟิลด์
    const result = await collection.updateMany(
      {}, // เลือกเอกสารทั้งหมด
      { $rename: { "shortnames": "shortname" } } // เปลี่ยนชื่อฟิลด์จาก province_id เป็น id
    );

    console.log(`${result.modifiedCount} documents updated`);
  } catch (err) {
    console.error('Error renaming field:', err);
  } finally {
    await client.close(); // ปิดการเชื่อมต่อ
  }
}

// เรียกใช้งานฟังก์ชัน
// importProvinces();
// renameField();