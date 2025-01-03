const userSchema = `
  type User {
    id: ID!
    username: String!
    profileImage: String
  }

  type AuthPayload {
    status: String!
    token: String!
    user: User!
  }

  type Query {
    profile: User!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, password: String!): AuthPayload!
    updateUsername(newUsername: String!): User!
    updateProfileImage(profileImage: String!): User!
  }
`;

module.exports = userSchema;
