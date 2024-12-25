const axios = require('axios');

const userResolver = {
  Query: {
    profile: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const response = await axios.get(`http://127.0.0.1:3002/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return {
        status: response.status,
        id: response.data.id,
        username: response.data.username,
        profileImage: response.data.profileImage,
      };
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const response = await axios.post(`http://127.0.0.1:3002/login`, {
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
    },
    register: async (_, { username, password }) => {
      const response = await axios.post(`http://127.0.0.1:3002/register`, {
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
    },
    updateProfileImage: async (_, { profileImage }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const response = await axios.post(
        `http://127.0.0.1:3002/profile/image`,
        { profileImage },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return {
        status: response.status,
        id: response.data.user.id,
        username: response.data.user.username,
        profileImage: response.data.user.profileImage,
      };
    },
    updateUsername: async (_, { newUsername }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const response = await axios.put(
        `http://127.0.0.1:3002/username`,
        { newUsername },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return {
        status: response.status,
        id: response.data.user.id,
        username: response.data.user.username,
        profileImage: response.data.user.profileImage,
      };
    },
  },
};

module.exports = userResolver;
