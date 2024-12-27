const axios = require('axios');

const USER_API_URL = 'http://user-service:8080';
const userResolver = {
  Query: {
    profile: async (_, __, { userAuth }) => {
      try {
        const response = await axios.get(`${USER_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${userAuth}` },
        });
        return {
          status: response.status,
          id: response.data.id,
          username: response.data.username,
          profileImage: response.data.profileImage,
        };
      } catch (error) {
        console.error("Error fetching profile:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const response = await axios.post(`${USER_API_URL}/login`, {
          username,
          password,
        });
        return {
          status: response.status,
          token: response.data.token,
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            profileImage: response.data.user.profileImage,
          },
        };
      } catch (error) {
        console.error("Error logging in user:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    register: async (_, { username, password }) => {
      try {
        const response = await axios.post(`${USER_API_URL}/register`, {
          username,
          password,
        });
        return {
          status: response.status,
          token: response.data.token,
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            profileImage: response.data.user.profileImage,
          },
        };
      } catch (error) {
        console.error("Error registering user:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    updateProfileImage: async (_, { profileImage }, { userAuth }) => {
      try {
        const response = await axios.post(
          `${USER_API_URL}/profile/image`,
          { profileImage },
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return {
          status: response.status,
          id: response.data.user.id,
          username: response.data.user.username,
          profileImage: response.data.user.profileImage,
        };
      } catch (error) {
        console.error("Error updating profile image:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    updateUsername: async (_, { newUsername }, { userAuth }) => {
      try {
        const response = await axios.put(
          `${USER_API_URL}/username`,
          { newUsername },
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return {
          status: response.status,
          id: response.data.user.id,
          username: response.data.user.username,
          profileImage: response.data.user.profileImage,
        };
      } catch (error) {
        console.error("Error updating username:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
  },
};

module.exports = userResolver;
