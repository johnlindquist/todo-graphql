import React from "react"
import { render } from "react-dom"
import { gql } from "apollo-boost"
import ApolloClient from "apollo-boost"
import {
  ApolloProvider,
  Query,
  Mutation
} from "react-apollo"

const client = new ApolloClient({
  uri: "/graphql"
})

const ALL_TODOS_QUERY = gql`
  query {
    allTodos {
      name
      id
    }
  }
`

const App = () => (
  <ApolloProvider client={client}>
    <h1>Todos</h1>
    <Query query={ALL_TODOS_QUERY}>
      {({ loading, data, error }) => (
        <ul>
          {error
            ? "Error :("
            : loading
            ? "Loading..."
            : data.allTodos.map(todo => (
                <li key={todo.id}>{todo.name}</li>
              ))}
        </ul>
      )}
    </Query>
  </ApolloProvider>
)

render(<App />, document.getElementById("app"))
