import gps_dataModel from "../models/gps_dataModel";

export default{
    async getGPS_Data(unit_id){
        try {
            const gps_data = await gps_dataModel.getGPS_DataFromAPI(unit_id);
            
            return gps_data;
        } catch (error) {
            return console.error('Failed to get gps data From API:', error);
        }
    },

    async getLastGPS_Data() {
        try {
            const lastgps_data = await gps_dataModel.getLastGPS_DataFromAPI();
            
            return lastgps_data;
        } catch (error) {
            return console.error('Failed to get last gps data From API:', error);
        }
    }
}