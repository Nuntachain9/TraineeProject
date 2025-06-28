import vendorModel from '@/models/vendorModel';

export default {

    async getVendors() {
        try {
            const vendors = await vendorModel.getVendorsFromAPI();
            return vendors;
        } catch (error) {
            return console.error('Failed to get vendors from API:', error);
        }
    },

    async updateVendor(vendor_id, name) {
        try {
            const vendorUpdate = await vendorModel.updateVendorFromAPI(vendor_id, name);
            return vendorUpdate;
        } catch (error) {
            return console.error('Failed to update vendor from API:', error);
        }
    },

    async deleteVendor(vendor_id) {
        try {
            await vendorModel.deleteVendorFromAPI(vendor_id);

        } catch (error) {
            return console.error('Failed to delete vendor from API:', error);
        }
    }
}