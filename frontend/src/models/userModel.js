import axios from 'axios';
export default {
    async getUsersFromAPI() {
        try {
            const response = await axios.get('http://localhost:5038/api/users/getusers', { withCredentials: true });
            console.log('Users Data:', response.data);
            return response.data;
        } catch (error) {
            console.log('Failed to get users', error);
        }
    },

    async getProfileFromAPI() {
        try {
            const response = await axios.get('http://localhost:5038/api/users/getprofile', { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Failed to get profile', error);
        }
    },

    async login(username, password) {
        try {
            const response = await axios.post('http://localhost:5038/api/users/login', {
                username,
                password
            }, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Log in Failed:', error);
        }
    },

    async reCreateAPI_Key() {
        try {
            const response = await axios.patch('http://localhost:5038/api/users/reapi_key', {}, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Failed to Re Create API Key:', error);
        }
    },

    async update_AccountData(firstname, lastname, email, phone) {
        try {
            const response = await axios.patch('http://localhost:5038/api/users/update_account', {
                firstname, lastname, email, phone
            }, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.log('Failed to Update Account User Data:', error);
        }
    },

    async update_Password(old_password, new_password) {
        try {
            const response = await axios.patch('http://localhost:5038/api/users/update_password', {
                old_password, new_password
            }, { withCredentials: true });

            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log('Failed to Update Password:', error);
        }
    },
};