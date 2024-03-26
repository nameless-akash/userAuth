const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: UserRole!
        profile: Profile!
    }

    enum UserRole {
        ADMIN
        NORMAL
    }
    type Profile {
        userId: ID!
        bio: String
        visibility: ProfileVisibility!
        role: UserRole
    }

    enum ProfileVisibility {
        PUBLIC
        PRIVATE
    }

    input UpdateProfileVisibilityInput {
        userId: ID!
        visibility: ProfileVisibility!
    }

    input AddUserProfileInput {
        userId: ID!
        bio: String
        visibility: ProfileVisibility!
        role: UserRole!
    }

    type Query {
        getUserProfile(userId: ID!): Profile!
    }

    type Mutation {
        updateProfileVisibility(input: UpdateProfileVisibilityInput!): Profile!
        addUserProfile(input: AddUserProfileInput!): Profile!
    }
`;

module.exports = typeDefs;
