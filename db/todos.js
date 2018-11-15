import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import lodashId from "lodash-id"

const db = low(new FileSync("db.json"))
db._.mixin(lodashId)

const seed = ["Eat", "Sleep", "Code"]
  .map(name => ({ name, done: false, parentId: null }))
  .map((todo, i, array) => ({
    ...todo,
    id: db._.createId(array, todo)
  }))

const todos = db
  .defaults({
    todos: seed
  })
  .get("todos")

const startState = [...todos.value()]

todos.reset = () => {
  db.set("todos", [...startState]).write()

  return todos.value()
}

todos.hardReset = () => {
  db.set("todos", [...seed]).write()

  return todos.value()
}

export default todos
