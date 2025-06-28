<template>
    <div class="loadingScreen-overlay" v-if="loadingScreen">
        <div style="position: fixed; left: 50%; top: 50%; z-index: 1;">
            <i class="fa fa-spinner fa-spin fa-fw"
                style="display: flex; align-items: center; justify-content:  center; font-size: 200px; color: skyblue;"></i>
        </div>
    </div>
    <div class="con-container" v-if="permission === 1">
        <div class="container" v-if="loadingScreen == false">
            <h3>Map Location ID {{ unit_id }}</h3>
            <div class="map-container">
                <GMapMap :center="{ lat: centerLat, lng: centerLng }" :zoom="12"
                    style="width: 100%; height: 500px; border-radius: 30px;" :options="mapOptions">
                    <GMapPolyline :path="historys" strokeColor="black" strokeWeight="30px" />
                    <GMapMarker v-for="(position, index) in currentPosition" :key="index" :position="position" :icon="{
                        url: require('../imgs/R.png'),
                        scaledSize: { width: 10, height: 10 }
                    }" />
                </GMapMap>
            </div>
            <div class="data-container">
                <h3>GPS Data</h3>
                <div class="header-container">
                    <form @submit.prevent="showGPS_DataFilter">
                        <div class="left">
                            <input type="date" v-model="startDate">
                            -
                            <input type="date" v-model="endDate">
                            <button type="submit" class="search-button"> Search </button>
                        </div>
                    </form>
                    <div class="right">
                        <div class="item">
                            Item
                            <select id="item" name="item" v-model="itemsPerPage" @change="resetPage">
                                <option value=100>100</option>
                                <option value=1000>1000</option>
                                <option value=5000>5000</option>
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
                                <th>No.</th>
                                <th>Unit ID</th>
                                <th>GPS Time</th>
                                <th>Receive Time</th>
                                <th>Lat</th>
                                <th>Lng</th>
                                <th>Alt</th>
                                <th>Speed</th>
                                <th>Direction</th>
                                <th>GPS Status</th>
                                <th>Satellite</th>
                                <th>Hdop</th>
                                <th>Base Station</th>
                                <th>Engine Status</th>
                                <th>License</th>
                                <th>Ext Power</th>
                                <th>Ext Power Status</th>
                                <th>Mileage</th>
                                <th>Location</th>
                                <th>Event Code</th>
                                <th>Event Name</th>
                                <th>Event Value</th>
                                <th>Event Threshold</th>
                                <th>Event Remark</th>
                                <th colspan="10">Sensor</th>
                            </tr>
                        </thead>
                        <tbody v-if="search === ''">
                            <tr v-for="(history, index) in paginatedItems" :key="index">
                                <td>{{ (index + 1) + ((currentPage - 1) * itemsPerPage) }}</td>
                                <td>{{ history.unit_id }}</td>
                                <td>{{ history.gps_time }}</td>
                                <td>{{ history.receive_time }}</td>
                                <td>{{ history.lat }}</td>
                                <td>{{ history.lng }}</td>
                                <td>{{ history.alt }}</td>
                                <td>{{ history.speed }}</td>
                                <td>{{ history.direction }}</td>
                                <td>{{ history.gps_status }}</td>
                                <td>{{ history.satellite }}</td>
                                <td>{{ history.hdop }}</td>
                                <td>{{ history.base_station }}</td>
                                <td>{{ history.engine_status }}</td>
                                <td>{{ history.license }}</td>
                                <td>{{ history.ext_power }}</td>
                                <td>{{ history.ext_power_status }}</td>
                                <td>{{ history.mileage }}</td>
                                <td>{{ history.location }}</td>
                                <td>{{ history.event_code }}</td>
                                <td>{{ history.event_name }}</td>
                                <td>{{ history.event_value }}</td>
                                <td>{{ history.event_threshold }}</td>
                                <td>{{ history.event_remark }}</td>
                                <td style="text-align: left;" v-for="(s, index) in history.sensor" :key="index">
                                    name: {{ s.name }} <br>
                                    value: {{ s.value }}
                                </td>
                            </tr>
                            <tr v-if="historys.length === 0">
                                <td colspan="25" style="text-align: left;">No History Data</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr v-for="(history, index) in gps_datafilter" :key="index">
                                <td>{{ (index + 1) + ((currentPage - 1) * itemsPerPage) }}</td>
                                <td>{{ history.unit_id }}</td>
                                <td>{{ history.gps_time }}</td>
                                <td>{{ history.receive_time }}</td>
                                <td>{{ history.lat }}</td>
                                <td>{{ history.lng }}</td>
                                <td>{{ history.alt }}</td>
                                <td>{{ history.speed }}</td>
                                <td>{{ history.direction }}</td>
                                <td>{{ history.gps_status }}</td>
                                <td>{{ history.satellite }}</td>
                                <td>{{ history.hdop }}</td>
                                <td>{{ history.base_station }}</td>
                                <td>{{ history.engine_status }}</td>
                                <td>{{ history.license }}</td>
                                <td>{{ history.ext_power }}</td>
                                <td>{{ history.ext_power_status }}</td>
                                <td>{{ history.mileage }}</td>
                                <td>{{ history.location }}</td>
                                <td>{{ history.event_code }}</td>
                                <td>{{ history.event_name }}</td>
                                <td>{{ history.event_value }}</td>
                                <td>{{ history.event_threshold }}</td>
                                <td>{{ history.event_remark }}</td>
                                <td style="text-align: left;" v-for="(s, index) in history.sensor" :key="index">
                                    name: {{ s.name }} <br>
                                    value: {{ s.value }}
                                </td>
                            </tr>
                            <tr v-if="gps_datafilter.length === 0">
                                <td colspan="25" style="text-align: left;">No History Data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div v-if="permission === 0">
        <h3 style="text-align: center;"> No Permission to Access This Data </h3>
    </div>
</template>

<script>
import gps_dataController from '../controllers/gps_dataController';
import vehicleController from '../controllers/vehicleController';

export default {
    name: 'HistoryPage',
    data() {
        return {
            loadingScreen: true,

            mapOptions: {
                scrollwheel: true,
                styles: [
                    {
                        featureType: "all",
                        elementType: "geometry",
                        stylers: [
                            { visibility: "on" },  // ซ่อนรายละเอียด
                        ],
                    },
                    {
                        featureType: "administrative",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]  // ซ่อนชื่อสถานที่หรือป้าย
                    },
                    {
                        featureType: "poi",  // จุดที่สนใจ
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]  // ซ่อนป้ายของจุดที่สนใจ
                    },
                ],
            },

            unit_id: this.$route.params.unit_id,
            permission: '',

            historys: [],
            gpsData: [],
            currentPosition: [],

            gps_datafilter: [],
            search: '',
            startDate: '',
            endDate: '',

            currentPage: 1,
            itemsPerPage: 100,

            intervalID: null,
        }
    },
    created() {
        const unit_id = this.$route.params.unit_id;
        this.showGPS_Data(unit_id);
    },
    mounted() {
        let index = this.historys.length - 1;

        this.intervalID = setInterval(() => {
            this.currentPosition = [this.historys[index]];
            index--;

            if (index <= 0) {
                index = this.historys.length - 1;
            }
        }, 100);
    },
    beforeUnmount() {
        clearInterval(this.intervalID);
    },
    methods: {
        async showGPS_Data(unit_id) {
            try {
                this.permission = await vehicleController.getVehicleByUnit_id(unit_id);
                if(this.permission === 0){
                    this.loadingScreen = false;
                    return;
                }
                this.historys = await gps_dataController.getGPS_Data(unit_id);

            } catch (error) {
                console.error('Failed to load GPS Data:', error);
            }
            
            this.loadingScreen = false;
            console.log(this.historys);
        },

        showGPS_DataFilter() {
            if (!this.startDate && !this.endDate) {
                return this.search = '';
            }

            if (!this.startDate){
                this.startDate = this.endDate;
            } else if (!this.endDate){
                this.endDate = this.startDate;
            }

            if (new Date(this.startDate) > new Date(this.endDate) ){
                this.endDate = this.startDate;
            }

            this.search = 'data';
            this.currentPage = 1;

            const result = this.historys.filter(history => {
                const historyDate = new Date(history.gps_time);
                const historyDateString = historyDate.toISOString().split('T')[0];

                const startDateString = new Date(this.startDate).toISOString().split('T')[0];
                const endDateString = new Date(this.endDate).toISOString().split('T')[0];

                return historyDateString >= startDateString && historyDateString <= endDateString;
            });

            if (result.length === 0) {
                this.startDate = null;
                this.endDate = null;
                this.gps_datafilter = [];
            } else {
                this.gps_datafilter = result;
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
        centerLat() {
            return this.historys.length ? this.historys[this.historys.length - 1].lat : 13.67684; // Default: Bangkok
        },
        centerLng() {
            return this.historys.length ? this.historys[this.historys.length - 1].lng : 100.60351; // Default: Bangkok
        },

        paginatedItems() {
            if (this.search === 'data') {
                return this.showGPS_DataFilter;
            }

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.historys.slice(startIndex, startIndex + this.itemsPerPage);
        },

        totalPages() {
            if (this.search === 'data') {
                return 1;
            }

            return Math.ceil(this.historys.length / this.itemsPerPage);
        }
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

.map-container {
    margin: 8px 0px 20px 0px;
    padding: 4px;
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 30px;
    background-color: #E5E5E5;
}

.data-container {
    position: relative;
    width: 100%;
    height: auto;
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
    padding-left: 8px;
    padding-right: 8px;
    width: 120px;
    height: 30px;
    border: none;
    border-radius: 30px;

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

.previous:hover,
.next:hover {
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
    width: 55px;
    height: 20px;
    border: none;
    border-radius: 30px;
    padding-left: 2px;
}

.search-button {
    background-color: #B3DAF2;
}

button {
    background: rgb(107, 201, 255);
    color: #000;
    font-weight: 600;
    border: none;
    padding: 4px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 16px;
    border: 2px solid transparent;
    border-radius: 30px;
    transition: 0.3s ease;
    width: 80px;
}

button:hover {
    color: #fff;
    border-color: #fff;
    background: rgba(255, 255, 255, 0.15);
}

.table-container {
    position: sticky;
    overflow: auto;
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

.statistic-container {
    margin-top: 8px;
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 30px;
    background-color: #E5E5E5;
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
</style>