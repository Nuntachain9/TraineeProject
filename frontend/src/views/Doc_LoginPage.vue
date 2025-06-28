<template>
    <div class="container">
        <div class="wrapper">
            <div class="header-container">
                <h3>📖 API Documentation - Login</h3>
            </div>
            <div class="content-container">
                <!-- ส่วนรูปแบบของ API -->
                <div class="format">
                    <h4>📌 API Endpoint</h4>
                    <div class="code-block">POST /api/gettoken/login</div>

                    <h4>📥 Request Body (JSON)</h4>
                    <div class="code-block-wrapper">
                        <pre class="code-block" ref="requestBody">
{
    "username": "test",     // String
    "password": "test123",  // String
}
                        </pre>
                        <button class="copy-button" @click="copyToClipboard">Copy</button>
                    </div>

                    <h4>📤 Response (Success)</h4>
                    <pre class="code-block">
{
    "userToken": "U2FsdGVkX187zooHh4wNXeXp",    // string
    "api_key": "e7604858a072ec8437dcb"          // string
    "expires": 1740808550000                    // Number (Milliseconds)
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
    name: 'Doc_LoginPage',
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
