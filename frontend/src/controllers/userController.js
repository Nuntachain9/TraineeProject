import userModel from '../models/userModel';

export default {

  async getUsers() {
    try {
      const users = await userModel.getUsersFromAPI();
      return users;
    } catch (error) {
      return console.error('Failed to get users From API:', error);
    }
  },

  async getProfile() {
    try {
      const user = await userModel.getProfileFromAPI();
      return user;
    } catch (error) {
      return console.error('Failed to get user data From API:', error);
    }
  },

  async getLogin(username, password) {
    try {
      const user = await userModel.login(username, password);

      return user;
    } catch (error) {
      return console.error('Failed to Log in From API:', error);
    }
  },

  async newAPI_Key() {
    try {
      const result = await userModel.reCreateAPI_Key();

      return result;
    } catch (error) {
      return console.error('Failed to Re Create API Key From API:', error);
    }
  },

  async update_Data(firstname, lastname, email, phone) {
    try {
      const result = await userModel.update_AccountData(firstname, lastname, email, phone);

      return result;
    } catch (error) {
      return console.error('Failed to Update Data From API:', error);
    }
  },

  async update_Password(old_password, new_password) {
    try {
      const result = await userModel.update_Password(old_password, new_password);

      return result;
    } catch (error) {
      return console.error('Failed to Update Password From API:', error);
    }
  }
};