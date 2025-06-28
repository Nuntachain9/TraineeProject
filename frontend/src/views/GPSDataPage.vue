<template>
    <div class="loadingScreen-overlay" v-if="loadingScreen">
        <div style="position: fixed; left: 50%; top: 50%; z-index: 1;">
            <i class="fa fa-spinner fa-spin fa-fw"
                style="display: flex; align-items: center; justify-content:  center; font-size: 200px; color: skyblue;"></i>
        </div>
    </div>

    <div class="container" v-if="loadingScreen == false">
        <div class="head">
            <h3>GPS History</h3>
            <h3>Refresh Time: {{ refreshtime }} Second</h3>
        </div>

        <div class="header-container">
            <div class="left">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search By Unit id" v-model="search">
            </div>
            <div class="right">
                <div class="item">
                    Item
                    <select id="item" name="item" v-model="itemsPerPage" @change="resetPage">
                        <option value=5>5</option>
                        <option value=100>100</option>
                        <option value=500>500</option>
                    </select>
                </div>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <div class="previous" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                    <i class="fas fa-caret-left"></i>
                </div>
                <div class="next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                    <i class="fas fa-caret-right"></i>
                </div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Unit ID</th>
                        <th>Vendor Name</th>
                        <th>Plate</th>
                        <th>Province Code</th>
                        <th>Last Update</th>
                        <th>Last Status</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody v-if="search === ''">
                    <tr v-for="(data, index) in paginatedItems" :key="index">
                        <td>{{ data.vehicle_info.unit_id }}</td>
                        <td>{{ data.vehicle_info.vendor_name }}</td>
                        <td>{{ data.vehicle_info.vehicle_plate }}</td>
                        <td>{{ data.vehicle_info.province_code }}</td>
                        <td>{{ calculate_LastTimeGPS(data.last_gps.receive_time) }}</td>
                        <td>
                            <span v-if="data.last_gps.event_name">
                                {{ data.last_gps.event_name }}
                            </span>
                            <span v-else>No Data</span>
                        </td>
                        <td>
                            <router-link :to="`/gps_data/history/${data.vehicle_info.unit_id}`" class="link"
                                style="color:aqua; text-decoration: none;">MAP
                            </router-link>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="data in showGPS_DataFilter" :key="data.vehicle_info.unit_id">
                        <td>{{ data.vehicle_info.unit_id }}</td>
                        <td>{{ data.vehicle_info.vendor_name }}</td>
                        <td>{{ calculate_LastTimeGPS(data.last_gps.gps_time) }}</td>
                        <td>
                            <span v-if="data.last_gps.event_name">
                                {{ data.last_gps.event_name }}
                            </span>
                            <span v-else>No Data</span>
                        </td>
                        <td>
                            <router-link :to="`/gps_data/history/${data.vehicle_info.unit_id}`" class="link"
                                style="color:aqua; text-decoration:underline;">MAP
                            </router-link>
                        </td>
                    </tr>
                </tbody>
                <tr v-if="showGPS_DataFilter.length === 0">
                    <td colspan="5">No data</td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
import gps_dataController from '@/controllers/gps_dataController';

export default {
    name: 'GPSDataPage',
    data() {
        return {
            loadingScreen: true,

            gps_data: [],
            gps_datafilter: [],
            search: '',

            currentPage: 1,
            itemsPerPage: 5,

            intervalID: null,
            refreshtime: 60
        }
    },
    created() {
        this.showGPS_Data()
    },
    mounted() {
        this.intervalID = setInterval(() => {

            this.refreshtime -= 1;

            if (this.refreshtime < 0) {
                this.showGPS_Data();
                this.refreshtime = 60;
            }
        }, 1000);
    },
    beforeUnmount() { 
        clearInterval(this.intervalID);
    },
    methods: {
        async showGPS_Data() {
            try {
                this.loadingScreen = true;

                this.gps_data = await gps_dataController.getLastGPS_Data();

            } catch (error) {
                console.error('Failed to get vehicles:', error);
            }

            this.loadingScreen = false;
        },

        calculate_LastTimeGPS(gps_time) {

            if (!gps_time) {
                return "No GPS Data";
            }

            const gpsDate = new Date(gps_time);
            const currentDate = new Date();

            const diffInMillis = currentDate - gpsDate;

            const seconds = Math.floor(diffInMillis / 1000);  // แปลงเป็นวินาที
            const minutes = Math.floor(seconds / 60);  // แปลงเป็นนาที
            const hours = Math.floor(minutes / 60);  // แปลงเป็นชั่วโมง
            const days = Math.floor(hours / 24);  // แปลงเป็นวัน

            if (days > 0) {
                return `${days} D`;  // ถ้าห่างเป็นวัน
            } else if (hours > 0) {
                return `${hours} H`;  // ถ้าห่างเป็นชั่วโมง
            } else if (minutes > 0) {
                return `${minutes} M`;  // ถ้าห่างเป็นนาที
            } else {
                return `${seconds} S`;  // ถ้าห่างเป็นวินาที
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        resetPage() {
            this.currentPage = 1;
        }
    },
    computed: {
        showGPS_DataFilter() {
            return this.gps_data.filter((data) =>
                data.vehicle_info.unit_id.toString().includes(this.search)
            );
        },

        paginatedItems() {
            if (this.search.length > 0) {
                return this.showGPS_DataFilter;
            }

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.gps_data.slice(startIndex, startIndex + this.itemsPerPage);
        },

        totalPages() {
            if (this.search.length > 0) {
                return 1;
            }

            return Math.ceil(this.gps_data.length / this.itemsPerPage);
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.head {
    display: flex;
    justify-content: space-between;
}

.header-container {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(180deg, #08B3FF, #B3DAF2);
    padding-left: 16px;
    border-radius: 30px 30px 0px 0px;
    gap: 16px;
}

.header-container .left,
.header-container .right {
    margin-right: 8px;
    display: flex;
    align-items: center;
    position: relative;
    gap: 8px;
}

.left i {
    position: absolute;
    top: 7px;
    left: 8px;
}

.left input {
    width: 200px;
    height: 30px;
    border: none;
    border-radius: 30px;
    padding-left: 28px;
}

.previous,
.next {
    position: relative;
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease;
}

.previous {
    margin-left: 4px;
}
.next {
    margin-right: 12px;
}

.previous:hover, .next:hover{
    opacity: 0.7;
    border: 1px solid #08B3FF;
    background-color: #08B3FF;
}

.right .previous i,
.right .next i {
    position: absolute;
    top: 5px;
    left: 8px;
}

.right select {
    text-align: center;
    margin-right: 8px;
    width: 50px;
    height: 20px;
    border: none;
    border-radius: 30px;
    padding-left: 2px;
}

.search-button {
    background-color: #B3DAF2;
}

button {
    cursor: pointer;
    width: 70px;
    height: 30px;
    padding: 5px 10px;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 3px 5px 1px grey;
    transition: opacity 0.1s ease;
}

button:hover {
    opacity: 0.8;
}

.table-container {
    position: sticky;
    overflow: auto;
    width: 100%;
    height: auto;
    max-height: 65vh;
}

.table-container::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

.table-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.table-container::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #B3DAF2, #08B3FF);
    border: 2px solid #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb:active {
    background: linear-gradient(45deg, #767d83, #444);
    border: 2px solid #ddd;
}

.table-container::-webkit-scrollbar-horizontal {
    height: 10px;
}

.table-container::-webkit-scrollbar-button:start {
    background: linear-gradient(180deg, #08B3FF, #B3DAF2);
    border: none;
}

.table-container::-webkit-scrollbar-button:end {
    background: linear-gradient(180deg, #B3DAF2, #08B3FF);
    border: none;
}

table {
    width: 100%;
    border-collapse: collapse;

}

thead {
    position: sticky;
    top: 0;
    background: #f8f6ff;
}

th,
td {
    padding: 8px;
    text-align: center;
    white-space: nowrap;
}

tr:nth-child(even) {
    background: #f8f6ff;
}

.edit-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.edit-button {
    background-color: #06D6A0;
}

.delete-button {
    background-color: #FF4E5B;
}

.loadingScreen-overlay {
    position: fixed;
    top: 0;
    left: 250px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

/* Edit-Pop Up CSS */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
}

.popup-content h3 {
    margin-bottom: 8px;
    text-align: center;
}

.popup-content input {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 30px;
}


.disable,
.enable {
    display: flex;
    align-items: center;
    gap: 4px;
}

.disable input {
    width: auto;
    border: none;
}

.popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.save-button {
    width: auto;
    background: #06D6A0;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    border-radius: 30px;
}

.cancel-button {
    width: auto;
    background: #FF4E5B;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    border-radius: 30px;
}
</style>