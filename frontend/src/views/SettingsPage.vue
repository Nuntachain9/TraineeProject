<template>
    <div>
        <h2>Account Detail</h2>
        <form class="settings" @submit.prevent="updateaccount">
            <div class="insert-box">
                <div class="container">
                    <i class="fas fa-user-edit"></i>
                    <label for="firstname">Firstname :</label>
                    <input type="text" placeholder="Firstname" v-model="changeValue.firstname">
                </div>
            </div>
            <div class="insert-box">
                <div class="container">
                    <i class="fas fa-user-edit"></i>
                    <label for="lastname">Lastname :</label>
                    <input type="text" placeholder="Lastname" v-model="changeValue.lastname">
                </div>
            </div>
            <div class="insert-box">
                <div class="container">
                    <i class="fas fa-user"></i>
                    <label for="username">Email :</label>
                    <input type="email" placeholder="email" v-model="changeValue.email">
                </div>
            </div>
            <div class="insert-box">
                <div class="container">
                    <i class="fas fa-phone"></i>
                    <label for="phone">Phone Number :</label>
                    <input type="tel" placeholder="Phone Number" v-model="changeValue.phone">
                </div>
            </div>
            <button type="submit"> UPDATE </button>
        </form>
        <h2>Change Password</h2>
        <form class="changepassword" @submit.prevent="changePassword">
            <div class="insert-box-ch">
                <div class="container">
                    <i class="fas fa-lock"></i>
                    <label for="old_password">Old Password :</label>
                    <input type="password" placeholder="Old Password" v-model="passwords.old_password" required>
                </div>

            </div>
            <div class="insert-box-ch">
                <div class="container">
                    <i class="fas fa-lock"></i>
                    <label for="">New Password:</label>
                    <input type="password" placeholder="New Password" v-model="passwords.new_password" required>
                </div>

            </div>
            <div class="insert-box-ch">
                <div class="container">
                    <i class="fas fa-lock"></i>
                    <label for="">Confirm Password :</label>
                    <input type="password" placeholder="Confirm Password" v-model="passwords.confirm_new_password"
                        required>
                </div>
            </div>
            <button> CHANGE </button>
        </form>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import userController from '../controllers/userController';

export default {
    name: 'SettingsPage',
    data() {
        return {
            userData: [],
            changeValue: [],
            passwords: [],
        }
    },
    created() {
        this.showProfile();
    },
    methods: {
        async showProfile() {
            try {
                this.userData = await userController.getProfile();
                this.changeValue = {
                    "user_id": this.userData.user_id,
                    "firstname": this.userData.firstname,
                    "lastname": this.userData.lastname,
                    "email": this.userData.email,
                    "phone": this.userData.phone
                };
            } catch (error) {
                console.error('Failed to get profile data:', error);
            }
        },

        async updateaccount() {
            if (this.changeValue.firstname !== this.userData.firstname ||
                this.changeValue.lastname !== this.userData.lastname ||
                this.changeValue.email !== this.userData.email ||
                this.changeValue.phone !== this.userData.phone
            ) {
                console.log(this.changeValue);
                try {
                    await userController.update_Data(
                        this.changeValue.firstname,
                        this.changeValue.lastname,
                        this.changeValue.email,
                        this.changeValue.phone
                    )
                } catch (error) {
                    console.error('Failed to get profile data:', error);
                }

                alert("Update Data Successfully")
                this.showProfile();
            } else {
                alert("Change Infomation before Subbmit");
            }
        },

        async changePassword() {

            if (this.passwords.new_password !== this.passwords.confirm_new_password) {
                alert(" New Password is not match");
            } else {
                try {
                    const result = await userController.update_Password(this.passwords.old_password, this.passwords.new_password);
                    alert(result.message);
                    if (result.Data && result.message) {
                        Cookies.remove('userToken');
                        this.$router.push('/login');
                    }

                } catch (error) {
                    console.error('Failed to Change Password:', error);
                }
            }
            this.passwords = [];
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
    color: #343a40;
}

.settings {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
    height: 250px;
    background: rgb(158, 213, 235);
    border-radius: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.changepassword {
    margin-top: 10px;
    padding: 20px;
    height: auto;
    background: rgb(158, 213, 235);
    border-radius: 30px;
}

input {
    margin-top: 4px;
    padding-left: 40px;
    width: auto;
    max-width: 300px;
    height: 40px;
    border-radius: 30px;
}

.insert-box {
    position: relative;
}

.insert-box-ch {
    position: relative;
    margin: 0px 0px 20px 0px;
}

.fa-phone {
    position: absolute;
    transform: rotate(90deg);
    top: 45px;
    left: 10px;
    font-size: 18px;
    color: #7c8a96;
}

i {
    position: absolute;
    top: 33px;
    left: 15px;
    font-size: 18px;
    color: #7c8a96;
}

.container {
    display: flex;
    flex-direction: column;
}

button {
    background: rgb(107, 201, 255);
    color: #000;
    font-weight: 600;
    border: none;
    padding: 8px;
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