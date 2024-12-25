const axios = require('axios');

const userResolver = {
  Query: {
    profile: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const response = await axios.get(`http://127.0.0.1:3000/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response.data;
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const response = await axios.post(`http://127.0.0.1:3000/login`, {
        username,
        password,
      });
      return response.data;
    },
    register: async (_, { username, password }) => {
      const response = await axios.post(`http://127.0.0.1:3000/register`, {
        username,
        password,
      });
      return response.data;
    },
    updateProfileImage: async (_, { profileImage }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const response = await axios.post(
        `http://user-service:3000/profile/image`,
        { profileImage },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return response.data;
    },
    updateUsername: async (_, { newUsername }, { user, dataSources }) => {
        if (!user) throw new Error('Not authenticated');
        return dataSources.userAPI.updateUsername(user.id, newUsername);
      },
  },
};

module.exports = userResolver;
