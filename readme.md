# `redux-composable-reducers`

_A collection of functions for composing traditional and redux-like reducers._

## Functions

### Key Concepts

- Functions are called with a single reducer.
- Functions that require multiple reducers curry.
- Functions can take shorthand reducers where appropriate.
  - On key reducers...
    - string and number values are interpretted as keys.
    - object's keys are interpretted as keys, and their values are intepretted as reducers. (Removing the reducers.)
  - On non-key reducers...
    - string and number values are interpretted as values and returned.
  - On branching reducers...
    - object's keys are interpretted as switch branches based on the state, and their values are intepretted as reducers.

### Overview

#### Action Transducers

##### _action_`(reducer)(state, action)`

- Reduce the action.

<!-- ```js
action(pass)("foo", "bar"); // => "bar"

action(pass)("foo", { type: "big", payload: "bar" }); // => { type: "big", payload: "bar" }

action("type")("foo", { type: "big", payload: "bar" }); // => "big"
``` -->

###### _payload_`(reducer)(state, action)`

- Reduce the action payload.

###### _meta_`(reducer)(state, action)`

- Reduce the action meta.

###### _error_`(reducer)(state, action)`

- Reduce the action error.

###### _type_`(reducer)(state, action)`

- Reduce the action type.

<!-- ```js
type()(undefined, { type: "big" }) // => "big

type({ notbig: () => "small" })(undefined, { type: "big" }) // => undefined

type({ big: () => "BIG" })(undefined, { type: "big" }) // => "BIG"
``` -->

#### Object Key Transducers

##### _key_`(reducer)(state, action)` *alias state*

- Reduce a key to return as the state.

##### _intoObject_`(reducer)(reducer)(state, action)`

- Reduce a state object into a key value on the state.
- Reduce a key from the state.
- Reduce the state and action.
- Return a new object with that key updated to the reduced value.

##### _intoObjectKey_`(reducer)(reducer)(state, action)`

- Reduce a key from the state.
- Reduce the key value and action.
- Return a new object with that key updated to the reduced value.

##### _intoArray_`(reducer)(reducer)(state, action)`

- Reduce a key from the state.
- Reduce the state and action.
- Return a new array with that key updated to the reduced value.

### Utilities

#### General

##### _map_`(reducer)(state, action)`

- Map all the values of the state if it is an object or array using the reducer.

##### _reduce_`(...reducer)(state, action)`

- Reduce the reducers with the initial state, and the same action.

##### _compose_`(...transducers)(reducer)(state, action)`

- Combine transducers.

##### _asReducer_`(value)(transducer)(reducer)(state, action)`

- Coerce value to a reducer.

#### Control Flow

##### _branch_`(reducer)(state, action)`

- Reduce a reducer and then reduce with that reducer.

##### _expand_`(reducer)(reducer)(state, action)`

- Return actions, and then reduce those actions.

##### _filter_`(reducer)(reducer)(state, action)`

- Apply next reducer if a filter reduces to truthy.

##### _dependency_`(reducer)(reducer)(state, action)`

- Reduce when something on the state has changed.

#### State Transducers

###### _pass_`(state, action)`

- Just pass the state through.

###### _initialState_`(value)(reducer)(state, action)`

- Initialize the state before reducing.

##### _merge_`(mergeReducer)(reducer)(state, action)`

- Merge the reduced state into the state.

##### _toState_`(getStateReducer)(reducer)(state, action)`

- Set the state of a reducer to a reduced value.

##### _toAction_`(getActionReducer)(reducer)(state, action)`

- Set the action of a reducer to a reduced value.

## Why?

- Leverage and re-use code, even for complex behavior.
- Simple measures of correct-ness.
- Terse, but highly readable when well-written.

### Drawbacks

- Composed functions are often less performant than well-written, inlined versions.
  - This may be remedied in transpilation and with future changes.
- Composed functions can be unforgiving and hard to debug.
  - Accidental, uncapped, or conditional recursion is more common.
  - Values may sometimes seem mysterious -- functions for calculation are often separate from functions that define structure.

<!-- ## Gotchas -->

## Concepts

### Reducers

Reducers are functions that take two or fewer arguments and return a value.

```javascript
(accumulator, value) => accumulator + value;
```

Reducers can be deterministic, stable, normal, consistent, and declarative.

- Deterministic functions return the same value when given the same arguments.

```js
f(a, b) == f(a, b)
```

- Stable functions return the same value when setting their first argument to their output.

```js
f(a, b) == f(f(a, b), b)
```

- Normal functions return the same value, but for any second argument, in any order.
  - In practise, this implies eventual consistency of the data and resilience to duplicate messages.

```js
f(f(a, c), b) == f(f(f(a, b), c), b)
```

- Declarative functions never mutate the given arguments.
- Consistent functions always return a value of the same type and never return undefined.

### Transducers

Transducers are functions that take one or more reducers and return a reducer.

### Transducer Reducers

Transducer-reducers are functions that one or more reducers or transducers and return a transducer.

### Function Signatures

#### into-like

`transducer(keyReducer<reducer>)(withKeyStateReducer<reducer>)`
`transducer(keyReducer<string>)(withKeyStateReducer<reducer>)`
`transducer(keyReducerObject<object>)`

#### branch-like

`transducer(branchObject<object>)(pathReducer<reducer>)`
`transducer(reducerReducer<reducer>)`

#### reduce-like

`transducer(<reducer>, ...)(reducer)`

## Examples

### Obligatory Todos Example

```js
intoObjectKey({
  todos: initialState([])(
    type({
      ADD_TODO: intoArrayKey((todos) => todos.length)(
        intoObjectKey({
          id: action("id"),
          text: action("text"),
          completed: () => false,
        })
      ),
      TOGGLE_TODO: intoArrayKey((todos, action) =>
        todos.findIndex((todo) => todo.id === action.id)
      )(
        intoObjectKey({
          completed: (completed) => !completed,
        })
      ),
    })
  ),
  visibility: initialState("SHOW_ALL" /*VisibiltyFilters.SHOW_ALL*/)(
    type({
      SET_VISIBILITY_FILTER: action("filter"),
    })
  ),
});
```

## Todo

- [ ] More complete examples.
- [ ] Thorough tests for every function.
- [ ] Document through JSDoc and Typescript.
- [ ] Convert to Typescript.
- [ ] Optimize functions.
- [ ] Non-reducer options through wrappers.
- [ ] Streamline and simplify functions and settle on names for functions.
