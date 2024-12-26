const axios = require('axios');

const USER_API_URL = 'http://user-service:8080';
const userResolver = {
  Query: {
    profile: async ({ user }) => {
      try {
        if (!user) throw new Error("Not authenticated");
        const response = await axios.get(`${USER_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        return {
          status: response.status,
          id: response.data.id,
          username: response.data.username,
          profileImage: response.data.profileImage,
        };
      } catch (error) {
        console.error("Error fetching profile:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch profile");
      }
    },
  },
  Mutation: {
    login: async ({ username, password }) => {
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
        throw new Error("Failed to log in user");
      }
    },
    register: async ({ username, password }) => {
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
        throw new Error("Failed to register user");
      }
    },
    updateProfileImage: async ({ profileImage }, { user }) => {
      try {
        if (!user) throw new Error("Not authenticated");
        const response = await axios.post(
          `${USER_API_URL}/profile/image`,
          { profileImage },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        return {
          status: response.status,
          id: response.data.user.id,
          username: response.data.user.username,
          profileImage: response.data.user.profileImage,
        };
      } catch (error) {
        console.error("Error updating profile image:", error.response ? error.response.data : error.message);
        throw new Error("Failed to update profile image");
      }
    },
    updateUsername: async ({ newUsername }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const response = await axios.put(
          `${USER_API_URL}/username`,
          { newUsername },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        return {
          status: response.status,
          id: response.data.user.id,
          username: response.data.user.username,
          profileImage: response.data.user.profileImage,
        };
      } catch (error) {
        console.error("Error updating username:", error.response ? error.response.data : error.message);
        throw new Error("Failed to update username");
      }
    },
  },
};

module.exports = userResolver;
