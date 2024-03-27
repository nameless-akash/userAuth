# GraphQL Server Documentation

This GraphQL server provides functionality for managing user profiles with authentication and authorization features.

## Getting Started

To get started with using this GraphQL server, follow the instructions below:

1. Clone the repository:

```bash
git clone https://github.com/nameless-akash/userAuth.git
```

2. Install dependencies:

```bash
cd userAuth
npm install
```

3. Set up environment variables (optional for now):

Create a `.env` file in the root directory of the project and add any necessary environment variables.

4. Start the server:

```bash
npm start
```

The server will start running at http://localhost:4000/graphql.

## Schema

The GraphQL schema defines the types and operations supported by the server.

```graphql
// schema.js
<Schema Definitions>
```

## Resolvers

The resolvers define the logic for processing GraphQL queries and mutations.

```javascript
// resolvers.js
<Resolver Functions>
```

## Queries

### getUserProfile

Fetches the profile of a specific user.

```graphql
query {
  getUserProfile(userId: "user_id_here") {
    userId
    bio
    visibility
  }
}
```

Replace `"user_id_here"` with the ID of the user whose profile you want to fetch.

### getProfiles

Fetches all profiles.

```graphql
query {
  getProfiles {
    userId
    bio
    visibility
  }
}
```

This query returns all profiles based on req access level.

## Mutations

### updateProfileVisibility

Updates the visibility of a user's profile.

```graphql
mutation {
  updateProfileVisibility(input: { userId: "user_id_here", visibility: PUBLIC }) {
    userId
    visibility
  }
}
```

Replace `"user_id_here"` with the ID of the user whose profile visibility you want to update. The `visibility` parameter can be either `PUBLIC` or `PRIVATE`.

### addUserProfile

Adds a new user profile.

```graphql
mutation {
  addUserProfile(input: { userId: "user_id_here", bio: "User's bio", visibility: PUBLIC, role: NORMAL }) {
    userId
    bio
    visibility
  }
}
```

Replace `"user_id_here"` with the ID of the user for whom you want to add a profile. Provide the user's bio, specify the profile visibility as `PUBLIC` or `PRIVATE`, and specify the user's role as `ADMIN` or `NORMAL`.

## Authentication

The server includes a default context function that provides hardcoded user information for demonstration purposes. You should replace this with proper authentication logic in your context function.

## Note

- Ensure that you have proper authentication and authorization before performing sensitive operations like updating profile visibility or adding a new user profile.
- For queries and mutations that require parameters (like `userId`), replace the placeholder values with actual data.

