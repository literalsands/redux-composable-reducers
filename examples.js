import {
  initialState,
  reduce,
  type,
  action,
  compose,
  intoArrayKey,
  intoObjectKey,
  intoObject
} from "src";

export const forwardHistory = reducer =>
  reduce(
    intoObject({
      past: initialState([])(state => state.past.concat(state.present))
    }),
    intoObject({
      present: reducer,
      future: () => []
    })
  );

export const pushHistory = reducer =>
  reduce(
    intoObject({
      past: initialState([])(state => state.past.concat(state.present))
    }),
    intoObject({
      present: reducer,
      future: () => []
    })
  );

export const backwardHistory = reduce(
  intoObject({
    present: state => state.past[state.past.length - 1]
  }),
  intoObject({
    past: initialState([])(state => state.past.slice(0, -1)),
    future: initialState([])(state => state.future.concat(state.present))
  })
);

export const todos = initialState([])(
  type({
    ADD_TODO: intoArrayKey(todos => todos.length)(
      intoObjectKey({
        id: action("id"),
        text: action("text"),
        completed: ()=>false
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
);

export const visibility = initialState(
  "SHOW_ALL" /*VisibiltyFilters.SHOW_ALL*/
)(
  type({
    SET_VISIBILITY_FILTER: action("filter")
  })
);

export const todosApp = intoObjectKey({
  todos,
  visibility
});
