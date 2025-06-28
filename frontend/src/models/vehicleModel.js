import axios from 'axios';

export default {
    async getVehiclesFromAPI() {
        try {
            const response = await axios.get('http://localhost:5038/api/vehicles/getvehicles', { withCredentials: true });

            return response.data;
        } catch (error) {
            console.error('Failed to get vehicles:', error);
            throw error;
        }
    },

    async getVehicleByUnit_idFromAPI(unit_id) {
        try {
            const response = await axios.get('http://localhost:5038/api/vehicles/getvehiclebyunit_id', {
                params: { unit_id },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Failed to get vehicle:', error);
            throw error;
        }
    },

    async updateVehicleFromAPI(vehicle) {
        try {
            const response = await axios.patch('http://localhost:5038/api/vehicles/updatevehicle', {
                vehicle
            }, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.error('Failed to update vehicle', error);
            throw error;
        }
    },

    async deleteVehicleFromAPI(unit_id){
        try {
            await axios.delete('http://localhost:5038/api/vehicles/deletevehicle', {
                data: { unit_id },
                withCredentials: true
            });
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
            throw error;
        }
    }
}