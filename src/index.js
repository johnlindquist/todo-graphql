import typeDefs from "./typeDefs.graphql"
import resolvers from "./resolvers"
import { ApolloServer, PubSub } from "apollo-server"
import todos from "./todos"

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { todos, pubsub }
})

server.listen(4000)
