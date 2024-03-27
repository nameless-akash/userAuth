const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/userVisibility/schema');
const resolvers = require('./src/userVisibility/resolvers');
const verifyToken = require('./authMiddleware');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
    //TODO: Handle extraction of request user information from header
    // currently using hardcoded values
        return { user: {
                userId: "1",
                bio: "here we go",
                visibility: "PRIVATE",
                role: "NORMAL"
            } };
    },
});

const app = express();

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer().then(() => {
    console.log("Server started successfully!");
}).catch(err => {
    console.error("Failed to start server:", err);
});