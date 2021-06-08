// 'use strict';

const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

// =================
// type definitions and resolvers
// =================
const typeDefs = gql`
    type Query {
        usersRecommendedItems(username: String!): [Item!]!
        item(id: ID!): Item
    }

    type Item {
        id: ID!
        name: String!
        img: String!
        department: String!
        category: String!
        weight: String
        packagedWeight: String
        price: Float!
    }
`;

const resolvers = {

    Query: {
        usersRecommendedItems: async (parent , args, context, info) => {
            // extract needed arguments
            const { username } = args;

            // log point before call
            console.log(`\nusersRecommendedItems > before GET /users/recommendations?username=${username}\n`);

            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/users/recommendations?username=${username}`
            );
            const listOfRecommendedItemIds = responseFromDataSource.data;

            // log point after call
            console.log(`\nusersRecommendedItems > after GET /users/recommendations?username=${username}, response => `, listOfRecommendedItemIds, '\n');

            const listOfRecommendedItemsToReturn = [];
            for(const itemId of listOfRecommendedItemIds) {
                // log point before call
                console.log(`\nusersRecommendedItems > before GET /items?ids=${itemId}\n`);

                // fetch the requested data from the data source
                const responseFromDataSource = await axios.get(
                    `http://localhost:3000/items?ids=${itemId}`
                );

                // log point after call
                console.log(`\nusersRecommendedItems > after GET /items?ids=${itemId}, response => `, responseFromDataSource.data, '\n');

                listOfRecommendedItemsToReturn.push(responseFromDataSource.data[0]);
            }

            // return the data
            return listOfRecommendedItemsToReturn;
        },
        item: async (parent, args, context, info) => {
            // extract needed arguments
            const { id } = args;

            // log point before call
            console.log(`\nitem > before GET /items?ids=${id}\n`);

            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/items?ids=${id}`
            );

            // log point after call
            console.log(`\nitem > after GET /items?ids=${id}, response => `, responseFromDataSource.data, '\n');

            // return the data
            return responseFromDataSource.data[0];
        }
    }
};

// =================
// configure the server
// =================
const port = 4000;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({ app });

// =================
// start / turn-on the server
// =================
app.listen({ port }, () => {
    console.log(
        `Graphql endpoint is at http://localhost:${port}${apolloServer.graphqlPath}`
    );
});
