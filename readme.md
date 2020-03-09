# `redux-composable-reducers`

_A collection of functions for composing and simplifying reducers in redux._

🚧 🚧
Under active development.
Pull requests and discussion are very welcome.
Some functions names and signatures are likely to change.
🚧 🚧

## Functions

### into-like

`transducer(keyReducer<reducer>)(withKeyStateReducer<reducer>)`
`transducer(keyReducer<string>)(withKeyStateReducer<reducer>)`
`transducer(keyReducerObject<object>)`

### branch-like

`transducer(branchObject<object>)(pathReducer<reducer>)`
`transducer(reducerReducer<reducer>)`

### reduce-like

`transducer(<reducer>, ...)(reducer)`

### Action Transducers

_action_ - Reduce the action.

- _payload_ - Reduce the action payload.
- _error_ - Reduce the action error.
- _meta_ - Reduce the action meta.
- _type_ - Reduce the action type.

### Object Key Transducers

_reduceKey_ - `state => state[reduceKey(state, action)]` Reduce a key to return as the state.

_intoObject_ - Reduce the state into a key.

_intoObjectKey_ - Reduce the key into a key.

_intoArray_ - Reduce the state into a key.

### Utilities

_pass_ - `state => state` Just pass the state through.

_asReducer_ - Coerce value to a reducer.

_map_ - Map all the values of an object or array.

_reduce_ - Reduce the reducers with the initial state, and the same action.

_expand_ - Create more actions to be reduced.

_merge_ - Merge a state and a nextState.

_filter_ - Apply next reducer if a filter reduces to truthy.

_branch_ - Reduce a reducer and then reduce with that reducer.

_compose_ - Combine transducers.

_initialState_ - Initialize the state before reducing.

_dependency_ - Reduce when something on the state has changed.

_toAction_ - Set the action of a reducer to a reduced value.

_toState_ - Set the state of a reducer to a reduced value.

# Why?

- The ability leverage and re-use code, even for complex behavior.

- Simpler measures of correct-ness than the implied methodology.

## Drawbacks

- Composed functions are often less performant than well-written, inlined versions.

- Composed functions can be hard to debug.

## Gotchas

# Concepts

## Reducers

Reducers are functions that take two or fewer arguments and return a value.

```javascript
(accumulator, value) => accumulator + value;
```

Reducers can be deterministic, stable, normal, consistent, and declarative.

- Deterministic functions return the same value when given the same arguments.

`f(a, b) == f(a, b)`

- Stable functions return the same value when setting their first argument to their output.

`f(a, b) == f(f(a, b), b)`

- Normal functions return the same value, but for any second argument, in any order.
  - In practise, this implies eventual consistency of the data and resilience to duplicate messages.

`f(f(a, c), b) == f(f(f(a, b), c), b)`

- Declarative functions never mutate the given arguments.
- Consistent functions always return a value of the same type and never return undefined.

## Transducers

Transducers are functions that take one or more reducers and return a reducer.

## Transducer Reducers

Transducer-reducers are functions that one or more reducers or transducers and return a transducer.

# Examples

## Obligatory Todos Example

```js
intoObjectKey({
  todos: initialState([])(
    type({
      ADD_TODO: intoArrayKey(todos => todos.length)(
        intoObjectKey({
          id: action("id"),
          text: action("text"),
          completed: () => false
        })
      ),
      TOGGLE_TODO: intoArrayKey((todos, action) =>
        todos.findIndex(todo => todo.id === action.id)
      )(
        intoObjectKey({
          completed: completed => !completed
        })
      )
    })
  ),
  visibility: initialState("SHOW_ALL" /*VisibiltyFilters.SHOW_ALL*/)(
    type({
      SET_VISIBILITY_FILTER: action("filter")
    })
  )
});
```

# Todo

- [ ] More complete examples.
- [ ] Thorough tests for every function.
- [ ] Document through JSDoc and Typescript.
- [ ] Convert to Typescript.
- [ ] Optimize functions.
- [ ] Non-reducer options through wrappers.
- [ ] Streamline and simplify functions and settle on names for functions.
