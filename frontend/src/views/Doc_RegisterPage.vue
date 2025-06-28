<template>
    <div class="container">
        <div class="wrapper">
            <div class="header-container">
                <h3>📖 API Documentation - Vehicle Register</h3>
            </div>
            <div class="content-container">
                <!-- ส่วนรูปแบบของ API -->
                <div class="format">
                    <h4>📌 API Endpoint</h4>
                    <div class="code-block">POST /api/vehicle/register</div>
                    <h4>📝 Request Headers</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block">
{
    "userToken": userToken,             // String
    "api_key": api_key,                 // String
    "Content-Type": "application/json"  // String
}
                        </pre>
                    </div>
                    <h4>📥 Request Body (JSON)</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block" ref="requestBody">
{
    "unit_id": 2,                   // Number
    "vehicle_brand": "BYD",         // String
    "vehicle_model": "Seal",        // String
    "vehicle_type": "4 ล้อ",         // String
    "vehicle_chassis_no": "",       // String
    "vehicle_plate": "1กก 1234",    // String
    "province_code": "กทม",         // String
    "camera_status": "",            // String
    "camera_count": 2,              // Number
    "card_reader": "",              // String
    "voice_alert": "",              // String
    "simcard_number": ""            // String
}
                        </pre>
                        <button class="copy-button" @click="copyToClipboard">Copy</button>
                    </div>

                    <h4>📤 Response (Success)</h4>
                    <pre class="code-block">
{
    "message": "Register Vehicle Data Successfully",
    "data": {
        "unit_id": 2,                   // Number
        "vehicle_brand": "BYD",         // String
        "vehicle_model": "Seal",        // String
        "vehicle_type": "4 ล้อ",         // String
        "vehicle_chassis_no": "",       // String
        "vehicle_plate": "1กก 1234",    // String
        "province_code": "กทม",         // String
        "camera_status": "",            // String
        "camera_count": 2,              // Number
        "card_reader": "",              // String
        "voice_alert": "",              // String
        "simcard_number": ""            // String
    }
}
                    </pre>

                    <h4>⚠️ Response (Error)</h4>
                    <pre class="code-block">
{
    "error": " Error Message "  // String
}
                    </pre>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="header-container">
                <h3>📖 API Documentation - Vehicle Update</h3>
            </div>
            <div class="content-container">
                <!-- ส่วนรูปแบบของ API -->
                <div class="format">
                    <h4>📌 API Endpoint</h4>
                    <div class="code-block">PATCH /api/vehicle/update</div>
                    <h4>📝 Request Headers</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block">
{
    "userToken": userToken,             // String
    "api_key": api_key,                 // String
    "Content-Type": "application/json"  // String
}
                        </pre>
                    </div>
                    <h4>📥 Request Body (JSON)</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block" ref="requestBody">
{
    "unit_id": 2,                 // Number
    "vehicle_brand": "BYD",       // String
    "vehicle_model": "Seal",      // String
    "vehicle_type": "4 ล้อ",       // String
    "vehicle_chassis_no": "",     // String
    "vehicle_plate": "1กก 1234",  // String
    "province_code": "กทม",      // String
    "camera_status": "",         // String
    "camera_count": 2,           // Number
    "card_reader": "",           // String
    "voice_alert": "",           // String
    "simcard_number": ""         // String
}
                        </pre>
                        <button class="copy-button" @click="copyToClipboard">Copy</button>
                    </div>

                    <h4>📤 Response (Success)</h4>
                    <pre class="code-block">
{
    "message": "Update Vehicle Data Successfully",
    "data": {
        "unit_id": 2,                   // Number
        "vehicle_brand": "BYD",         // String
        "vehicle_model": "Seal",        // String
        "vehicle_type": "4 ล้อ",         // String
        "vehicle_chassis_no": "",       // String
        "vehicle_plate": "1กก 1234",    // String
        "province_code": "กทม",         // String
        "camera_status": "",            // String
        "camera_count": 2,              // Number
        "card_reader": "",              // String
        "voice_alert": "",              // String
        "simcard_number": ""            // String
    }
}
                    </pre>

                    <h4>⚠️ Response (Error)</h4>
                    <pre class="code-block">
{
    "error": " Error Message "  // String
}
                    </pre>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="header-container">
                <h3>📖 API Documentation - Vehicle Delete</h3>
            </div>
            <div class="content-container">
                <!-- ส่วนรูปแบบของ API -->
                <div class="format">
                    <h4>📌 API Endpoint</h4>
                    <div class="code-block">DELETE /api/vehicle/delete</div>
                    <h4>📝 Request Headers</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block">
{
    "userToken": userToken,             // String
    "api_key": api_key,                 // String
    "Content-Type": "application/json"  // String
}
                        </pre>
                    </div>
                    <h4>📥 Request Body (JSON)</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block" ref="requestBody">
{
    "unit_id": 2,                 // Number
}
                        </pre>
                        <button class="copy-button" @click="copyToClipboard">Copy</button>
                    </div>

                    <h4>📤 Response (Success)</h4>
                    <pre class="code-block">
{
    "message": "Vehicle Delete Successfully",
}
                    </pre>

                    <h4>⚠️ Response (Error)</h4>
                    <pre class="code-block">
{
    "error": " Error Message "  // String
}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Doc_RegisterPage',
    methods: {
        copyToClipboard() {
            const requestBodyText = this.$refs.requestBody.innerText; // Get the content of the pre tag
            navigator.clipboard.writeText(requestBodyText).then(() => {
                alert('Request Body copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

.wrapper {
    width: 100%;
    max-width: 850px;
    margin: auto;
    padding: 20px;
}

.header-container {
    background: linear-gradient(180deg, #08B3FF, #B3DAF2);
    border-radius: 20px 20px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
}

.content-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 0 0 20px 20px;
}

.format,
.example {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h4 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
}

.code-block-wrapper {
    position: relative;
}

.code-block {
    background-color: #272822;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: auto;
    white-space: pre-wrap;
}

button.copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 12px;
    background-color: #28a745;
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button.copy-button:hover {
    background-color: #218838;
}

pre {
    margin: 0;
}
</style>
