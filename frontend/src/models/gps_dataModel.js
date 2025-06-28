import axios from 'axios';
export default {
    async getGPS_DataFromAPI(unit_id) {
        try {
            const response = await axios.get(`http://localhost:5038/api/gps_data/history/${unit_id}`, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Failed to get GPS Data', error);
        }
    },

    async getLastGPS_DataFromAPI() {
        try {
            const response = await axios.get(`http://localhost:5038/api/gps_data/getlastgps_data`, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Failed to get GPS Data', error);
        }
    }
}