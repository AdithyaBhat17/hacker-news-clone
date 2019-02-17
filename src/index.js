const { GraphQLServer } = require('graphql-yoga')

// schema
const typeDefs = `
    type Query {
        info: String!
        feeds: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`

let links = [{
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
}]

// resolvers
const resolvers = {
    Query: {
        info: () => `This is an API of a hackernews clone`,
        feeds: () => links
    },
    // The first argument, commonly called parent (or sometimes root) is the result of the previous resolver execution level.
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url, 
    }
}

// create a server and start
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('server up and running at localhost:4000'))