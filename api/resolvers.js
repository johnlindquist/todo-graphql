export default {
  Todo: {
    parent: (parent, args, { todos }) =>
      parent.parentId
        ? todos.getById(parent.parentId).value()
        : null,
    children: (parent, args, { todos }) =>
      todos
        .filter(todo => todo.parentId === parent.id)
        .value()
  },
  Query: {
    allTodos: (parent, args, { todos }) => todos.value(),
    searchTodos: (parent, { term }, { todos }) =>
      todos
        .filter(todo =>
          todo.name.match(new RegExp(`.*${term}.*`, "i"))
        )
        .value()
  },
  Mutation: {
    reset: (parent, args, { todos }) => todos.reset(),
    reset: (parent, args, { todos }) => todos.hardReset(),
    addTodo: (parent, { name }, { todos, pubsub }) => {
      const todo = todos
        .insert({
          name,
          done: false
        })
        .write()
      console.log({ todo })
      pubsub.publish("todo-added", { todoAdded: todo })

      return todo
    },
    addParent: (parent, { id, parentId }, { todos }) =>
      todos
        .getById(id)
        .update("parentId", () => parentId)
        .write(),
    addParentByName: (
      parent,
      { name, parentName },
      { todos }
    ) =>
      todos
        .find(todo => todo.name === name)
        .update("parentId", () =>
          todos
            .find(todo => todo.name === parentName)
            .get("id")
            .value()
        )
        .write(),
    toggleDone: (parent, { id }, { todos }) =>
      todos
        .getById(id)
        .update("done", done => !done)
        .write(),
    removeTodo: (parent, { id }, { todos }) =>
      todos.remove(todo => todo.id === id).write()
  },
  Subscription: {
    todoAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("todo-added")
    }
  }
}
