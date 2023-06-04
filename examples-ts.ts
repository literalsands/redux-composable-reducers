import {
  initialState,
  reduce,
  type,
  action,
  payload,
  // compose,
  intoArrayKey,
  intoObjectKey,
  intoObject,
//@ts-ignore
} from "./src";

import { Reducer } from "./src/types";

// type Reducer = <T, B>(state: T, action: {type: string, payload: B}) => T

type HistoryState = {past: any[], present: any, future: any[]}
export const forwardHistory = (reducer: Reducer) =>
  reduce(
    intoObject({
      past: initialState([])((state: HistoryState) => state.past.concat(state.present)),
    }),
    intoObject({
      present: reducer,
      future: () => [],
    })
  );

export const pushHistory = (reducer: Reducer) =>
  reduce(
    intoObject({
      past: initialState([])((state: HistoryState) => state.past.concat(state.present)),
    }),
    intoObject({
      present: reducer,
      future: () => [],
    })
  );

export const backwardHistory = reduce(
  intoObject({
    present: (state: HistoryState) => state.past[state.past.length - 1],
  }),
  intoObject({
    past: initialState([])((state: HistoryState) => state.past.slice(0, -1)),
    future: initialState([])((state: HistoryState) => state.future.concat(state.present)),
  })
);

type TodoState = {id: string, text: string, completed: boolean }
type TodoActions = "ADD_TODO" | "TOGGLE_TODO"
export const todos: TodoState[] = initialState([])(
  type({
    ADD_TODO: intoArrayKey((todos: TodoState[]) => todos.length)(
      intoObjectKey({
        id: payload("id"),
        text: payload("text"),
        completed: () => false,
      })
    ),
    TOGGLE_TODO: intoArrayKey((todos: TodoState[], action: { type:TodoActions, payload:TodoState }) =>
      todos.findIndex((todo) => todo.id === action.payload.id)
    )(
      intoObjectKey({
        completed: (completed: TodoState["completed"]) => !completed,
      })
    ),
  })
);

export const visibility = initialState(
  "SHOW_ALL" /*VisibiltyFilters.SHOW_ALL*/
)(
  type({
    SET_VISIBILITY_FILTER: action("filter"),
  })
);

export const todosApp = intoObjectKey({
  todos,
  visibility,
});
