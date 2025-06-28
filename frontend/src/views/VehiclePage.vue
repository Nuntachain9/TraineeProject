<template>
    <div class="loadingScreen-overlay" v-if="loadingScreen">
        <div style="position: fixed; left: 50%; top: 50%; z-index: 1;">
            <i class="fa fa-spinner fa-spin fa-fw"
                style="display: flex; align-items: center; justify-content:  center; font-size: 200px; color: skyblue;"></i>
        </div>
    </div>

    <div class="container" v-if="loadingScreen == false">
        <h3>Vehicle Lists</h3>
        <div class="header-container">
            <div class="left">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search By Unit ID" v-model="search">
            </div>
            <div class="right">
                <div class="item">
                    Item
                    <select id="item" name="item" v-model="itemsPerPage" @change="resetPage">
                        <option value=5>5</option>
                        <option value=50>50</option>
                        <option value=100>100</option>
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
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Chassis_no</th>
                        <th>Plate</th>
                        <th>Province Code</th>
                        <th>Camera Status</th>
                        <th>Camera Count</th>
                        <th>Card Reader</th>
                        <th>Voice Alert</th>
                        <th>Simcard Number</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody v-if="search === ''">
                    <tr v-for="(vehicle, index) in paginatedItems" :key="index">
                        <td>{{ vehicle.unit_id }}</td>
                        <td>{{ vehicle.vendor_name }}</td>
                        <td>{{ vehicle.vehicle_brand }}</td>
                        <td>{{ vehicle.vehicle_model }}</td>
                        <td>{{ vehicle.vehicle_type }}</td>
                        <td>{{ vehicle.vehicle_chassis_no }}</td>
                        <td>{{ vehicle.vehicle_plate }}</td>
                        <td>{{ vehicle.province_code }}</td>
                        <td>{{ vehicle.camera_status }}</td>
                        <td>{{ vehicle.camera_count }}</td>
                        <td>{{ vehicle.card_reader }}</td>
                        <td>{{ vehicle.voice_alert }}</td>
                        <td>{{ vehicle.simcard_number }}</td>
                        <td class="edit-box">
                            <button class="edit-button" @click="editVehicle(vehicle)"> EDIT</button>
                            <button class="delete-button" @click="deleteVehicle(vehicle)">DELETE</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="vehicle in showVehicleFilter" :key="vehicle.vehicle_id">
                        <td>{{ vehicle.unit_id }}</td>
                        <td>{{ vehicle.vendor_name }}</td>
                        <td>{{ vehicle.vehicle_brand }}</td>
                        <td>{{ vehicle.vehicle_model }}</td>
                        <td>{{ vehicle.vehicle_type }}</td>
                        <td>{{ vehicle.vehicle_chassis_no }}</td>
                        <td>{{ vehicle.vehicle_plate }}</td>
                        <td>{{ vehicle.province_code }}</td>
                        <td>{{ vehicle.camera_status }}</td>
                        <td>{{ vehicle.camera_count }}</td>
                        <td>{{ vehicle.card_reader }}</td>
                        <td>{{ vehicle.voice_alert }}</td>
                        <td>{{ vehicle.simcard_number }}</td>
                        <td class="edit-box">
                            <button class="edit-button" @click="editVehicle(vehicle)"> EDIT</button>
                            <button class="delete-button" @click="deleteVehicle(vehicle)">DELETE</button>
                        </td>
                    </tr>
                    <tr v-if="showVehicleFilter.length === 0">
                        <td colspan="14">No data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pop-up Edit -->
    <div class="popup-overlay" v-if="vehicleToEdit">
        <div class="popup-content">
            <h3>Edit Vehicle</h3>
            <form @submit.prevent="saveEdit(vehicleToEdit)">
                <div class="edit-container">
                    <div class="disable">
                        <label>Unit ID:</label>
                        <input type="text" v-model="vehicleToEdit.unit_id" disabled />
                    </div>

                    <div class="disable">
                        <label>Vendor ID:</label>
                        <input type="text" v-model="vehicleToEdit.vendor_id" disabled />
                    </div>

                    <div class="enable">
                        <label>Brand:</label>
                        <input type="text" v-model="vehicleToEdit.vehicle_brand" />
                    </div>

                    <div class="enable">
                        <label>Model:</label>
                        <input type="text" v-model="vehicleToEdit.vehicle_model" />
                    </div>

                    <div class="enable">
                        <label>Type:</label>
                        <input type="text" v-model="vehicleToEdit.vehicle_type" />
                    </div>

                    <div class="enable">
                        <label>Chassis no:</label>
                        <input type="text" v-model="vehicleToEdit.vehicle_chassis_no" />
                    </div>

                    <div class="enable">
                        <label>Plate:</label>
                        <input type="text" v-model="vehicleToEdit.vehicle_plate" />
                    </div>

                    <div class="enable">
                        <label>Province Code:</label>
                        <input type="text" v-model="vehicleToEdit.province_code" />
                    </div>

                    <div class="enable">
                        <label>Camera Status:</label>
                        <input type="text" v-model="vehicleToEdit.camera_status" />
                    </div>

                    <div class="enable">
                        <label>Camera Count:</label>
                        <input type="text" v-model="vehicleToEdit.camera_count" />
                    </div>

                    <div class="enable">
                        <label>Card Reader:</label>
                        <input type="text" v-model="vehicleToEdit.card_reader" />
                    </div>

                    <div class="enable">
                        <label>Voice Alert:</label>
                        <input type="text" v-model="vehicleToEdit.voice_alert" />
                    </div>

                    <div class="enable">
                        <label>Simcard Number:</label>
                        <input type="text" v-model="vehicleToEdit.simcard_number" />
                    </div>
                </div>

                <div class="popup-buttons">
                    <button type="submit" class="save-button">Save</button>
                    <button type="button" class="cancel-button" @click="vehicleToEdit = null">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Pop-up Delete -->
    <div class="popup-overlay" v-if="vehicleToDelete">
        <div class="popup-content">
            <h3>Confirm to Delete</h3>
            <div class="disable">
                <label>Unit ID:</label>
                <input type="text" v-model="vehicleToDelete.unit_id" disabled />
            </div>
            <div class="disable">
                <label>Vendor Name:</label>
                <input type="text" v-model="vehicleToDelete.vendor_name" disabled />
            </div>
            <div class="disable">
                <label>Vendor Plate:</label>
                <input type="text" v-model="vehicleToDelete.vehicle_plate" disabled />
            </div>
            <div class="popup-buttons">
                <button class="save-button" @click="confirmDeleteVehicle(vehicleToDelete.unit_id)">Yes, Delete</button>
                <button class="cancel-button" @click="vehicleToDelete = null">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import vehicleController from '@/controllers/vehicleController';

export default {
    name: 'VehiclePage',
    data() {
        return {
            loadingScreen: true,

            vehicles: [],
            vehiclesfilter: [],
            search: '',

            vehicleToEdit: null,
            vehicleToDelete: null,

            currentPage: 1,
            itemsPerPage: 5,

        }
    },
    created() {
        this.showVehicles();
    },
    methods: {
        async showVehicles() {
            try {
                this.vehicles = await vehicleController.getVehiclesWithvendorName();
            } catch (error) {
                console.error('Failed to get Vehicles:', error);
            }

            this.loadingScreen = false;
        },

        editVehicle(vehicle) { //click button function to show pop up editor
            this.vehicleToEdit = { ...vehicle };
        },

        deleteVehicle(vehicle) {
            this.vehicleToDelete = { ...vehicle };
        },

        async saveEdit(vehicle) {// ต้องแก้ใหม่
            try {
                await vehicleController.updateVehicle(vehicle);
            } catch (error) {
                console.error('Failed to update vehicle:', error);
            }

            this.vehicleToEdit = null;
            this.showVehicles();
        },

        async confirmDeleteVehicle(unit_id) {
            console.log('hello world', unit_id);
            try {
                await vehicleController.deleteVehicle(unit_id);
            } catch (error) {
                console.error('Failed to delete vehicle:', error);
            }
            this.vehicleToDelete = null;
            this.showVehicles();
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
        showVehicleFilter() {
            return this.vehicles.filter((vehicle) =>
                vehicle.unit_id.toString().includes(this.search)
            );
        },

        paginatedItems() {
            if (this.search.length > 0) {
                return this.showVehicleFilter;
            }

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.vehicles.slice(startIndex, startIndex + this.itemsPerPage);
        },

        totalPages() {
            if (this.search.length > 0) {
                return 1;
            }

            return Math.ceil(this.vehicles.length / this.itemsPerPage);
        }
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
    white-space: nowrap
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
    width: auto;
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

.edit-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.disable,
.enable {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
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