<template>
    <div class="loadingScreen-overlay" v-if="loadingScreen">
        <div style="position: fixed; left: 50%; top: 50%; z-index: 1;">
            <i class="fa fa-spinner fa-spin fa-fw"
                style="display: flex; align-items: center; justify-content:  center; font-size: 200px; color: skyblue;"></i>
        </div>
    </div>

    <div class="container" v-if="loadingScreen == false">
        <h3>API Key</h3>
        <div class="wrapper">
            <div class="form-container">
                <div class="input-field">
                    <input type="text" v-model="api_key" required>
                </div>
                <div class="button-container">
                    <button @click="copyText(this.api_key)" type="submit" title="คัดลอกข้อความ"> Copy Text</button>
                    <button @click="updateAPI_Key()" type="submit" title="สร้าง API Key ใหม่"> Re create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userController from '@/controllers/userController';

export default {
    name: 'API_KeyPage',
    data() {
        return {
            loadingScreen: true,

            api_key: ''
        }
    },
    created() {
        this.showAPI_Key();
    },
    methods: {
        async showAPI_Key() {
            try {
                const result = await userController.getProfile()
                this.api_key = result.api_key;
            } catch (error) {
                console.error("Fail to get API Key:", error);
            }

            this.loadingScreen = false;
        },
        async copyText(text) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (error) {
                console.error("Fail to Copy text:", error);
            }
        },
        async updateAPI_Key() {
            try {
                await userController.newAPI_Key();
                this.showAPI_Key();
            } catch (error) {
                console.error("Fail to update API Key:", error);
            }
        }
    },
    computed: {

    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: block;
    width: 100%;
    height: 100%;
}

.wrapper {
    background: rgb(149, 225, 255);
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 620px;
    max-width: 620px;
    border-radius: 8px;
    padding: 32px;
}

.input-field {
    position: relative;
    border-bottom: 2px solid #ccc;
    margin: 15px 0;
}

.input-field input {
    width: 100%;
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
}

button {
    background: rgb(107, 201, 255);
    color: #000;
    font-weight: 600;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 16px;
    border: 2px solid transparent;
    border-radius: 30px;
    transition: 0.3s ease;
    width: 150px;
}

button:hover {
    color: #fff;
    border-color: #fff;
    background: rgba(255, 255, 255, 0.15);
}
</style>