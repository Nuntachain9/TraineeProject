import axios from 'axios';

export default {

    async getVendorsFromAPI() {
        try {
            const response = await axios.get('http://localhost:5038/api/vendors/getvendors', { withCredentials: true });

            return response.data;
        } catch (error) {
            console.error('Failed to get vendors:', error);
            throw error;
        }
    },

    async updateVendorFromAPI(vendor_id, name) {
        try {
            const response = await axios.patch('http://localhost:5038/api/vendors/updatevendor', {
                vendor_id,
                name
            }, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.error('Failed to update vendor:', error);
            throw error;
        }
    },

    async deleteVendorFromAPI(vendor_id) {
        try {
            await axios.delete('http://localhost:5038/api/vendors/deletevendor', {
                data: { vendor_id },
                withCredentials: true
            });
        } catch (error) {
            console.error('Failed to delete vendor:', error);
            throw error;
        }
    }
}