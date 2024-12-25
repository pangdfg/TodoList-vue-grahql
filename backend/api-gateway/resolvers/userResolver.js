const axios = require('axios');

const userResolver = {
  Query: {
    profile: async (_, __, { user }) => {
      try {
        if (!user) throw new Error("Not authenticated");
        const response = await axios.get(`http://localhost:8080/profile`, {
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
    login: async (_, { username, password }) => {
      try {
        const response = await axios.post(`http://localhost:8080/login`, {
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
    register: async (_, { username, password }) => {
      try {
        console.log('username:', username);
        const response = await axios.post(`http://localhost:8080/register`, {
          username,
          password,
        });
        console.log('response:', response);
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
    updateProfileImage: async (_, { profileImage }, { user }) => {
      try {
        if (!user) throw new Error("Not authenticated");
        const response = await axios.post(
          `http://localhost:8080/profile/image`,
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
    updateUsername: async (_, { newUsername }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const response = await axios.put(
          `http://localhost:8080/username`,
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
