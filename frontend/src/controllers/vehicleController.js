import vehicleModel from '../models/vehicleModel';
import vendorModel from '@/models/vendorModel';

export default {
    async getVehiclesWithvendorName() {
        try {
            let vehicles = await vehicleModel.getVehiclesFromAPI();
            let vendors = await vendorModel.getVendorsFromAPI();

            let vendorMap = vendors.reduce((map, vendor) => {
                map[vendor.vendor_id] = vendor.name;
                return map;
            }, {});

            vehicles = vehicles.map(vehicle => {
                let vendorName = vendorMap[vehicle.vendor_id] || 'Unknown';
                return {
                    ...vehicle,
                    "vendor_name": vendorName
                };
            });

            return vehicles;
        } catch (error) {
            return console.error('Failed to get vehicles from API:', error);
        }
    },

    async getVehicleByUnit_id(unit_id) {
        try {
            const getVehicle = await vehicleModel.getVehicleByUnit_idFromAPI(unit_id);
            return getVehicle;
        } catch (error) {
            return console.error('Failed to get vehicle from API:', error);
        }
    },

    async updateVehicle(vehicle) {
        try {
            const vehicleUpdate = await vehicleModel.updateVehicleFromAPI(vehicle);
            return vehicleUpdate;
        } catch (error) {
            return console.error('Failed to update vehicle from API:', error);
        }
    },

    async deleteVehicle(unit_id) {
        try {
            await vehicleModel.deleteVehicleFromAPI(unit_id);

        } catch (error) {
            return console.error('Failed to delete vehicle from API:', error);
        }
    }
}