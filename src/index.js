const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
}]

let idCount = links.length

// resolvers
const resolvers = {
    Query: {
        info: () => `This is an API of a hackernews clone`,
        feeds: () => links
    },
    // The first argument, commonly called parent (or sometimes root) is the result of the previous resolver execution level.
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url, 
    // },

    Mutation: {
        createPost: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }

            links.push(link)
            return link
        },
        editPost: (parent, args) => {
            links.forEach(link => {
                if(link.id === args.id) {
                    link.id = args.id
                    link.url = args.url
                    link.description = args.description
                }
                return link
            })
        },
        deletePost: (parent, args) => {
            let index = links.findIndex(link => link.id === args.id)
            let removedPost = links[index]
            links.splice(index, 1)

            return removedPost
        } 
    }
}

// create a server and start
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log('server up and running at localhost:4000'))