import todos from "./db/todos"
import typeDefs from "./api/typeDefs.gql"
import resolvers from "./api/resolvers"
import { ApolloServer, PubSub } from "apollo-server-express"
import express, { static } from "express"
import { createServer } from "http"

const app = express()

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { todos, pubsub },
  subscriptions: { path: "/graphql" }
})

server.applyMiddleware({ app, path: "/graphql" })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

if (process.env.NODE_ENV === "development") {
  const Bundler = require("parcel-bundler")
  const bundler = new Bundler("www/index.html", {})

  app.use(bundler.middleware())
} else {
  app.use("/", static("./dist/public"))
}

const port = 4000
httpServer.listen({ port }, () => {
  console.log(`running on port ${port}`)
})
