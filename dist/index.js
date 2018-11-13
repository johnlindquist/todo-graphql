// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"typeDefs.graphql":[function(require,module,exports) {
module.exports = {
  "kind": "Document",
  "definitions": [{
    "kind": "ObjectTypeDefinition",
    "name": {
      "kind": "Name",
      "value": "Todo"
    },
    "interfaces": [],
    "directives": [],
    "fields": [{
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "id"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "ID"
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "name"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "String"
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "done"
      },
      "arguments": [],
      "type": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "Boolean"
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "parentId"
      },
      "arguments": [],
      "type": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "ID"
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "parent"
      },
      "arguments": [],
      "type": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "Todo"
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "children"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }]
  }, {
    "kind": "ObjectTypeDefinition",
    "name": {
      "kind": "Name",
      "value": "Query"
    },
    "interfaces": [],
    "directives": [],
    "fields": [{
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "allTodos"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "searchTodos"
      },
      "arguments": [{
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "term"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          }
        },
        "directives": []
      }],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }]
  }, {
    "kind": "ObjectTypeDefinition",
    "name": {
      "kind": "Name",
      "value": "Mutation"
    },
    "interfaces": [],
    "directives": [],
    "fields": [{
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "addTodo"
      },
      "arguments": [{
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "name"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "String"
            }
          }
        },
        "directives": []
      }],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Todo"
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "removeTodo"
      },
      "arguments": [{
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "id"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ID"
            }
          }
        },
        "directives": []
      }],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "toggleDone"
      },
      "arguments": [{
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "id"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ID"
            }
          }
        },
        "directives": []
      }],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Todo"
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "reset"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "hardReset"
      },
      "arguments": [],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "ListType",
          "type": {
            "kind": "NonNullType",
            "type": {
              "kind": "NamedType",
              "name": {
                "kind": "Name",
                "value": "Todo"
              }
            }
          }
        }
      },
      "directives": []
    }, {
      "kind": "FieldDefinition",
      "name": {
        "kind": "Name",
        "value": "addParent"
      },
      "arguments": [{
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "id"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ID"
            }
          }
        },
        "directives": []
      }, {
        "kind": "InputValueDefinition",
        "name": {
          "kind": "Name",
          "value": "parentId"
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ID"
            }
          }
        },
        "directives": []
      }],
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "Todo"
          }
        }
      },
      "directives": []
    }]
  }],
  "loc": {
    "start": 0,
    "end": 378
  }
};
},{}],"resolvers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Todo: {
    parent: (parent, args, { todos }) => parent.parentId ? todos.getById(parent.parentId).value() : null,
    children: (parent, args, { todos }) => todos.filter(todo => todo.parentId === parent.id).value()
  },
  Query: {
    allTodos: (parent, args, { todos }) => todos.value(),
    searchTodos: (parent, { term }, { todos }) => todos.filter(todo => todo.name.match(new RegExp(`.*${term}.*`, "i"))).value()
  },
  Mutation: {
    reset: (parent, args, { todos }) => todos.reset(),
    reset: (parent, args, { todos }) => todos.hardReset(),
    addTodo: (parent, { name }, { todos }) => todos.insert({
      name,
      done: false
    }).write(),
    addParent: (parent, { id, parentId }, { todos }) => {
      return todos.getById(id).update("parentId", () => parentId).write();
    },
    toggleDone: (parent, { id }, { todos }) => {
      return todos.getById(id).update("done", done => !done).write();
    },
    removeTodo: (parent, { id }, { todos }) => {
      return todos.remove(todo => todo.id === id).write();
    }
  }
};
},{}],"todos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lowdb = require("lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = require("lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

var _lodashId = require("lodash-id");

var _lodashId2 = _interopRequireDefault(_lodashId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = (0, _lowdb2.default)(new _FileSync2.default("db.json"));
db._.mixin(_lodashId2.default);

const seed = ["Eat", "Sleep", "Code"].map(name => ({ name, done: false, parentId: null })).map((todo, i, array) => _extends({}, todo, {
  id: db._.createId(array, todo)
}));

const todos = db.defaults({
  todos: seed
}).get("todos");

const startState = [...todos.value()];

todos.reset = () => {
  db.set("todos", [...startState]).write();

  return todos.value();
};

todos.hardReset = () => {
  db.set("todos", [...seed]).write();

  return todos.value();
};

exports.default = todos;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _typeDefs = require("./typeDefs.graphql");

var _typeDefs2 = _interopRequireDefault(_typeDefs);

var _resolvers = require("./resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

var _apolloServer = require("apollo-server");

var _todos = require("./todos");

var _todos2 = _interopRequireDefault(_todos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pubsub = new _apolloServer.PubSub();

const server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs2.default,
  resolvers: _resolvers2.default,
  context: { todos: _todos2.default, pubsub }
});

server.listen(4000);
},{"./typeDefs.graphql":"typeDefs.graphql","./resolvers":"resolvers.js","./todos":"todos.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map