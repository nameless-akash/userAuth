const { getUserProfile, updateProfileVisibility, addUserProfile } = require('./db');

const resolvers = {
    Query: {
        getUserProfile: async (_, { userId }, context) => {
            // Check if the user is authenticated and their role
            if (!context.user || context.user.role === 'NORMAL') {
                // Normal user can only access public profiles
                const profile = await getUserProfile(userId);
                if (profile.visibility !== 'PUBLIC') {
                    throw new Error('Access denied. Only public profiles can be accessed.');
                }
                return profile;
            } else {
                // Admin user can access all profiles
                return await getUserProfile(userId);
            }
        },
    },
    Mutation: {
        updateProfileVisibility: async (_, { input }) => {
            const { userId, visibility } = input;
            return await updateProfileVisibility(userId, visibility);
        },
        addUserProfile: async (_, { input }) => {
            const { userId, bio, visibility, role } = input;
            return await addUserProfile(userId, bio, visibility, role);
        },
    },
};

module.exports = resolvers;
