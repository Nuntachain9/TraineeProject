<template>
    <div class="sidebar">
        <div class="sidebar-container">
            <div class="logo">
                <img src="https://km.dtc.co.th/moodle/pluginfile.php/1/theme_klass/logo/1621227805/DTC_logo%20-%20update-white-01.png" alt="">
            </div>
            <div class="menu" @click="toggleMainDropdown">
                <div class="menu-container">
                    <i class="fas fa-home"></i>
                    <p>MAIN</p>
                    <i :class="['fas', menus.mainlist ? 'fa-caret-down' : 'fa-caret-right', 'dropdown-icon']"></i>
                </div>
            </div>

            <div class="dropdown-list" :class="{ show: menus.mainlist }">
                <div class="menu" @click="setSelectedMenu('gpsdata')" :class="{ active: selectedMenu === 'gpsdata' }">
                    <router-link to="/gps_data" class="link">
                        <div class="menu-list">
                            GPS Data
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="menu" @click="toggleMasterDataDropdown">
                <div class="menu-container">
                    <i class="fas fa-database"></i>
                    <p>MASTER DATA</p>
                    <i :class="['fas', menus.masterdatalist ? 'fa-caret-down' : 'fa-caret-right', 'dropdown-icon']"></i>
                </div>
            </div>

            <div class="dropdown-list" :class="{ show: menus.masterdatalist }">
                <div class="menu" @click="setSelectedMenu('vehicle')" :class="{ active: selectedMenu === 'vehicle' }">
                    <router-link to="/vehicle" class="link">
                        <div class="menu-list">
                            Vehicle
                        </div>
                    </router-link>
                </div>
                <div class="menu" @click="setSelectedMenu('vendor')" :class="{ active: selectedMenu === 'vendor' }">
                    <router-link to="/vendor" class="link">
                        <div class="menu-list">
                            Vendor
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="menu" @click="setSelectedMenu('api_key')" :class="{ active: selectedMenu === 'api_key' }">
                <router-link to="/api_key" class="link">
                    <div class="menu-container">
                        <i class="fas fa-key"></i>
                        API KEY
                    </div>
                </router-link>
            </div>

            <div class="menu" @click="toggleAPIDocsDropdown">
                <div class="menu-container">
                    <i class="fas fa-scroll"></i>
                    <p>API DOCS</p>
                    <i :class="['fas', menus.apidocs ? 'fa-caret-down' : 'fa-caret-right', 'dropdown-icon']"></i>
                </div>
            </div>

            <div class="dropdown-list" :class="{ show: menus.apidocs }">
                <div class="menu" @click="setSelectedMenu('api_login')"
                    :class="{ active: selectedMenu === 'api_login' }">
                    <router-link to="/api_doc_login" class="link">
                        <div class="menu-list">
                            Login
                        </div>
                    </router-link>
                </div>
                <div class="menu" @click="setSelectedMenu('api_register')"
                    :class="{ active: selectedMenu === 'api_register' }">
                    <router-link to="/api_doc_register" class="link">
                        <div class="menu-list">
                            Register
                        </div>
                    </router-link>
                </div>
                <div class="menu" @click="setSelectedMenu('api_gpsdata')"
                    :class="{ active: selectedMenu === 'api_gpsdata' }">
                    <router-link to="/api_doc_gpsdata" class="link">
                        <div class="menu-list">
                            GPS Data
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="menu account" @click="toggleAccountDropdown">
                <div class="menu-container">
                    <i class="fas fa-user"></i>
                    <p>ACCOUNT</p>
                    <i :class="['fas', menus.accountlist ? 'fa-caret-down' : 'fa-caret-right', 'dropdown-icon']"></i>
                </div>
            </div>

            <div class="dropdown-list account-list" :class="{ show: menus.accountlist }">
                <div class="menu" @click="setSelectedMenu('settings')" :class="{ active: selectedMenu === 'settings' }">
                    <router-link to="/settings" class="link" @click="toggleAccountDropdown">
                        <div class="menu-list">
                            Settings
                        </div>
                    </router-link>
                </div>
                <div class="menu" @click="setSelectedMenu('logout')" :class="{ active: selectedMenu === 'logout' }">
                    <router-link to="/login" class="link" @click="logout">
                        <div class="menu-list">
                            Logout
                        </div>
                    </router-link>
                </div>
                <div class="menu">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            menus: {
                mainlist: false,
                masterdatalist: false,
                apidocs: false,
                accountlist: false
            },
            selectedMainMenu: null,
            selectedMenu: null
        }
    },
    methods: {
        setSelectedMenu(menu) {
            this.selectedMenu = menu;
        },
        toggleMainDropdown() {
            this.menus.mainlist = !this.menus.mainlist;
        },
        toggleMasterDataDropdown() {
            this.menus.masterdatalist = !this.menus.masterdatalist;
        },
        toggleAPIDocsDropdown() {
            this.menus.apidocs = !this.menus.apidocs;
        },
        toggleAccountDropdown() {
            this.menus.accountlist = !this.menus.accountlist;
        },

        logout() {
            this.$cookies.remove('userToken');
        },

    },
    computed: {
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.sidebar {
    position: relative;
    top: 0;
    left: 0;
    background-color: #27333a;
    width: 250px;
    height: 100%;
}

.logo {
    display: flex;
    padding: 20px 0px 20px 0px;
    font-size: 40px;
    font-weight: bold;
    justify-content: center;
    color: #7c8a96;
}

.menu {
    cursor: pointer;
    color: #7c8a96;
    font-weight: bolder;
    transition: color 0.1ms ease, background-color 0.1ms ease;
}

.menu:hover {
    color: white;
}

.menu:active {
    background-color: black;
}

.menu-list {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.menu-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px 0px 20px 30px;
    transition: color 1s ease;
}

.menu-container .fa-caret-down,
.menu-container .fa-caret-right {
    position: absolute;
    right: 0;
}

i {
    width: 30px;
    height: 14px;
    padding-right: 12px;
}

.link {
    text-decoration: none;
    color: inherit;
}

.account {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
}

.account-list {
    position: absolute;
    background-color: #27333a;
    width: 200px;
    bottom: 0;
    right: -201px;
    border-radius: 20px 20px 0px 0px;
}

.dropdown-list {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.dropdown-list.show {
    max-height: 200px;
    /* ปรับตามขนาดเนื้อหา */
}

.active {
    color: white !important;
}
</style>