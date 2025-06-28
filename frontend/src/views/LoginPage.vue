<template>
    <div class="container">
        <div class="header">
            <h2>
                ระบบฐานข้อมูลกลางสำหรับการเชื่อมต่อและจัดการอุปกรณ์ IoT
            </h2>
        </div>
        <div class="wrapper">
            <div class="form-container">
                <form action="#" @submit.prevent="login">
                    <h2 style="text-align: center;">Login</h2>
                    <div class="input-field">
                        <input type="text" v-model="username" required>
                        <label>Enter your username</label>
                    </div>
                    <div class="input-field">
                        <input type="password" v-model="password" required>
                        <label>Enter your password</label>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
        <div class="footer">
            <div class="footer-container">
                <div class="item-container">
                    <div class="items">
                        <img src="https://km.dtc.co.th/moodle/pluginfile.php/1/theme_klass/logo/1621227805/DTC_logo%20-%20update-white-01.png" alt="">
                    </div>
                </div>

                <div class="items">
                    <h4 style="text-align: center;">About US</h4>
                    <p style="padding-top: 4px;"> 63 ซอยสุขุมวิท 68 ถนนสุขุมวิท แขวงบางนาเหนือ เขตบางนา กรุงเทพฯ 10260
                    </p>
                    <p> Phone : 1176 #617 (Contact : Data Center Division)</p>
                    <p> E-mail : dc@dtc.co.th</p>
                </div>

                <div class="items">
                    <h4>Social Media</h4>
                    <a target="_blank" href="https://www.facebook.com/DTCGPSIoT">
                        <div class="item-box">
                            <div class="icon-container">
                                <i class="fab fa-facebook"></i>
                            </div>
                            <p>Facebook</p>
                        </div>
                    </a>
                    <a target="_blank" href="">
                        <div class="item-box">
                            <div class="icon-container">
                                <i class="fab fa-line"></i>
                            </div>
                            <p>Line</p>
                        </div>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@DTCEnterpriseOfficial">
                        <div class="item-box">
                            <div class="icon-container">
                                <i class="fab fa-youtube"></i>
                            </div>
                            <p>Youtube</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userController from '../controllers/userController';

export default {
    name: 'LoginPage',
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        async login() {
            try {
                const result = await userController.getLogin(this.username, this.password);
                //console.log(result);
                if (result) {
                    this.$router.push('/gps_data');
                } else {
                    alert('Username or Password Wrong');
                    this.password = "";
                }
            } catch (error) {
                console.error('Failed to login:', error);
            }
        },
    },
    computed: {

    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    color: white;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    background-color: transparent;
    background-image: radial-gradient(#000000 1px, #e5e5f7 1px);
    background-size: 30px 30px;
    width: 100%;
    height: 100%;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #27333a;
}

.header h2 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper {
    position: relative;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
}


.form-container {
    background-color: #27333a;
    width: 300px;
    border-radius: 8px;
    padding: 32px;
}

form {
    display: flex;
    flex-direction: column;
}

.input-field {
    position: relative;
    border-bottom: 2px solid #ccc;
    margin: 15px 0;
}

.input-field label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: #fff;
    font-size: 16px;
    pointer-events: none;
    transition: 0.15s ease;
}

.input-field input {
    width: 100%;
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
}

.input-field input:focus~label,
.input-field input:valid~label {
    font-size: 0.8rem;
    top: 10px;
    transform: translateY(-120%);
}

button {
    background: #fff;
    color: #000;
    font-weight: 600;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 16px;
    border: 2px solid transparent;
    transition: 0.3s ease;
}

button:hover {
    color: #fff;
    border-color: #fff;
    background: rgba(255, 255, 255, 0.15);
}

.footer {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background-color: #27333a;
}

.footer-container {
    margin-top: 4px;
    display: grid;
    grid-template-columns: auto auto auto;
    justify-items: center;
}

.item-container {
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-box {
    display: flex;
    align-items: center;
    margin-top: 4px;
}

.item-box i {
    display: inline-block;
    align-items: center;
    width: 20px;
}

.icon-container {
    margin-right: 4px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

a {
    text-decoration: none;
}
</style>