<template>
    <div class="container">
        <div class="wrapper">
            <div class="header-container">
                <h3>📖 API Documentation - GPS Data Insert</h3>
            </div>
            <div class="content-container">
                <!-- ส่วนรูปแบบของ API -->
                <div class="format">
                    <h4>📌 API Endpoint</h4>
                    <div class="code-block">POST /api/gps_data/insert</div>
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
    "unit_id": 12345,                       // Number
    "gps_time": "2025-02-28T12:34:56Z",     // String
    "lat": 13.7563,                         // Number
    "lng": 100.5018,                        // Number
    "alt": 15.2,                            // Number
    "speed": 60,                            // Number
    "direction": 180,                       // Number
    "gps_status": 1,                        // Number
    "satellite": 7,                         // Number
    "hdop": 1.2,                            // Number
    "base_station": "BTS-01",               // String
    "engine_status": 1,                     // Number
    "license": "AB-1234",                   // String
    "ext_power": 12.6,                      // Number
    "ext_power_status": 1,                  // Number
    "mileage": 10234,                       // Number
    "location": "Bangkok, Thailand",        // String
    "event_code": 200,                      // Number
    "event_name": "Overspeed",              // String
    "event_value": 80,                      // Number
    "event_threshold": 70,                  // Number
    "event_remark": "Exceeded speed limit", // String
    "sensor": [                             // Array
        {                                   // Object
            "name": "Temperature",          // String
            "value": 64                     // Number
        },
    ]
}
                        </pre>
                        <button class="copy-button" @click="copyToClipboard">Copy</button>
                    </div>

                    <h4>📤 Response (Success)</h4>
                    <pre class="code-block">
{
    "message": "Insert GPS_Data Successfully",
    "data": {
        "unit_id": 12345,                       // Number
        "gps_time": "2025-02-28T12:34:56Z",     // String
        "lat": 13.7563,                         // Number
        "lng": 100.5018,                        // Number
        "alt": 15.2,                            // Number
        "speed": 60,                            // Number
        "direction": 180,                       // Number
        "gps_status": 1,                        // Number
        "satellite": 7,                         // Number
        "hdop": 1.2,                            // Number
        "base_station": "BTS-01",               // String
        "engine_status": 1,                     // Number
        "license": "AB-1234",                   // String
        "ext_power": 12.6,                      // Number
        "ext_power_status": 1,                  // Number
        "mileage": 10234,                       // Number
        "location": "Bangkok, Thailand",        // String
        "event_code": 200,                      // Number
        "event_name": "Overspeed",              // String
        "event_value": 80,                      // Number
        "event_threshold": 70,                  // Number
        "event_remark": "Exceeded speed limit", // String
        "sensor": [                             // Array
            {                                   // Object
                "name": "Temperature",          // String
                "value": 64                     // Number
            },
        ]
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
    </div>
</template>

<script>
export default {
    name: 'Doc_GPSDataPage',
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
