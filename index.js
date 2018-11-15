import todos from "./db/todos"
import typeDefs from "./api/typeDefs.gql"
import resolvers from "./api/resolvers"
import { ApolloServer, PubSub } from "apollo-server-express"
import express, { static } from "express"

const app = express()
//https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { todos, pubsub }
})

server.applyMiddleware({ app, path: "/graphql" })

if (process.env.NODE_ENV === "development") {
  const Bundler = require("parcel-bundler")
  const file = "www/index.html" // Pass an absolute path to the entrypoint here
  const options = {} // See options section of api docs, for the possibilities

  // // Initialize a new bundler using a file and options
  const bundler = new Bundler(file, options)

  // Let express use the bundler middleware, this will let Parcel handle every request over your express server
  app.use(bundler.middleware())
} else {
  app.use("/", static("./dist/public"))
}

app.listen(4000)
