import React, { Component } from "react"
import { render } from "react-dom"
import { ApolloClient } from "apollo-client"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"
import {
  ApolloProvider,
  Query,
  Mutation,
  Subscription
} from "react-apollo"
import gql from "graphql-tag"

const cache = new InMemoryCache()

const uri =
  process.env.NODE_ENV === "development"
    ? "localhost:4000"
    : process.env.NOW_URL

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : `${process.env.NOW_URL}/graphql`
})

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "development"
      ? `ws://localhost:4000/graphql`
      : `wss://${process.env.NOW_URL}`.replace(
          "https://",
          ""
        ) + `/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return (
      kind === "OperationDefinition" &&
      operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  uri: "/graphql",
  link,
  cache
})

const ALL_TODOS_QUERY = gql`
  query {
    allTodos {
      name
      id
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($name: String!) {
    addTodo(name: $name) {
      name
      id
      done
    }
  }
`

const TODO_SUBSCRIPTION = gql`
  subscription {
    todoAdded {
      id
      name
    }
  }
`

let newTodos = []

class NewTodo extends Component {
  state = {
    value: ""
  }

  render() {
    return (
      <Mutation mutation={ADD_TODO}>
        {mutation => (
          <form
            onSubmit={e => {
              e.preventDefault()
              mutation({
                variables: { name: this.state.value }
              })
            }}
          >
            <input
              type="text"
              onInput={e =>
                this.setState({ value: e.target.value })
              }
            />
            <button type="submit">Add</button>
          </form>
        )}
      </Mutation>
    )
  }
}

const App = () => (
  <ApolloProvider client={client}>
    <h1>{uri}</h1>
    <NewTodo />
    <Query query={ALL_TODOS_QUERY}>
      {({ loading, data, error, subscribeToMore }) => (
        <div>
          <ul>
            {error
              ? "Error :("
              : loading
              ? "Loading..."
              : data.allTodos.map(todo => (
                  <li key={todo.id}>{todo.name}</li>
                ))}
          </ul>
          <Subscription subscription={TODO_SUBSCRIPTION}>
            {({ data }) => {
              newTodos = data
                ? [...newTodos, data.todoAdded]
                : newTodos
              return data ? (
                <div>
                  {newTodos.map(todo => (
                    <div key={todo.id}>{todo.name}</div>
                  ))}
                </div>
              ) : null
            }}
          </Subscription>
        </div>
      )}
    </Query>
    <hr />
  </ApolloProvider>
)

render(<App />, document.getElementById("app"))
